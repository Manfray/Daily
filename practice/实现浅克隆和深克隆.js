//
var obj = {
  b: {
      value: 2,
      writable: true,
      enumerable: true,
      configurable: true
  },
  c: {
      value: 3,
      writable: true,
      enumerable: false,
      configurable: true
  },
  o: {
      aaa: [1,2,3]
  }
}
// 浅克隆
function shallowClone(obj) {
  // 入参校验
  if (Object.prototype.toString.call(obj).slice(8, -1) !== 'Object') throw new Error('参数需为Object类型')
  const res = {}
  for (let k in obj) { // 会有一个问题，for循环会遍历当前对象以及原型中  可！枚！举！ 的属性，这里的克隆不用复制原型链的属性，解决办法hasOwnProperty或者用es6的Object.keys
    if (obj.hasOwnProperty(k)) res[k] = obj[k]
  }
  return res
}

function deepClone(obj) {
  // 入参校验
  if (Object.prototype.toString.call(obj).slice(8, -1) !== 'Object') throw new Error('参数需为Object类型')
  const res = {}
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      if (Object.prototype.toString.call(obj[k]).slice(8, -1) === 'Object') {
        res[k] = deepClone(obj[k])
      } else {
        res[k] = obj[k]
      }
      
    }
  }
  return res
}
let o1 = shallowClone(obj)
let o2 = shallowClone(obj)
console.log(o1.o.aaa === o2.o.aaa)
let o3 = deepClone(obj)
let o4 = deepClone(obj)
console.log(o3.o.aaa === o4.o.aaa)

// 自己写的深克隆会有下面几个问题
// 1、Array, Set, WeakSet, Map, WeakMap这几种类型的数据没法克隆
// 2、爆栈，函数栈会爆，广度不影响爆栈，深度会影响（5000多层会爆栈）
// 3、循环引用的问题

// JSON.parse(JSON.stringify()) 的问题
// 1、没法克隆函数还有Null
// 2、也同样会爆栈

// 方法最好
// var _ = require('lodash')
// _.clone(obj)
// _.cloneDeep(obj)

