import { Scope } from "wcex";

export default class extends Scope {
	dirs = [] as string[];
	icons = {} as { [k: string]: string[] };
	curType = "";
	search = { searchString: "", curSelectIcon: "" };

	// 获取根据搜索字符串匹配的TAG
	matchTags() {
		return this.dirs
			.map((v) => {
				return this.matchIconList(v).length > 0 ? v + ":" + this.matchIconList(v).length : "";
			})
			.filter((v) => v);
	}
	matchIconList(type: string) {
		return (this.icons[type] || []).filter((v) => {
			return this.search.searchString ? v.match(new RegExp(this.search.searchString)) : true;
		});
	}
	loading = true;
	npmScope = false;
	pkg = "";
	// loadIconPromise;

	async onReady() {
        // 判断是否是npm Scope类型的包
		this.npmScope = (this.pkg.startsWith("@") && this.pkg.indexOf("/") < 0);
        console.log("npmScope", this.pkg,this.npmScope);
		const dirs = this.pkg.endsWith(".")
			? ["."]
			: (
					await (this.npmScope
						? this.lsScopePackagesFromNpm(this.pkg)
						: this.loadDirFiles(WCEX.npmUrl + this.pkg + "/", "/"))
			  ).filter((v) => !v.startsWith("."));
		if (this.pkg.endsWith("/.")) this.pkg = this.pkg.slice(0, this.pkg.length - 2);
		// 等待200毫秒，然后开始加载svg
		for (let d of dirs) {
			try {
				this.icons[d] = await this.loadDirFiles(WCEX.npmUrl + this.pkg + "/" + (d == "." ? "" : d + "/"), ".svg");
			} catch (e:any) {
				console.log(e.message);
			}
		}
		this.dirs = dirs;
		this.loading = false;
	}

	/**
	 * 从urlList中获取所有url的内容
	 */
	fetchAll(urlList: string[], limit: number, onLoaded: (url: string, text: string) => void) {
		const controller = new AbortController();
		const { signal } = controller;
		let runningFlag = true;
		const _allFetchUrls = urlList.map((url, index) => ({
			url,
			index,
		}));

		// async function _run1() {
		// 	// 从列表中提取limit个url
		// 	const urls = _allFetchUrls.splice(0, limit);
		// 	// 同时执行limit个请求, 每完成一个请求添加一个新请求，全部完成后退出
		//   const runningTasks = urls.map((v) =>
		// 				 fetch(encodeURI(v.url), { signal })
		// 					.then((res) => res.text())
		// 					.then((v) => onLoaded(url, v))
		//           .then(v)
		// 			)

		// 	while (runningTasks.length>0 && runningFlag) {
		// 		const ret = await Promise.race(runningTasks);
		//     runningTasks.splice(runningTasks.indexOf(ret.)
		//     ,1)
		//     // 添加一个新任务
		//     if(urlList.length>0) {
		//       const url = urlList.shift();
		//       runningTasks.push(
		//         fetch(encodeURI(url), { signal })
		//           .then((res) => res.text())
		//           .then((v) => onLoaded(url, v))
		//           .then(()=>runningTasks.length-1)
		//       )

		// 	}
		// }

		async function _run() {
			const results = [] as Promise<any>[];
			let running = 0;
			let index = 0;

			function _add() {
				const url = urlList[index];
				// console.log("--->add", url);
				const promise = fetch(encodeURI(url), { signal })
					.then((res) => res.text())
					.then((v) => onLoaded(url, v));
				results.push(promise);
				running++;
				index++;
			}

			while (running < limit && index < urlList.length && runningFlag) {
				_add();
			}

			while (running > 0 && runningFlag) {
				const result = await Promise.race(results).catch((e) => console.log(e.message));
				results.splice(results.indexOf(result), 1);
				running--;
				if (index < urlList.length) {
					_add();
				}
			}
		}

		return {
			promise: _run(),
			abort() {
				runningFlag = false;
				controller.abort("abort");
			},
		};
	}

	svgFetchLoader: { promise: Promise<void>; abort: () => void } | undefined;
	loadAllSvg() {
		// 加载所有未加载的svg
		let urlList = this.matchIconList(this.curType).map((value) => {
			let el = this.$id[value];
			if (el) {
				while (el.firstChild) el.removeChild(el.firstChild);
			}
			return WCEX.npmUrl + this.pkg + "/" + this.curType + "/" + value;
		});
		this.svgFetchLoader = this.fetchAll(urlList, 6, (url, text) => {
			// console.log("onLoad...", url);
			let id = url.replace(/^.*\//, "");
			let p = new DOMParser();
			let dom = p.parseFromString(text, "image/svg+xml");
			let svg = dom.firstElementChild as Element;
			let el = this.$id[id];
			if (el && svg) {
				el.innerHTML = svg.innerHTML;
				// svg.childNodes.forEach((n) => el.append(n.cloneNode(true)));
				if (svg.hasAttribute("viewBox")) el.setAttribute("viewBox", svg.getAttribute("viewBox") || "");
			}
		});
	}

	async loadDirFiles(path: string
        , endStr: string) {
		// 读取列表
		let ret = [] as string[];
		try {
			ret = await fetch(path, {})
				.then((response) => {
					if (response.status < 400) return response.text();
					else throw Error(`Error Fetch ${path}, ${response.status}`);
				})
				.then((html) => {
					const parser = new DOMParser();
					const doc = parser.parseFromString(html, "text/html");
					const links = doc.querySelectorAll(`a[href$="${endStr}"]`);
					const fileNames = Array.from(links).map((link) => (link.textContent||"").trim().replace(/\/$/, ""));
					return fileNames;
				});
		} catch (e:any) {
			this.$log.warn(e.message);
		}
		return ret;
	}

	async lsScopePackagesFromNpm(scope: string): Promise<string[]> {
		const url = `https://registry.npmjs.org/-/v1/search?text=scope:${scope.slice(1)}&size=250`;
		const response = await fetch(url);
		const data = await response.json();
		return data.objects.map((pkg: any) => pkg.package.name.replace(scope + "/", ""));
	}

	onClickIcon(icon: string) {
		let str = `<wcex-ui.icon pkg="${this.pkg}" type="${this.curType}" icon="${icon.replace(
			".svg",
			""
		)}"></wcex-ui.icon>`;
		navigator.clipboard.writeText(str);
		this.search.curSelectIcon = str;

		this.$log("copy", str);
	}

	async onSelectIconType(ev: CustomEvent) {
		if (ev.detail && ev.detail.prop == "value" && ev.detail.value) {
			this.curType = ev.detail.value.replace(/:\d+$/, "");

			// 加载图标
			if (!this.icons[this.curType]) {
				this.icons[this.curType] = await this.loadDirFiles(
					WCEX.npmUrl + this.pkg + "/" + (this.curType == "." ? "" : this.curType + "/"),
					".svg"
				);
			}

			// 加载所有的图标SVG
			if (this.svgFetchLoader) {
				this.svgFetchLoader.abort();
				this.svgFetchLoader = undefined;
			}
			setTimeout(() => {
				this.loadAllSvg();
			}, 200);
		}
	}
}
