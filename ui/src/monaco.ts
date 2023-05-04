import { Scope } from "wcex";
import * as MONACO from "monaco-editor";
import debounce from "lodash.debounce";

var monacoPromise = new Promise<typeof MONACO>((res) => {
  WCEX.amdloader["@wcex/monaco-fixed@0.36.2"]?.then((loader) => {
    (<any>loader.require).config({ paths: { vs: WCEX.npmUrl + "@wcex/monaco-fixed@0.36.2/min/vs" } });
    (<any>loader.require)(["vs/editor/editor.main"], function () {
      res((<any>window).monaco);
    });
  });
});

export default class extends Scope {
  editor: MONACO.editor.IStandaloneCodeEditor = <any>{};
  text = "";
  file = "";
  options = {};
  monaco: typeof MONACO = <any>{};
  async onReady() {
    if (!this.file) return;

    this.monaco = this.$noWatch(await monacoPromise);
    // 初始化编辑器
    // monaco.editor
    let text = this.text;
    if (!this.text) {
      text = await (await fetch(decodeURI(this.file))).text();
    }
    // 自动解析扩展名
    let ext = this.file.replace(/^.*\./, "");
    let lang = { js: "javascript", ts: "typescript", css: "css", html: "html", json: "json", json5: "json5" }[ext];

    this.editor = this.$noWatch(
      this.monaco.editor.create(
        this.$id.editor,
        Object.assign(
          {
            minimap: { enabled: false },
            theme: this.$Colors.mode ? "vs" : "vs-dark",
            mouseWheelZoom: true,
            lineHeight: 20,
            scrollBeyondLastLine: true,
            tabSize: 4,
            insertSpaces: true,
            detectIndentation: false,
            inlayHints: { enabled: "on" },
          } as any,
          this.options
        )
      )
    );

    const { Uri, editor, languages } = this.monaco;
    const modelUri = Uri.parse(decodeURI(this.file));
    const model = editor.createModel(text, lang, modelUri);
    this.editor.setModel(model);

    if (lang == "typescript") {
      let tsDefaults = languages.typescript.typescriptDefaults;
      tsDefaults.setEagerModelSync(true);
      tsDefaults.setInlayHintsOptions({
        includeInlayEnumMemberValueHints: true,
        includeInlayFunctionParameterTypeHints: true,
        includeInlayParameterNameHintsWhenArgumentMatchesName: true,
        includeInlayFunctionLikeReturnTypeHints: true,
        includeInlayParameterNameHints: "all",
        includeInlayPropertyDeclarationTypeHints: true,
        includeInlayVariableTypeHints: true,
      });

      tsDefaults.setCompilerOptions({
        module: languages.typescript.ModuleKind.AMD,

        baseUrl: "./",
        paths: {
          "*": ["/node_modules/*"],
        },
        allowJs: true,
        moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
        target: languages.typescript.ScriptTarget.ES2015,
        noImplicitAny: true,
        noImplicitThis: true,
        strictNullChecks: true,
        esModuleInterop:true,
        // noUnusedLocals: true,
        // noUnusedParameters: true,
        noImplicitDependencies: true, // 在此开启 no-implicit-dependencies 规则
      });

      // 加载定义文件
      await this._checkSemanticsAndLoadTsDefines(modelUri);

      // 更新
      await this._emitContentEvent();   
    }


    // 监听编辑器内容发生改变，延迟500毫秒，仅在最后变化时发送消息
    this.editor.onDidChangeModelContent(
      debounce(
        async (ev) => {
            await this._emitContentEvent();
        },
        1000,
        { leading: false, trailing: true }
      )
    );
  }

  async _emitContentEvent(){
    let model = this.editor.getModel()
    if(!model) return;
    let isOk = true;
    let buildJs = '';
    if(model.getLanguageId() == 'typescript'){
      isOk = await this._checkSemanticsAndLoadTsDefines(model.uri);
      if(isOk) {
          var work = await (await this.monaco.languages.typescript.getTypeScriptWorker())(model.uri);
          buildJs = (await work.getEmitOutput(model.uri.toString())).outputFiles[0].text;            
      }
    }
    // 没有错误时才热更新组件
    if(isOk){
      this.$log('==> monaco hotUpdate',model.uri.toString())
      // 为ts文件获取编译后的结果
      this.$emit(new CustomEvent("content", { detail: { file: this.file, text: this.editor.getValue(),build:buildJs } }));
    }
  }

