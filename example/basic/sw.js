
function initServiceWork(){

function initServiceWork(){
  // 定义需要缓存的文件列表
  const cacheFiles = [
    '/index.html',
    '/styles.css',
    '/app.js'
  ];
  
  // 监听install事件，缓存文件
  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-cache').then(function(cache) {
        return cache.addAll(cacheFiles);
      })
    );
  });
  
  // 监听fetch事件，从缓存中读取文件
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        if (event.request.url.includes('localhost') || event.request.url.includes('127.0.0.1')) {
          return fetch(event.request);
        }
        return fetch(event.request).then(function(response) {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open('my-cache').then(function(cache) {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
    );


  });


}


}

