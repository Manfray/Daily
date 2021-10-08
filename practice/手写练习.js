// call/apply/bind【call想不起来思路】【参数判断不全】
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
Function.prototype.myApply = function () {}
console.log(Object.prototype.toString.myCall({}).slice(8, -1))
// new
function myNew(constructor) {
  // 原型指向
  const res = Object.create(constructor.prototype)
  // 执行构造函数，this指向生成对象
  const res2 = constructor.apply(res, [...arguments].slice(1))
  return Object.prototype.toString.call(res2) === 'Object' ? res2 : res
}
var obj = new Object()
var obj = myNew(Object)
// 继承
function Animal(aname) {
  this.aname = aname
}
Animal.prototype.sayAName = function () {
  console.log(this.aname)
}
function Cat(cname, aname) {
  Animal.call(this, aname)
  this.cname = cname
}
Cat.prototype = Object.create(Animal.prototype)
// Cat.prototype.__proto__ = Animal.prototype
Cat.prototype.sayCName = function () {
  console.log(this.cname)
}
let c1 = new Cat()
console.log(c1)
// 防抖节流
function debounceFuncQuick(fn, delay = 1000) {
  // 参数校验必须为函数
  let flag = true
  let timer
  return function () { // 返回高阶函数
    if (flag === true) {
      fn()
      flag = false
      timer = setTimeout(() => {
        flag = true
      }, delay)
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        flag = true
      }, delay)
    }
  }
}
function debounceFuncSlow(fn, delay = 1000) {
  // 参数校验必须为函数
  let flag = false
  let timer
  return function () { // 返回高阶函数
    if (flag === false) {
      flag = true // 点亮，这一步非常关键！！！
    } else {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
      flag = false
    }, delay)
  }
}
function throttleFuncQuick(fn, delay = 1000) {
  // 参数校验必须为函数
  let flag = true
  return function () { // 返回高阶函数
    if (flag === true) {
      fn()
      flag = false
      setTimeout(() => {
        flag = true
      }, delay)
    }
  }
}
function throttleFuncSlow(fn, delay = 1000) {
  // 参数校验必须为函数
  let flag = false
  return function () { // 返回高阶函数
    if (flag === false) {
      flag = true
      setTimeout(() => {
        fn()
        flag = false
      }, delay)
    }
  }
}
function fn() {
  console.log(1)
}
let fnNew = throttleFunc(fn)

// 扁平数据和树形结构互转
const treeData = [
    {
      id: 1,
      title: "课程1",
      children: [
        { id: 4, title: "课程1-1" },
        {
          id: 5,
          title: "课程1-2",
          children: [
            { id: 6, title: "课程1-2-1" },
            { id: 7, title: "课程1-2-2" },
          ],
        },
      ],
    },
    { id: 2, title: "课程2" },
    { id: 3, title: "课程3" },
  ];
  const flatData = [
    { id: 1,pid: 0, title: "课程1" },
    { id: 2,pid: 0, title: "课程2" },
    { id: 3,pid: 0, title: "课程3" },
    { id: 4,pid: 1, title: "课程1-1" },
    { id: 5,pid: 1, title: "课程1-2" },
    { id: 6,pid: 5, title: "课程1-2-1" }, // 循环走到这一步的理解很关键，对象存储是引用地址
    { id: 7,pid: 5, title: "课程1-2-2" },
  ]
  function turnTreeToList(tree, pid = 0) {
    // 参数校验
    const res = []
    const treeLen = tree.length
    if (treeLen > 0) {
      for (let i = 0; i < treeLen; i++) {
        let {id, title} = tree[i]
        res.push({id, pid, title})
        const temp = tree[i].children
        if (temp && temp.length > 0) {
          res.push(...turnTreeToList(tree[i].children, tree[i].id))
        }
      }
    }
    return res
  }
  function turnListToTree(list) {
    // 参数校验
    const resTree = []
    // 格式化list
    const formatList = []
    list.map((item) => {
      formatList[item.id] = {...item, children: []}
    })
    Object.keys(formatList).forEach((i) => {
      if (formatList[i].pid !== 0 && formatList.hasOwnProperty(formatList[i].pid)) {
        formatList[formatList[i].pid].children.push(formatList[i])
      } else {
        resTree.push(formatList[i])
      }
    })
    return resTree
  }
