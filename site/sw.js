const CACHE = "v2";

/* 监听安装事件，install 事件一般是被用来设置你的浏览器的离线缓存逻辑 */
this.addEventListener('install', function (event) {
    console.log("ServiceWorker install:", event);
    /* 通过这个方法可以防止缓存未完成，就关闭serviceWorker */
    event.waitUntil(
        // 将sw立即设置为激活状态
        event.waitUntil(caches.open(CACHE).then(() => self.skipWaiting()))
    );
});

this.addEventListener('activate', (event) => {
    console.log("ServiceWorker activate:", event);
    event.waitUntil(self.clients.claim()); // 立即获取控制权
});

var hotCache = {};

function contentType(url) {
    let ext = url.replace(/^.*\./, '');
    return { html: 'text/html', css: 'text/css', json: 'application/json', js: 'text/javascript', svg: 'image/svg+xml' }[ext] || 'text/plain';
}

/* 注册fetch事件，拦截全站的请求 */
this.addEventListener('fetch', function (event) {
    // fetch(event.request,{  cache: 'no-cache' }).then(res => {

    let url = decodeURI(event.request.url);
    // 处理热缓存数据
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
        event.respondWith(
            caches.match(event.request).then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(function (response) {
                    if (!response || response.status !== 200) {
                        return response;
                    }
                    if (event.request.url.startsWith('http://localhost') || event.request.url.startsWith('http://127.0.0.1')) {
                        return fetch(event.request);
                    }

                    const responseToCache = response.clone();
                    caches.open(CACHE).then(function (cache) {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                });
            })
        );
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
