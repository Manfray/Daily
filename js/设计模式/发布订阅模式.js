// 简单的发布订阅模式
const fabu = {}
fabu.a = "a"
fabu.eventList = []
fabu.addEvent = function (func) {
  this.eventList.push(func)
}
fabu.publish = function () {
  for (let index = 0; index < this.eventList.length; index++) {
    this.eventList[index].apply(this, arguments)
    // this.eventList[index]()
  }
}
fabu.addEvent(function () {
  console.log(111)
  console.log(this.a)
})
fabu.addEvent(function () {
  console.log(222)
})
console.log(fabu.eventList)
fabu.publish()



// 原型的实现发布订阅模式
function Dep () {
  this.eventList = []
}
Dep.prototype.addEvent = function (func) {
  this.eventList.push(func)
}
Dep.prototype.notice = function () {
  for (let index = 0; index < this.eventList.length; index++) {
    this.eventList[index].do()
  }
}
function Watcher (func) {
  this.do = func
}
var w1 = new Watcher(function () {
  console.log(111)
})
var w2 = new Watcher(function () {
  console.log(222)
})
var d = new Dep()
d.addEvent(w1)
d.addEvent(w2)
d.notice()