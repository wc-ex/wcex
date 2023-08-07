import fs from "fs";

type HTML_MODULE = {
	[key: string]: {
		pkg: string;
    prefix?:string
		files: string[];
		version?: string; // 指定版本
		loadMode: "cjs" | "esm" | "eval" | "amd"; // 加载模式
		globalVar: string; // 使用全局加载的变量名
	};
};
export function parseHtmlModules(htmlFile: string) {
	const html = fs.readFileSync(htmlFile, "utf8");
	const modules = {} as HTML_MODULE;
	// 读取所有的meta标签
	const metas = html.match(/<meta\s+.*?\/>/g);
	metas?.forEach((meta) => {
		//解析meta标签，获取全部属性
		const attrs = meta.match(/\w+\s*=\s*["']([^"']+)["']/g);
		if (attrs) {
			// 解析属性
			const attrMap = attrs.reduce((prev, cur) => {
				const [key, value] = cur.split("=");
				prev[key] =  value.replace(/["']/g,'');
				return prev;
			}, {} as { [k: string]: string });

			if (attrMap.name == "module" && attrMap.pkg) {
        let files = attrMap.files?.split(";")?.filter(v=>v.trim().length>0) || [];
				modules[attrMap.pkg] = {
					pkg: attrMap.pkg,
					files,
					version: attrMap.version,
					loadMode: attrMap.cjs ? "cjs" : attrMap.esm ? "esm" : attrMap.eval ? "eval" : "amd",
          prefix:attrMap.prefix,
					globalVar: attrMap.global,
				};
			}
		}
	});
	return modules;
}
