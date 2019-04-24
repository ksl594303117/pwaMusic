importScripts( 'https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js' )
var cacheStorageKey = 'minimal-pwa-2'
// 定义需要缓存的路径以及需要缓存的静态文件的列表
var bigCacheList = [
  '/',
  'index.html',
  'sw.js',
  'src/assets/css/main.css'
]
var smallCacheList = [
  '/',
  'src/assets/img/icon.png',
  'src/assets/img/tangyuan.png'
]

// 监听安装sw
self.addEventListener( 'install', e => {
  /**
   * waitUntil 扩展了事件的生命周期，在服务工作线程中，延长事件的寿命从而阻止浏览器在
   * 事件中的异步操作完成之前中止服务工作线程。
   * 在install事件中用于确保：服务工作线程在所有依赖的核心cache被缓存之前都不会被安装。
   * 在activate事件中用于确保：任何功能事件不会被分派到serviceWorkerGlobalScope对象，
   * 直到它升级数据库模式并删除过期的缓存条目。
   *
   * 刚方法运行时，如果Promise是resolved，任何事情都不会发生；如果是rejected，installing
   * 或者active worker的state会被设置为redundant。
   */
  e.waitUntil(
    caches.open( cacheStorageKey ) // caches.open 用于打开指定的缓存
      // 如果一个文件下载失败（reject）的话，这次sw启动就失败了，所以分开进行缓存
      .then( cache => {
        // 不稳定文件或者大文件加载
        cache.addAll( bigCacheList )
        // 稳定文件或者小文件加载
        return cache.addAll( smallCacheList )
      } )
      .then( () => self.skipWaiting() ) // self.skipWaiting()是为了在页面更新的过程中，新的sw脚本能够立刻激活和生效
  )
} )

// 缓存捕获-处理动态缓存，需要监听fetch事件，在caches中取match事件的request
self.addEventListener( 'fetch', e => {
  console.log( 'fetch', e )
  e.respondWith(
    // caches：用来控制缓存专门分离出来的一个对象
    caches.match( e.request ).then( response => {
      if ( response ) {
        return response
      }
      // fetch：现代浏览器用来替代XMLHttpRequest专门开发出的ajax请求。
      return fetch( e.request )
    } ).catch( err => {
      console.error( 'Fetching failed:', err )
      throw err
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
