//
// 来一遍四大基础排序2213 插入排序和冒泡排序要整理
function bubbleSort(arr) {
  let len = arr.length
  for (let o = 0; o < len - 1; o++) {
    for (let i = 0; i < len - 1 - o; i++) {
      // 前一个与一个比，若前一个比后一个大，就调换顺序
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
      }
    }
  }
  return arr
}
function quickSort(arr) {
  let len = arr.length
  for (let o = 0; o < len - 1; o++) {
    for (let i = o + 1; i < len; i++) {
      // 前一个与一个比，若前一个比后一个大，就调换顺序
      if (arr[o] > arr[i]) {
        let temp = arr[o]
        arr[o] = arr[i]
        arr[i] = temp
      }
    }
  }
  return arr
}
function insertSort(arr) {
  // 参数校验。。。略。。。
  // 思路：讲源数组从前往后依次拿出，插入目标数组内，并按照指定顺序排序
  const res = []
  for (let i = 0; i < arr.length; i++) { // 遍历原数组
    if ( i === 0 ) {
      res.push(arr[i])
    } else {
      for (let j = 0; j < res.length; j += 2) {
        // 大于等于前面一个，小于后面一个
        // 大于等于前面一个，后面一个是undefined
        if (arr[i] < res[j]) {
          res.splice(j, 0, arr[i])
          break
        } 
        else if (arr[i] < res[j + 1] || res[j + 1] === undefined) {
          res.splice(j + 1, 0, arr[i])
          break
        }
      }
    }
  }
  return res
}
function quickSort(arr) {
  // 参数校验
  if(arr.length > 1) {
    let leftArr = []
    let rightArr = []
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > arr[0]) {
        rightArr.push(arr[i])
      } else {
        leftArr.push(arr[i])
      }
    }
    return [...quickSort(leftArr), arr[0], ...quickSort(rightArr)]
  } else {
    return arr
  }
  
}
quickSort([5,1,9,3,7,4,6,2,8])

// 实现new  不太熟练
function Animal() {
  this.color = '各种颜色'
}
function myNew(construtor, ...arg) {
  const res = {}
  res.__proto__ = construtor.prototype
  const fnReturn = construtor.call(res, arg)
  return Object.prototype.toString.call(fnReturn).slice(8, -1) === 'Object' ? fnReturn : res
}
var newObj = myNew(Animal, ...arg)