// Object.defineProperty + Proxy实现一个双向绑定
var obj = {
  name: 'jack',
  age: 18
}
function observe(obj) { // 只考虑普通的对象
  Object.keys(obj).forEach(k => {
    if (Object.prototype.toString.call().slice(8,-1) === 'Object') {
      observe(obj[k])
    } else {
      obj['_' + k] = obj[k]
      Object.defineProperty(obj, k, {
        get () {
          console.log('获取操作：' + k)
          return obj['_' + k]
        },
        set (newVal) {
          console.log('修改操作：' + k)
          obj['_' + k] = newVal
        }
      })
    }
    
  })
}
function observe(obj) {
  return new Proxy(obj, {
    get (t,k,r) {
      console.log('获取操作：' + k)
      return Reflect(t,k,r)
    },
    set (t,k,v,r) {
      console.log('修改操作：' + k)
      return Reflect(t,k,v,r)
    }
  })
}
observe(obj)
// 实现发布订阅
class Watcher {
  constructor () {
    this.deps = []
  }
  addDeps (log) {
    this.deps.push(log)
  }
  update () {
    this.deps.forEach(item => {
      console.log(item)
    })
  }
}
var w1 = new Watcher()
w1.addDeps(1)
w1.addDeps(2)
w1.addDeps(3)
w1.update()
// 深克隆浅克隆
function deepClone(target, res = {}) {
  const type = Object.prototype.toString.call(target).slice(8, -1)
  if (type === 'Object') {
    const res = {}
    Object.keys(target).forEach(k => {
      const item = target[k]
      const type = Object.prototype.toString.call(item).slice(8, -1)
      if (type === 'Object' || type === 'Array') {
        res[k] = deepClone(target[k])
      } else {
        res[k] = target[k]
      }
    })
    return res
  } else {
    const res = []
    target.forEach(item => {
      const type = Object.prototype.toString.call(item).slice(8, -1)
      if (type === 'Object' || type === 'Array') {
        res.push(deepClone(item))
      } else {
        res.push(item)
      }
    })
    return res
  }
  
}
var obj = {
  a: 1,
  b: {
    c: [1,2,3]
  }
}
var o1 = deepClone(obj)
var o2 = deepClone(obj)
o1.b.c.push(4)
console.log(o1.b.c)
console.log(o2.b.c)
// 事件捕获、冒泡
function test() {
  document.getElementById('father').addEventListener('click', function (){
    console.log('父级事件捕获')
  }, true)
  document.getElementById('son').addEventListener('click', function (){
    console.log('子级事件捕获')
  }, true)
  document.getElementById('son').addEventListener('click', function (){
    console.log('子级事件冒泡')
  }, false)
  document.getElementById('father').addEventListener('click', function (){
    console.log('父级事件冒泡')
  }, false)
}
test()
// Object.create()【新增】
Object.myCreate = function (proto) {
  // 入参必须为对象
  const type = Object.prototype.toString.call(inst).slice(8, -1)
  if (type !== 'Object' && type !== 'Null') throw new Error('Object prototype may only be a Object')
  const f = function () {}
  f.prototype = proto
  return new f()
}
// Object.assign()???【新增】
function 
// JSON.stringify()???【新增】
// JSON.parse()???【新增】
// instanceOf
const temp = {}
function myInstanceOf(inst, constructor) {
  if (Object.prototype.toString.call(inst).slice(8, -1) === 'Null') {
    return false
  } else if (inst.__proto__ === constructor.prototype) {
    return true
  } else {
    temp = inst.__proto__
    return myInstanceOf(temp, constructor.prototype)
  }
}
myInstanceOf([], Array)
// 解析 URL 参数为对象???【新增】
function compileUrl(uri) {
  let searchStr = uri.split('?')[1]
  let searchMapArray = searchStr.split('&')
  const searchMap = {}
  searchMapArray.forEach((str) => {
    let arr = str.split('=')
    let k = arr[0]
    let v = arr[1] === undefined ? true : decodeURI(arr[1])
    searchMap[k] = v
  })
  return searchMap
}
compileUrl('http:www.baidu.com/detail?name=jack&age=MTEx')
// 反转数组【新增】
function reverseArr(arr) {
  // 方法1：用栈暂存 时间O(n),空间O(n)
  const temp = []
  arr.forEach(element => {
    temp.unshift(element)
  });
  return temp
  // 方法2：双指针
  let len = arr.length
  let left = 0
  let right = len - 1
  while (left < right) {
    let temp = arr[left]
    arr[left] = arr[right]
    arr[right] = temp
    left++
    right--
  }
  return arr
}
reverseArr([1,3,5,7,9])
// rem的设置代码 【resize方法监听不熟】【文本宽度不熟】
window.addEventListener('resize', () => {
  document.getElementsByTagName('html')[0].setAttribute('style', `font-size: ${document.clientWidth / 750}px`)
})
// 字符串模板???【新增】
function compileTemplate(str){
  let reg = /\{\{(\w+)\}\}/ // 匹配{{}}中全是字母的
  if (reg.test(str)) {
    let k = reg.exec(str)[1]
    str = str.replace(reg, data[k])
    if (reg.test(str)) {
      return compileTemplate(str)
    } else {
      return str
    }
  }
  // 新方法
  return (str).replace(/\{\{(\w+)\}\}/g, function (word) {
      var key = word.slice(2, -2)
      return data[key]
  })
}
const data = {
  name: 'jack',
  age: 18
}
compileTemplate('我叫{{name}}，我今年{{age}}岁了。')
// 函数柯里化???
function add(a,b,c) {
  return a + b + c
}
function curry(fn) {
  return function() {
    fn()
    return fn
  }
}
var newAdd = curry(add)
newAdd(1)(2)(3)
// 数组扁平化 【新增】
function flatten(arr) {
  // 四种办法：flat/正则替换/递归
  // return arr.flat(Infinity)
  // return JSON.parse(`[${JSON.stringify(arr).replace(/\[|\]/g, '')}]`)
  // return JSON.parse(`[${arr.toString()}]`)
  let res = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      res.push(...flatten(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res
}
flatten([[1,2,[3,4],5],6,[7],8])
// 对象扁平化
const obj = {
  a: {
         b: 1,
         c: 2,
         d: {e: 5}
     },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
 }
 let res = {
  'a.b': 1,
  'a.c': 2,
  'a.d.e': 5,
  'b[0]': 1,
  'b[1]': 3,
  'b[2].a': 2,
  'b[2].b': 3,
  'c': 3
}
 function isObject(data) {
  return Object.prototype.toString.call(data).slice(8, -1) === 'Object'
 }
 function isArray(data) {
  return Object.prototype.toString.call(data).slice(8, -1) === 'Array'
 }
 function flattenObj(obj) {
  const res = {}
  function flatten(obj, prefix = '') { // 只对普通对象和数组进行扁平化
    if (isObject(obj)) {
      Object.keys(obj).forEach(k => {
        const item = obj[k]
        let newPrefix = prefix === '' ? k : prefix + '.' + k
        if (isObject(item) || isArray(item)) {
          flatten(item, newPrefix)
        } else {
          res[newPrefix] = item
        }
      })
    } else if (isArray(obj)) {
      obj.forEach((item, i) => {
        let newPrefix = `${prefix}[${i}]`
        if (isObject(item) || isArray(item)) {
          flatten(item, newPrefix)
        } else {
          res[newPrefix] = item
        }
      })
    }
  }
  flatten(obj, '')
  return res
 }
 flattenObj(obj)
// 类数组转化为数组
function turnToArray(arrLike) {
  // 方法1
  return Array.from(arrLike) // 强转
  // 方法二
  // return [].concat(arrLike) // 不行，需要用Array.prototype.concat.call(arrLike, [])
  // 方法三
  // return [...arrLike]
  // 方法四
  // return Array.prototype.slice.call(arrLike)
}
function test(a, b, c) {
  console.log(turnToArray(arguments))
}
test(1,2,3)
// 实现ajax???【新增】
// 实现数组的forEach/map/filter/some/reduce???
// promise~~~~~
// promise并行限制
// 渲染几万条数据不卡住页面
// 将vdom转换成真实dom
let vdom = {
  type: 'div',
  props: {
    style: 'border: 1px solid red',
    class: 'father'
  },
  children: [
    {
      type: 'p',
      props: {
        style: 'border: 1px solid blue',
        class: 'son1'
      }
    },
    {
      type: 'text',
      text: '我是子文本'
    },
    {
      type: 'p',
      props: {
        style: 'border: 1px solid green',
        class: 'son2'
      }
    }
  ]
}

function vdom2dom(vElement) {
  let element = document.createElement(vElement.type)
  Object.keys(vElement.props).forEach(k => {
    element.setAttribute(k, vElement.props[k])
  })
  if (vElement.children && vElement.children.length) {
    vElement.children.forEach(item => {
      if (item.type === 'text') {
        // element.innerText = item.text 这样有问题
        element.appendChild(document.createTextNode(item.text))
      } else {
        element.appendChild(vdom2dom(item))
      }
    })
  }
  return element
}
console.log(vdom2dom(vdom))
// 实现sleep【新增】
function sleepFn(fn, target, params, delay = 3000){
    setTimeout(function (){
      fn.apply(target, params)
    }, delay)
  }
  var obj = {
    aaa: 'test',
    fn: function (){
      console.log(this)
      console.log(arguments)
      console.log(this.aaa)
    }
  }
  sleepFn(obj.fn, obj, [1,2,3], 3000)

// 数字转千分位
function thousantSplit(num) {
  let res = num.toFixed(3)
  let [intStr, decStr] = String.prototype.split.call(res, '.')
  let newIntArr = []
  let flag = 0
  for (let len = intStr.length, i = len - 1; i >= 0; i--) {
    newIntArr.unshift(intStr[i])
    if (flag === 2) {
      flag = 0
      newIntArr.unshift(',')
      len++
    } else {
      flag++
    }
  }
  return newIntArr.join('').concat('.' + decStr)
  // ('12322432342').replace(/(\d{3})/g, function(word) {
  //   return word + ','
  // })
}
thousantSplit(12312423425345.3453423)
// 数组去重

// 防抖节流速度有点慢、扁平化数据和树互转、call有点卡顿, proxy的使用不熟
// 备忘：
// 原生dom修改内部文本用innerText
// 判断是否是引用类型的方法
function isObject(val) {
  return typeof val === "object" && val !== null;
}