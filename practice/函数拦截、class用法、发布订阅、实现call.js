
// 函数拦截
console.error('错误')
const _error = console.error
console.error = function (...arg) {
    console.log(111)
    _error(...arg)
}
console.error('错误')

// 对象修改拦截

// 实现一个继承（六种方法）

// class的用法
class Parent {
  constructor () {
    this.name = 'parent'
  }
  sayName () {
    console.log(this.name)
  }
}
var p = new Parent()
p.sayName()

new Promise(() => {})
// promise
class MyPromise {
  constructor () {}

}

// 发布订阅
const dep = {
  list: [],
  addNotice (fn) {
    this.list.push(fn)
  },
  publish () {
    for (let i = 0, len = this.list.length; i < len; i++) {
      this.list[i]()
    }
  }
}
// class Watcher {
//   constructor () {
//     this.
//   }
// }
dep.addNotice(function () {
  console.log('观察者1')
})
dep.addNotice(function () {
  console.log('观察者2')
})
dep.addNotice(function () {
  console.log('观察者3')
})
dep.addNotice(function () {
  console.log('观察者4')
})
dep.publish()

// 实现call 和 apply

let obj1 = {
  value: 'aaa'
}
this.value = 'bbb'
function fn (a, b) {
  console.log(a + b)
  console.log(this.value)
}
function fn (a, b) {
  return {
    value: this.value,
    name: a,
    age: b
  }
}
fn.myApply(obj1, 1, 2)
fn.myApply(null, 1, 2)
fn.myApply(obj1, 1, 2)

// call的实现 1.this绑定到目标  2.参数传过去  3.考虑null和有返回值的
Function.prototype.myCall = function(target, ...arg) {
  // 参数校验null
  if (!target === true && typeof target === 'object') { 
    return '[object Null]'
  } else if (typeof target === 'undefined') {
    return '[object Undefined]'
  } else {
    // this指的就是目标方法
    const obj = target
    obj.f = this
    const res = obj.f()
    delete obj.f
    return res
  }
}
console.log(Object.prototype.toString.myCall({}).slice(8, -1))
// call的实现 1.this绑定到目标  2.参数传过去  3.考虑null和有返回值的
Function.prototype.myApply = function (obj, arg) {
  // null也是对象
  obj = obj || window
  // 为这个对象添加目标函数
  obj.fn = this
  // 执行该函数
  const res = obj.fn(...arg) // es6办法
  delete obj.fn
  return res
}
Function.prototype.myBind = function (obj) {
  obj = obj || window
  const self = this // 这里不保存，这个匿名函数上下文中的this就会指向window
  return function () {
    return self.myApply(obj, arguments)
  }
}
console.log((fn.myBind(obj1))())
fn.myBind(obj1)
