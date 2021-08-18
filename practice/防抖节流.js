//
// 防抖：入参是一个函数，返回也是一个函数，通过代理模式，实现对函数的包装
function debounceFun(func) {
  let flag = true
  let timer
  return function () {
    if (flag) {
      func()
      flag = false
      timer = setTimeout(function () {
        flag = true
      }, 3000)
    } else {
      clearTimeout(timer)
      setTimeout(function () {
        flag = true
      }, 3000)
    }
  }
}
window.name = 'window.name'
let obj = {
  name: 'object.name',
  func: function () {
    console.log('111')
    console.log(this.name)
  }
}
obj.func()
let newFun = debounceFun(obj.func)
newFun()

function throttleFun(func) {
  let flag = true
  return function () {
    if (flag) {
      func()
      flag = false
      setTimeout(function () {
        flag = true
      }, 3000)
    }
  }
}
let newFun = throttleFun(function() {
  console.log(111)
})