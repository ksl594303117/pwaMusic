importScripts( 'https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js' )
console.log( workbox )
if ( workbox ) {
  console.log( 'workbox is loaded' )
  var cacheStorageKey = 'minimal-pwa-1'
  // 定义需要缓存的路径以及需要缓存的静态文件的列表
  var cacheList = [
    '/',
    'index.html',
    'main.css',
    'icon.jpeg'
  ]
  self.addEventListener( 'install', e => {
    e.waitUntil(
      caches.open( cacheStorageKey )
        .then( cache => cache.addAll( cacheList ) )
        .then( () => self.skipWaiting() ) // self.skipWaiting()是为了在页面更新的过程中，新的sw脚本能够立刻激活和生效
    )
  } )

  // 处理动态缓存，需要监听fetch事件，在caches中取match事件的request
  self.addEventListener( 'fetch', e => {
    console.log( 'fetch', e )
    e.respondWith(
      caches.match( e.request ).then( response => {
        if ( response !== null ) {
          return response
        }
        return fetch( e.request.url )
      } )
    )
  } )

  self.addEventListener( 'activate', e => {
    e.waitUntil(
      // 获取所有cache名称
      caches.keys().then( cachesNames => {
        return Promise.all(
          // 获取所有不同于当前版本名称cache下的内容
          cachesNames.filter( cachesName => {
            return cachesName !== cacheStorageKey
          } ).map( cachesName => {
            return caches.delete( cachesName )
          } )
        )
      } ).then( () => {
        // 在新安装的sw中通过调用self.clients.claim()取得页面的控制权，这样之后打开的页面都会使用版本更新的缓存。
        // 旧的sw脚本不在控制着页面后会被停止，也就是会进入redundant期。
        return self.clients.claim()
      } )
    )
  } )
} else {
  console.log( 'workbox did not load' )
}
