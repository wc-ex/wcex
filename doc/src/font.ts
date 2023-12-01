import wcex from "wcex";

/**
 * 实现动态加载字体,支持中文和英文动态字体配置
 * 动态字体配置存储在localStorage.__FONT中，包含中文和英文的粗体和常规字体配置
 */

interface IFontConfig {
	cn: {
		bold: { css: {pkg:string,path:string}; family: string } |undefined;
		normal: { css: {pkg:string,path:string}; family: string } |undefined;
	};
	en: {
		bold: { css: {pkg:string,path:string}; family: string }|undefined;
		normal: { css: {pkg:string,path:string}; family: string } |undefined;
	};
}

function _loadCss(fontCss:{pkg:string,path:string}) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.setAttribute("font", "1");
  link.href = WCEX.pkgUrl(fontCss.pkg,fontCss.path);
  document.head.appendChild(link);
}

export default {
	loadFont() {
		let font = {
			cn: {
				normal: {
					css: {pkg:"cn-fontsource-lxgw-wen-kai-screen",path:"/font.css"},
					family: "LXGW WenKai Screen",
				},
			},
			en: {
				normal: {
					css: {pkg:"@fontsource/abel",path:"/index.css"},
					family: "Abel",
				},
			},
		} as IFontConfig;

		if (localStorage.__FONT) {
			try {
				font = Object.assign(font, JSON.parse(localStorage.__FONT));
			} catch (e) {}
		}

		let boldFamily = "Roboto, Arial, Helvetica, sans-serif";
    let normalFamily = "Roboto, Arial, Helvetica, sans-serif";
    // 移除所有字体CSS
		document.querySelectorAll("link[font]").forEach((el) => el.remove());


    // 加载所有字体CSS, 优先英文字体，然后中文字体
    if(font.cn.normal ) {
      _loadCss(font.cn.normal.css);
      normalFamily = font.cn.normal.family + ", " + normalFamily;
    }
    if(font.cn.bold ) {
      _loadCss(font.cn.bold.css);
      boldFamily = font.cn.bold.family + ", " + boldFamily;
    }
    if(font.en.normal ) {
      _loadCss(font.en.normal.css);
      normalFamily = font.en.normal.family + ", " + normalFamily;
    }
    if(font.en.bold ) {
      _loadCss(font.en.bold.css);
      boldFamily = font.en.bold.family + ", " + boldFamily;
    }

    // 设置字体css变量, 设置到html 节点
    document.documentElement.style.setProperty("--font-family-normal", normalFamily);
    document.documentElement.style.setProperty("--font-family-bold", boldFamily);

    document.head.appendChild(document.createElement("style")).innerHTML = 
    `
    html {
      font-family: var(--font-family-normal);
    }
    .bold, b, strong,h1,h2,h3,h4,h5,h6,th {
      font-family: var(--font-family-bold);
      font-weight: 600;
    }
    `; 



}


	// setCnFont(scope, fontName, family) {
	// 	let font = {};
	// 	if (localStorage.__FONT) {
	// 		try {
	// 			font = Object.assign(JSON.parse(localStorage.__FONT));
	// 		} catch (e) {}
	// 	}
	// 	font.cn = { css: `@/${fontName}/font.css`, family };
	// 	localStorage.__FONT = JSON.stringify(font);
	// 	console.log("set cn font:", font);

	// 	this.loadFont(scope);
	// },
};
