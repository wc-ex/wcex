
function* testFn() {
    yield (1);
    yield (2);
    yield (3);
    yield (4);
}
/**
 * 在 requestAnimationFrame() 执行传入的函数, 并限制每次执行消耗时间不超过20毫秒
 * @param fn 传入的待完成函数
 */
async function execInAnimationFrame(fn: () => Generator) {

    function* testFn() {
        yield (1);
        yield (2);
        yield (3);
        yield (4);
    }

    /**
     * 在 requestAnimationFrame() 执行传入的函数, 并限制每次执行消耗时间不超过20毫秒
     * 传入函数在每个执行阶段使用yield跳出并检测
     * @param fn 传入的待完成函数
     */
    async function execInAnimationFrame(fn: () => Generator) {
        let start = performance.now();
        let gen = fn();
        let res = gen.next();
        while (!res.done) {
            if (performance.now() - start > 20) {
                await new Promise(resolve => requestAnimationFrame(resolve));
                start = performance.now();
            }
            res = gen.next();
        }
    }



}