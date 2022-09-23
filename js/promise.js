// 说明：
// 甲： await修饰的声明函数，会被转成Promise实例，如果是resolve状态会直接返回resolve的值，反之是reject的值

// async关键字声明的函数，会被转成一个异步函数，并返回一个Promise实例对象，也就可以使用 then/catch 方法来传入添加回调函数。
// async声明的函数，内部return语句返回的值，除了Promise实例的reject状态和throw出的Error实例会进入catch方法，其他都会成为then方法回调函数的参数。

async function fnA() {
    console.log('AAA')
  }
  async function fnB() {
    console.log('BBB')
    return 'BBB'
  }
  async function fnC() {
    console.log('CCC')
    return Promise.resolve('CCC') // 见说明甲
  }
  async function fnD() {
    console.log('DDD')
    return Promise.reject('DDD')
  }
  async function fnE() {
    console.log('EEE')
    throw new Error('EEE')
  }
  
  async function demo() {
    await fnA().then(res => console.log(res)) // 函数无返回，默认返回undefined，打印undefined
    await fnB().then(res => console.log(res)) // 函数返回BBB，打印BBB
    await fnC().then(res => console.log(res)) // 函数返回Promise实例resole('BBB')，打印BBB
    await fnD().then(res => console.log(res)).catch(error => console.warn(error)) // DDD(warn)
    await fnE().then(res => console.log(res)).catch(error => console.warn(error)) // DDD(warn)
  }
  demo()
  
  // await 操作符只能在异步函数 async function 内部使用。
  // 如果一个 Promise 被传递给一个 await 操作符，await 将等待 Promise 正常处理完成并返回其处理结果，也就是说它会阻塞后面的代码，等待 Promise 对象结果。
  // 如果等待的不是 Promise 对象，则返回该值本身。
  
  function fn0() {
    return '000'
  }
  function fn1() {
    return Promise.resolve('111')
  }
  function fn2() {
    return Promise.reject('222')
  }
  async function test() {
    console.log(await fn0()) // 111
    console.log(await fn1()) // 111
    console.log(await fn2()) // 不会执行，并抛出 Uncaught (in promise) 222
  }
  test()
  
  // 理解
  async function fn3() {
    console.log('333')
    return Promise.resolve('333') // resolve只会CCC
  }
  function fn4() {
    console.log('444')
    return Promise.resolve('444') // resolve只会CCC
  }
  console.log(fn3()) // Promise { <pending> } 展开却是fulfilled
  console.log(await fn3()) // 333 见说明：甲
  console.log(fn4()) // Promise { <fulfilled>： '444' } 因为 async会把普通函数返回改为异步，而打印是同步操作，异步还未执行
  
  