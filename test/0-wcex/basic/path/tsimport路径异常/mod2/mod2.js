

define("index", ["@test/mod1/mod1.js"], function (entry) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });

    console.log('222222~~~~~~~~~~~!!!!!!!!!!', entry)
    exports.default = { mod1: entry };
});
console.log('333333~~~~~~~~~~~!!!!!!!!!!')