define(["require", "exports", "wcex"], function (require, exports, wcex_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _throttleFunction(fn, delayTime = 50) {
        if (!fn.__throttle) {
            // 初始化限流数据
            fn.__throttle = {
                lastCall: 0,
                timer: 0,
                args: []
            };
        }
        let data = fn.__throttle;
        let now = performance.now();
        let delta = now - data.lastCall;
        if (delta >= delayTime) {
            // 超过间隔时间，直接执行
            data.lastCall = now;
            fn.apply(fn, data.args);
            data.args = [];
        }
        else {
            // 未超过间隔时间，等待下一次间隔
            // data.args = args;
            if (data.timer)
                return;
            data.timer = setTimeout(() => {
                data.timer = 0;
                data.lastCall = performance.now();
                fn.apply(fn, data.args);
                data.args = [];
            }, delayTime - delta);
        }
    }
    class default_1 extends wcex_1.Scope {
        constructor() {
            super(...arguments);
            this.test = 1;
        }
        onReady() {
        }
        onTimer() {
            this.test++;
        }
    }
    exports.default = default_1;
});
