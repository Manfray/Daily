事件循环
  调用栈: call stack
  执行上下文 excute context
  任务分类：
    同步任务
    异步任务：
      宏任务：script、http请求、定时器、事件
      微任务：.then、mutationObserver
  线程：浏览器有五种：js引擎、渲染引擎、http请求、定时器、事件处理
  一个宏任务执行完成后以及微任务队列被清空后，浏览器就会进行一次页面更新渲染。