// 
// 实现原型继承的6种方式

// 1.直接原型链继承
function Animal() {
  this.aname = 'animal'
  this.colors = ['red', 'yellow', 'green']
}
Animal.prototype.sayAName = function () {
  console.log(this.aname)
}
function Cat() {
  this.cname = 'cat'
  this.cColor = ['black']
}
Cat.prototype = new Animal()
Cat.prototype.sayCName = function () {
  console.log(this.cname)
}
var c1 = new Cat()
console.log(c1)
// 会有两个问题
// 1、所有的cat实例，会共享原型中的colors属性，导致互相污染，解决办法，寄生式继承
// 2、生成实例时候没办法给Animal方法参数传参，只能传给Cat


// 2.借用式继承
function Animal(name) {
  this.aname = name
  this.colors = ['red', 'yellow', 'green']
}
Animal.prototype.sayAName = function () {
  console.log(this.aname)
}
function Cat() {
  Animal.apply(this, arguments)
  this.cname = 'cat'
  this.cColor = ['black']
}
Cat.prototype.sayCName = function () {
  console.log(this.name)
}
var c1 = new Cat()
console.log(c1)
// 借用式继承
// 1、解决了上面两个问题
// 2、会导致生成的实例没法访问父类原型中的方法
// 3、会导致父类的构造方法被子类调用，对父类有侵入，影响了父类的复用

// 3.组合继承（利用1和2）
function Animal(name) {
  this.aname = name
  this.colors = ['red', 'yellow', 'green']
}
Animal.prototype.sayAName = function () {
  console.log(this.aname)
}
function Cat() {
  Animal.apply(this, arguments)
  this.cname = 'cat'
  this.cColor = ['black']
}
Cat.prototype = new Animal()
Cat.prototype.sayCName = function () {
  console.log(this.name)
}
var c1 = new Cat()
console.log(c1)
// 调用了两次父类构造函数, 造成了不必要的消耗

// 寄生式继承
function Animal(name) {
  this.aname = name
  this.colors = ['red', 'yellow', 'green']
}
Animal.prototype.sayAName = function () {
  console.log(this.aname)
}
function Cat() {
  Animal.apply(this, arguments)
  this.cname = 'cat'
  this.cColor = ['black']
}
Cat.prototype = Animal.prototype // 会导致Cat的实例__proto__指向 Animal.prototype，把Cat抛弃了
Cat.prototype.sayCName = function () {
  console.log(this.name)
}
var c1 = new Cat()
console.log(c1)

// 终极方案
function Animal(name) {
  this.aname = name
  this.colors = ['red', 'yellow', 'green']
}
Animal.prototype.sayAName = function () {
  console.log(this.aname)
}
function Cat() {
  Animal.apply(this, arguments) // 这一步必须，这样Cat的实例才会有Animal构造函数中的属性
  this.cname = 'cat'
  this.cColor = ['black']
}
function objectCreate(obj) {
  function f() {}
  f.prototype = obj
  return new f()
}

// 继承方法有三种
Cat.prototype.__proto__ = Animal.prototype // 1、原型直接继承 ===>  不好意思，Animal就是Cat.prototype的爸爸
Cat.prototype = Object.create(Animal.prototype) // 2、ES6的语法   ===>    ES6 让Animal做Cat.prototype的爸爸
Cat.prototype = objectCreate(Animal.prototype) // 3、自己实现  ===> 给Animal找个老婆，Cat.prototype再做这个人的孩子

Cat.prototype.sayCName = function () {
  console.log(this.name)
}
var c1 = new Cat()
console.log(c1)