  async _checkSemanticsAndLoadTsDefines(monacoUri: MONACO.Uri) {
    let isOk = true;
    // 在 model 上绑定 TypeScript Language Service
    let worker = await (await this.monaco.languages.typescript.getTypeScriptWorker())(monacoUri);
    for (let err of await worker.getSemanticDiagnostics(monacoUri.toString())) {
        isOk = false;
      if (err.code == 2307) {
        // 导入模块无效，自动导入模块
        if (typeof err.messageText == "string") {
          let m = err.messageText.match(/^Cannot find module '(.+?)'./);
          if (m && m.length == 2) {
            console.log("find module typescript defines", m[1]); // 如果存在未定义模块引用，会输出相关信息
            await this.loadModuleTypeScriptDefines(m[1]);
          }
        }
      } else {
        console.warn("====>>>diagnostics", err); // 如果存在未定义模块引用，会输出相关信息
      }
    }
    return isOk;
  }

  async _lsNpmFiles(pkg: string, version?: string) {
    let urlBase = "https://data.jsdelivr.com/v1/package/npm";
    if (!version) {
      let info = await (await fetch(`${urlBase}/${pkg}`)).json();
      version = info.tags.latest;
    }
    let fileTree = await (await fetch(`${urlBase}/${pkg}@${version}`)).json();

    // 处理所有文件目录为平板结构
    type LIST_T = { type: "file" | "directory"; name: string; files: LIST_T }[];
    function _mkList(parent: string, list: LIST_T) {
      let files = [] as string[];
      for (let f of list) {
        if (f.type == "file") files.push(`${parent}${f.name}`);
        else if (f.type == "directory" && f.files && f.files.length > 0) {
          files.push(..._mkList(`${parent}${f.name}/`, f.files));
        }
      }
      return files;
    }
    return _mkList("/", fileTree.files);
  }

  // 从npm仓库加载指定包的定义依赖文件
  // 1. 读取指定软件包的package.json文件,获取 types 字段, 如不存在则尝试获取 @types/ 软件包
  // 2. 读取 types 指向目录下所有 .d.ts 文件

  async loadModuleTypeScriptDefines(pkgName: string) {
    let npmUrl = "https://fastly.jsdelivr.net/npm";
    let typescriptDefaults = this.monaco.languages.typescript.typescriptDefaults;

    let pkgTypes: string | undefined;
    let fetchPkgName = pkgName;
    try {
      this.$log("fetch npm pkg types", pkgName);
      let pkgJson: { types?: string ,typings?:string};
      pkgJson = await (await fetch(`${npmUrl}/${pkgName}/package.json`)).json();
      pkgTypes = pkgJson.types || pkgJson.typings;
      if (!pkgTypes) throw Error(`${pkgName} not have "types", try @types/${pkgName}`);
    } catch (e: any) {
        this.$log.warn("try load tsd err:", pkgName, e.message);
        // 尝试加载@types/xxx
        fetchPkgName = `@types/${pkgName}`;
        let pkgJson: { types: string };
        pkgJson = await (await fetch(`${npmUrl}/${fetchPkgName}/package.json`)).json();
        pkgTypes = pkgJson.types;
        if(!pkgTypes) {
            this.$log.warn("load tsd err:", fetchPkgName, e.message);
            return;
        }
    }
    this.$log(`${pkgName} types: ${pkgTypes}`);

    // 列出所有文件，加载全部的'.d.ts';
    let files = (await this._lsNpmFiles(fetchPkgName)).filter((v) => v.endsWith(".d.ts"));
    this.$log("===========>>load ts defines: files=", files);

    typescriptDefaults.addExtraLib(
      JSON.stringify({
        name: pkgName,
        types: pkgTypes,
      }),
      `/node_modules/${pkgName}/package.json`
    );

    // 加载package.json
    // 注意, 在退出时取消所有加载的lib，避免冲突。
    for (let f of files) {
      let tsdFile = `/node_modules/${pkgName}${f}`;
      typescriptDefaults.addExtraLib(await (await fetch(`${npmUrl}/${fetchPkgName}${f}`)).text(), tsdFile);
      this.$log("add tsd", tsdFile);
    }
  }

  onLayout() {
    requestAnimationFrame(() => {
      // console.error("!!!____",this.editor,this.editor?.layout)
      this.editor?.layout?.();
    });
  }

  async onReload() {
    let text = this.text;
    if (!this.text) {
      text = await (await fetch(this.file)).text();
    }
    this.editor.setValue(text);
  }
}
