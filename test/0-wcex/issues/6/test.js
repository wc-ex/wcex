// 测试用例: $path
// https://github.com/wc-ex/wcex/issues/6


async function run() {

}

module.exports = {
    desc: "issues/6, $path 模块引用异常",
    modules: {
        "@test/mod1": {
            url: "/cases/issues/6/mod1"
        },
        "@test/mod2": { url: "/cases/issues/6/mod2" },
    },
    main: "test-mod1.test",
    run,
};
