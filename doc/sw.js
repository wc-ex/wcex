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

/* 注册fetch事件，拦截全站的请求 */
this.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request).then(res=>{
            console.log("ServiceWorker fetch:",res.status, event.request.url);
            return res;
        })

        /* 在缓存中匹配对应请求资源直接返回 */
        // caches.match(event.request).then((cacheRes) => {
        //     if (cacheRes) {
        //         console.log("ServiceWorker cache:", event.request.url);
        //         return cacheRes;
        //     }
        //     var fetchRequest = event.request.clone();

        //     return fetch(fetchRequest).then((fetchRes) => {
        //         // Check if we received a valid response
        //         if (!fetchRes || fetchRes.status !== 200) {
        //             return fetchRes;
        //         }
        //         console.log("ServiceWorker fetch:", event.request.url);

        //         var responseToCache = fetchRes.clone();
        //         caches.open(CACHE_NAME)
        //             .then(function (cache) {
        //                 cache.put(fetchRequest, responseToCache);
        //             });
        //         return fetchRes;
        //     });
        // })
    );
});
