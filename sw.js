importScripts( 'https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js' )
var cacheStorageKey = 'minimal-pwa-2'
// 定义需要缓存的路径以及需要缓存的静态文件的列表
var bigCacheList = [
  '/',
  'index.html',
  'src/assets/css/main.css'
]
var smallCacheList = [
  '/',
  'src/assets/img/icon.png',
  'src/assets/img/tangyuan.png',
  'https://static.soyoung.com/sy-pre/playbar-1556417446881.png'
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
      // 正常流程是：旧的sw不工作的时候，新的sw才会起作用，但是浏览器何时关闭sw并不确定，因此使用：
      // self.skipWaiting()-是为了在页面更新的过程中，新的sw脚本能够立刻激活和生效
      .then( () => self.skipWaiting() )
  )
} )

// 缓存捕获-处理动态缓存，需要监听fetch事件，在caches中取match事件的request
self.addEventListener( 'fetch', e => {
  console.log( 'fetch', e )
  // respondWith 用来包含响应主页面请求的代码。
  e.respondWith(
    // caches：用来控制缓存专门分离出来的一个对象。是根据event.request在缓存空间中查找指定路径的缓存文件，
    // 如果匹配到，那么response是有内容的，如果没有，通过fetch进行捕获，此时可以手动fetch然后添加进缓存。
    caches.match( e.request ).then( response => {
      if ( response ) {
        return response
      }
      // fetch：现代浏览器用来替代XMLHttpRequest专门开发出的ajax请求。
      // 因为event.request 流已经在caches.match中使用过一次，所以不能再次使用，故得到副本再使用。
      var fetchRequest = e.request.clone()
      return fetch( fetchRequest ).then( res => {
        // 失败-直接返回res
        if ( !res || res.status !== 200 || res.type !== 'basic' ) {
          return res
        }
        // 成功，继续：该res一要给浏览器渲染，二要进行缓存。
        // 由于caches.put使用的是文件的响应流，一旦使用，返回的res就无法访问造成失败，所以需要复制一份。
        var resToCache = res.clone()
        caches.open( cacheStorageKey )
          .then( cache => {
            cache.put( e.request, resToCache )
          } )
        return res
      } )
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
      console.log( 'cachesNames', cachesNames )
      return Promise.all(
        // 获取所有不同于当前版本名称cache下的内容,删除其他版本缓存的文件
        cachesNames.filter( cachesName => {
          console.log( 'filter cachesName', cachesName )
          return cachesName !== cacheStorageKey
        } ).map( cachesName => {
          console.log( 'delete cachesName', cachesName )
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

self.addEventListener( 'message', e => {
  console.log( 'receive message', e.data )
} )