// 实现继承  不太记得了，要复习
function Animal(name) {
  this.aname = name
  this.colors = ['red', 'yellow', 'green']
}
Animal.prototype.sayAName = function () {
  console.log(this.aname)
}
function Cat() {
  Animal.call(this, 'Animal')
  this.cname = 'cat'
  this.cColor = 'black'
}
// Cat.prototype.__proto__ = Animal.prototype
Cat.prototype__proto__ = Object.create(Animal.prototype)
Cat.prototype.sayCName = function () {
  console.log(this.cname)
}
var c1 = new Cat()
console.log(c1)
// 实现 apply call  没问题了
Function.prototype.myCall = function (target, ...arg) {
  target || (target = window)
  let obj = target
  obj.fn = this
  return obj.fn(...arg)
}
Function.prototype.myApply = function (target, arg) {
  target || (target = window)
  arg || (arg = [])
  let obj = target
  obj.fn = this
  return obj.fn(...arg)
}
Object.prototype.toString.myCall([1,2,3])
// 实现bind
Function.prototype.myBind = function (target) {
  return () => {
    this.myApply(target)
  }
}
Object.prototype.toString.bind([1,2,3])
// 实现防抖节流,防抖和节流执行的函数都是事件，所以不存在需要返回值的， 延迟执行的防抖写不出来
function debounceFun0(fn) {
  let flag = true
  let timer = null
  return () => {
    if (flag === true) {
      flag = false
      timer = setTimeout(() => {
        flag = true
      }, 1000)
      return fn.myApply(this)
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        flag = true
      }, 1000)
    }
    
  }
}
function debounceFun1(fn) {
  let flag = false
  let timer = null
  return () => {
    if (flag = false) {
      flag = true // 指示灯亮了，三秒准备动作后执行
      // timer = setTimeout(() => {
      //   fn.myApply(this) // 执行完任务，
      //   flag = false // 关闭指示灯
      // }, 1000)
    } else { // 灯亮
      clearTimeout(timer) // 停止前面动作，重新执行三秒的慢动作
      // timer = setTimeout(() => {
      //   fn.myApply(this) // 执行完任务，关闭任务执行状态
      //   flag = false
      // }, 1000)
    }
    timer = setTimeout(() => {
      fn.myApply(this) // 执行完任务，关闭任务执行状态
      flag = false
    }, 1000)
  }
}
function trottleFn(fn) { // 节流
  const self = this
  let flag = true // 状态灯
  return function () {
    if (flag) {
      fn.apply(self) // 立即执行
      flag = false
      setTimeout(() => {
        // fn.apply(self) // 推迟执行
        flag = true
      },1000)
    }
    
  }
}
let fn = function () {
  console.log(1)
  return 1
}
let fnNew = trottleFn(fn)
fnNew()
// 实现深浅克隆  一把过
function shallowClone(obj) {
  const res = {}
  Object.keys(obj).forEach(k => {
    res[k] = obj[k]
  })
  return res
}
function deepClone(obj) {
  const res = {}
  Object.keys(obj).forEach(k => {
    if (Object.prototype.toString.call(obj[k]).slice(8, -1) === 'Object') {
      res[k] = deepClone(obj[k])
    } else {
      res[k] = obj[k]
    }
  })
  return res
}
var test = {
  a:1,
  b: {
    c: 1
  }
}
var t1 = shallowClone(test)
var t2 = shallowClone(test)
var t3 = deepClone(test)
var t4 = deepClone(test)
// 生成指定广度深度的对象  也有问题
function createData(d, b) {
  let res = {}
  let temp = res
  for (let i = 0; i < d; i++) {
    temp.data = {}
    for (let j = 0; j < b; j++) {
      temp[j] = j
    }
    temp = temp.data
  }
  return res
}
createData(3, 3)
// 扁平化数据和树形数据互转  写的有问题，需复习
const tree = [{
  id: 1,
  pid: 0,
  content: '1',
  children: [
    {
      id: 2,
      pid: 1,
      content: '2'
    },
    {
      id: 3,
      pid: 1,
      content: '3',
      children: [
        {
          id: 4,
          pid: 3,
          content: '4'
        },
        {
          id: 5,
          pid: 3,
          content: '4'
        }
      ]
    },
    {
      id: 6,
      pid: 1,
      content: '6'
    }
  ]
}]
const list = [
  {id: 1, pid: 0, content: '1'},
  {id: 2, pid: 1, content: '2'},
  {id: 3, pid: 1, content: '3'},
  {id: 4, pid: 3, content: '4'},
  {id: 5, pid: 3, content: '5'},
  {id: 6, pid: 0, content: '6'}
]
function treeToList(tree) {
  const res = []
  function fn(t, res) {
    t.forEach(item => {
      const {id, pid, content} = item
      const {children} = item
      let li = {id, pid, content}
      res.push(li)
      if (children && children.length) {
        fn(children, res)
      }
    })
  }
  fn(tree, res)
  return res
}
function listToTree(list) {
  const res = []
  const formatMap = {}
  // 格式化
  list.map(item => {
    formatMap[item.id] = {...item, children: []}
  })
  Object.keys(formatMap).forEach(k => {
    const item = formatMap[k]
    if (item.pid === 0) {
      res.push(item)
    }
    if (formatMap.hasOwnProperty(item.pid)) {
      formatMap[item.pid].children.push(item)
    }
  })
  return res
}
listToTree(list)
treeToList(tree)
