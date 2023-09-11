import { execSync } from "child_process";
import fs from "fs";
import path from "path";

let PROJECT_DIR = "";
let DIST_DIR = "";
let PACK_DIR = "";
const dependenciesSet = new Set<string>();

function deepGetDependencies(dependencies: string[] | undefined) {
	if (!dependencies) return;
	for (let d of dependencies) {
		if (!dependenciesSet.has(d)) {
			dependenciesSet.add(d);
			let pkgFile = path.join(PROJECT_DIR, "node_modules", d, "package.json");
			if (!fs.existsSync(pkgFile)) {
				// install package
				execSync(`pnpm install ${d}`, { stdio: "inherit", cwd: PROJECT_DIR });
			}

			console.log("add dependencies:", d);
			let pkg = JSON.parse(fs.readFileSync(pkgFile, "utf8"));
			if (pkg.dependencies) deepGetDependencies(Object.keys(pkg.dependencies));
		}
	}
}

export function pack(opts: { dir: string; packDir: string }) {
	PROJECT_DIR = path.resolve(opts.dir);
	DIST_DIR = path.join(PROJECT_DIR, "dist");
	PACK_DIR = path.resolve(opts.packDir);
	// 打包, 检测是否是ts项目
     if(fs.existsSync(path.join(PROJECT_DIR, "module.json"))) {
        console.log("pack not support module project")
        return 
    }
    if(!fs.existsSync(DIST_DIR)){
        console.log("dist dir not found, please build first")
        return
    }

	if (fs.existsSync(PACK_DIR)) fs.rmSync(PACK_DIR, { recursive: true });
	fs.mkdirSync(PACK_DIR, { recursive: true });
	// 打包自身
	const pkg = JSON.parse(fs.readFileSync(path.join(PROJECT_DIR, "package.json"), "utf8"));
    console.log("== pack package ==:", pkg.name, pkg.version);
	execSync(`pnpm pack --pack-destination ${PACK_DIR}`, { stdio: "inherit", cwd: DIST_DIR });

	// 收集所有依赖
	deepGetDependencies(Object.keys(pkg.dependencies));

	// 打包所有依赖
	for (let d of dependenciesSet) {
        let depPkg = JSON.parse(fs.readFileSync(path.join(PROJECT_DIR, "node_modules", d, "package.json"), "utf8"));
        console.log("== pack package == :", depPkg.name, depPkg.version);
		execSync(`pnpm pack --pack-destination ${PACK_DIR}`, { stdio: "inherit", cwd: path.join(PROJECT_DIR, "node_modules", d) });
	}
}
