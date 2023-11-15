import { Scope } from 'wcex'



function _throttleFunction(fn: ((...args: any[]) => void) & {__throttle:{
  lastCall:number,
  timer:number,
  args:any[]
}}, delayTime = 50):void {
  if(!fn.__throttle) {
    // 初始化限流数据
    fn.__throttle = {
      lastCall:0,
      timer:0,
      args:[]
    };
  }

  let data = fn.__throttle!;
  let now = performance.now();
  let delta = now - data.lastCall;
  if(delta >= delayTime) {
    // 超过间隔时间，直接执行
    data.lastCall = now;
    fn.apply(fn,data.args);
    data.args = [];
  } else {
    // 未超过间隔时间，等待下一次间隔
    // data.args = args;
    if(data.timer) return;
    data.timer = setTimeout(()=>{
      data.timer = 0;
      data.lastCall = performance.now();
      fn.apply(fn,data.args);
      data.args = [];
    },delayTime - delta);
  }

}

export default class extends Scope{
  test=1

  onReady(): void {
    
  }

  onTimer(){
    this.test++;
  }

}
