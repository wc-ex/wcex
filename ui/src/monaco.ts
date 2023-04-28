import { Scope } from "wcex";
import * as MONACO from 'monaco-editor';
import debounce from 'lodash.debounce';

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
        this.monaco = this.$noWatch(await monacoPromise);
        // monaco.editor
        let text = this.text;
        if (!this.text) {
            text = await (await fetch(decodeURI(this.file))).text();
        }
        // 自动解析扩展名
        let ext = this.file.replace(/^.*\./, "");
        let language = { js: "javascript", ts: "typescript", css: "css", html: "html", json: "json", json5: "json5" }[ext];

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
                        inlayHints:{enabled:"on"},
                    } as any,
                    this.options
                )
            )
        );


        const { Uri, editor, languages } = this.monaco;


        if (language == 'typescript') {
            let tsDefaults = languages.typescript.typescriptDefaults;
            tsDefaults.setEagerModelSync(true);
            // for (let f of ['ExportedType.d.ts', 'Scope.d.ts', 'TplElem.d.ts', 'Router.d.ts', 'Logger.d.ts', 'ComDesc.d.ts', 'plugins/IPlugins.d.ts']) {
            //     let url = this.$path(`wcex/types/${f}`);
            //     let uri = Uri.parse(url);
            //     if (!editor.getModel(uri)) {
            //         let text = await ((await fetch(url)).text());
            //         editor.createModel(
            //             text,
            //             "typescript",
            //             Uri.parse(`file:///node_modules/wcex/types/${f}`)
            //         );

            //         // 添加类型定义
            //         // tsDefaults.addExtraLib(text, `file:///node_modules/wcex/types/${f}`);
            //     }

            // }

            tsDefaults.addExtraLib(`
                export declare const VERSION: string;
                export declare const Scope: {};
            `, 'file:///node_modules/wcex/types/aaa.d.ts');


            tsDefaults.addExtraLib(`declare module 'wcex' {
                    export {Scope,VERSION} from "./aaa";

              }`, 'file:///node_modules/wcex/types/index.d.ts');


            tsDefaults.setCompilerOptions({
                baseUrl: './',
                paths: {
                    "*": ["file:///node_modules/node_modules/*"]
                },
                allowJs: true,
                moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
                target: languages.typescript.ScriptTarget.ESNext,
                noImplicitAny: true,
                noImplicitThis: true,
                strictNullChecks: true,
                // noUnusedLocals: true,
                // noUnusedParameters: true,
                noImplicitDependencies: true // 在此开启 no-implicit-dependencies 规则
            });

        }


        // 加载定义文件
        const modelUri = Uri.parse(this.file ? decodeURI(this.file) : "file:///undefined");
        editor.getModel(modelUri)?.dispose();
        const model = editor.createModel(text, language, modelUri);
        this.editor.setModel(model);


        // monaco.languages.typescript.typescriptDefaults.getDiagnosticsOptions().noSemanticValidation = false;

        // 在 model 上绑定 TypeScript Language Service
        if (language == 'typescript' && modelUri) {
            let worker = await (await languages.typescript.getTypeScriptWorker())(modelUri);
            for (let err of await worker.getSemanticDiagnostics(modelUri.toString())) {
                if (err.code == 2792) {
                    // 导入模块无效，自动导入模块
                    if (typeof err.messageText == 'string') {
                        let m = err.messageText.match(/^Cannot find module '(.+?)'./);
                        if (m && m.length == 2) {
                            console.log("====>>> Cannot find module", m[1]); // 如果存在未定义模块引用，会输出相关信息
                            try {
                                // await this.loadModuleTypeScriptDefines(m[1], err.file?.fileName);
                            } catch (e: any) {
                                console.log("====>>> load ts define error", e.message); // 如果存在未定义模块引用，会输出相关信息
                            }
                        }
                    }
                } else {
                    console.log("====>>>diagnostics", err); // 如果存在未定义模块引用，会输出相关信息

                }
            }
        }

        // 编辑器发生改变，延迟500毫秒，仅在最后变化时发送消息
        this.editor.onDidChangeModelContent((ev => {
            this.$log('===========>>model::', ev);
        }));
        // this.editor.onDidChangeModelContent(
        //     debounce(
        //         (ev) => {
        //             const model = ev && ev.model;
        //             this.$log('===========>>model::',ev)


        //             this.$emit(new CustomEvent("edit", { detail: { file: this.file, text: this.editor.getValue() } }));
        //         },
        //         1000,
        //         { leading: false, trailing: true }
        //     )
        // );
    }

    // 从npm仓库加载指定包的定义依赖文件
    async loadModuleTypeScriptDefines(pkgName: string, fromFile: string | undefined) {
        if (pkgName.startsWith('.')) {
            // 相对引用
            this.$log('===========>>load ts file define::', fromFile, pkgName);
        } else {
            this.$log('===========>>load ts pkg define::', fromFile, pkgName);
            // 引用包定义
            // 获取package.json
            let pkg = await (await fetch(this.$path(`${pkgName}/package.json`))).json();
            this.$log('===========>>pkg defile::', pkg.types);
            const { editor, Uri } = this.monaco;
            let url = this.$path(`${pkgName}/${pkg.types}`);
            let uri = Uri.parse(url);
            if (!editor.getModel(uri)) {
                editor.createModel(
                    await ((await fetch(url)).text()),
                    "typescript",
                    uri
                );
            }


            //     if()
            // }}
        }


    }

    onLayout() {
        requestAnimationFrame(() => {
            this.editor.layout();
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