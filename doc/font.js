define(() => {
  return {
    loadFont(scope) {
      var font = {
        cn: { css: "@/cn-fontsource-smiley-sans-oblique-regular/font.css", family: "Smiley Sans Oblique" },
        en: { css: "@/@fontsource/concert-one/index.css", family: "Concert One" },
      };

      if (localStorage.__FONT) {
        try {
          font = Object.assign(font, JSON.parse(localStorage.__FONT));
        } catch (e) {
        }
      }

      var family = "Roboto, Arial, Helvetica, sans-serif";
      document.querySelectorAll('link[font]').forEach(el=>el.remove())
      Object.values(font).forEach((v) => {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.setAttribute('font','1')
        link.href = scope.$path(v.css);
        document.head.appendChild(link);
        family = v.family + ", " + family;
      });
      document.body.parentElement.style.fontFamily = family;
    },
    setCnFont(scope, fontName, family) {
      let font = {};
      if (localStorage.__FONT) {
        try {
          font = Object.assign(JSON.parse(localStorage.__FONT));
        } catch (e) {
        }
      }
      font.cn = {css:`@/${fontName}/font.css`,family};
      localStorage.__FONT = JSON.stringify(font);
      console.log("set cn font:",font)
      
      this.loadFont(scope)
    },
  };
});
