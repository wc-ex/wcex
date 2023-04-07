/* 监听安装事件，install 事件一般是被用来设置你的浏览器的离线缓存逻辑 */
this.addEventListener('install', function (event) {
    console.log("ServiceWorker install:", event);
    /* 通过这个方法可以防止缓存未完成，就关闭serviceWorker */
    event.waitUntil(
        // 将sw立即设置为激活状态
        self.skipWaiting()
    );
});


this.addEventListener('activate', (event) => {
    console.log("ServiceWorker activate:", event);
    event.waitUntil(self.clients.claim()); // 立即获取控制权
});

var hotCache = {};

function contentType(url) {
    let ext = url.replace(/^.*\./, '');
    return { html: 'text/html', css: 'text/css', json: 'application/json',js :'text/javascript' ,svg:'image/svg+xml'}[ext] || 'text/plain';
}

/* 注册fetch事件，拦截全站的请求 */
this.addEventListener('fetch', function (event) {
    // fetch(event.request,{  cache: 'no-cache' }).then(res => {

    let url = decodeURI(event.request.url);
    if (hotCache[url]) {
        console.log("---> SW FETCH Cache");
        // 返回缓存数据
        event.respondWith(
            new Response(hotCache[url], {
                headers: new Headers({
                    'Content-Type': contentType(url)
                })
            })
        );
    } else {
        // 请求网路数据
        console.log("---> SW FETCH Net");
        event.request.referrerPolicy='no-referrer-when-downgrade';
        event.respondWith(fetch(event.request));
    }

});

this.addEventListener('message', function (ev) {
    const { type, data } = ev.data;
    switch (type) {
        case 'hotCacheSet':
            console.log("sw hotCacheSet", data);
            hotCache[data.file] = data.text;
            break;
        case 'hotCacheClean':
            console.log("sw hotCacheClean", data);
            hotCache = {};
            break;
    }
});
