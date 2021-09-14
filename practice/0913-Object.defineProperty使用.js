// 为一个对象中的属性进行监听
var data = {
  a: 'a',
  b: 'b',
  obj: {
    a: 1
  }
}
// 为了能拦截每个属性修改还有获取，要先复制一份一样的对象，代理一个方法也是同样的办法
var _data = deepClone(data)
console.log(_data)
Object.keys(data).forEach((k) => {
  Object.defineProperty(data, k, {
    get () {
      console.log('捕获到获取' + k + '操作')
      return _data[k]
    },
    set (newVal) {
      console.log('捕获到修改' + k + '操作：' + newVal)
      _data[k] = newVal
    }
  })
})
function deepClone(obj) {
  let newObj = {}
  for (let k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      if (Object.prototype.toString.call(obj[k]).slice(8, -1) === 'Object') {
        console.log(k)
        newObj[k] = deepClone(obj[k])
      } else {
        newObj[k] = obj[k]
      }
    }
  }
  return newObj
}