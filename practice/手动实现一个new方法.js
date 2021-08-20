// 

function People(props = {}) {
  this.name = props.name
  this.age = props.age
}
// 这个方法会导致生成的实例的__proto__指向一个对象实例，因为People.prototype被重新定义了

// People.prototype = {
//   sayName () {
//     console.log(this.name)
//   },
//   getAge () {
//     return this.age
//   }
// }

People.prototype.sayName = function () {
  console.log(this.name)
}
People.prototype.getAge = function () {
  return this.age
}
const p1 = new People({
  name: 'jack',
  age: 22
})
p1.sayName()
console.log(p1.getAge())


function myNew(constructor, ...arg) {
  const res = {}
  // 执行构造函数给这个res实例赋值
  constructor.apply(res, arg) // 点评：没有考虑构造函数有返回的情况
  // 实例的__proto__挂到constructor.prototype上
  res.__proto__ = constructor.prototype // 点评：这一步应该放在第一步后面
  return res
}

const p2 = myNew(People, {
  name: 'jack',
  age: 22
})
p2.sayName()
console.log(p2.getAge())

// 对象顺序---------------------------------------------------------------------------------
const obj1 = {
  name: 'p1',
  age: 18
}


// 网上找的参考答案
/**
 * 模拟实现 new 操作符
 * @param  {Function} ctor [构造函数]
 * @return {Object|Function|Regex|Date|Error}      [返回结果]
 */
 function newOperator(ctor){
  if(typeof ctor !== 'function'){
    throw 'newOperator function the first param must be a function';
  }
  // ES6 new.target 是指向构造函数
  newOperator.target = ctor;
  // 1.创建一个全新的对象，
  // 2.并且执行[[Prototype]]链接
  // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
  // 怎么理解__proto__和[[prototype]]? =>其实说__proto__并不准确，确切的说是对象的[[prototype]]属性，只不过在主流的浏览器中，都用__proto__来代表[[prototype]]属性，因为[[prototype]]只是一个标准，而针对这个标准，不同的浏览器有不同的实现方式。在ES5中用Object.getPrototypeOf函数获得一个对象的[[prototype]]。ES6中，使用Object.setPrototypeOf可以直接修改一个对象的[[prototype]]。为了方便，我下面的文章用__proto__来代表对象的[[prototype]]。
  var newObj = Object.create(ctor.prototype);
  // ES5 arguments转成数组 当然也可以用ES6 [...arguments], Aarry.from(arguments);
  // 除去ctor构造函数的其余参数
  var argsArr = [].slice.call(arguments, 1);
  // 3.生成的新对象会绑定到函数调用的`this`。
  // 获取到ctor函数返回结果
  var ctorReturnResult = ctor.apply(newObj, argsArr);
  // 小结4 中这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
  var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
  var isFunction = typeof ctorReturnResult === 'function';
  if(isObject || isFunction){
      return ctorReturnResult;
  }
  // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
  return newObj;
}

// new 做了什么
// 1、创建了一个全新的对象。
// 2、这个对象会被执行[[Prototype]]（也就是__proto__）链接。
// 3、生成的新对象会绑定到函数调用的this。
// 4、通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上。
// 5、如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用会自动返回这个新的对象。

// MDN 文档

// new 关键字会进行如下的操作：
// 创建一个空的简单JavaScript对象（即{}）；
// 为步骤1新创建的对象添加属性__proto__，将该属性链接至构造函数的原型对象 ；
// 将步骤1新创建的对象作为this的上下文 ；
// 如果该函数没有返回对象，则返回this。

// 作者：若川
// 链接：https://juejin.cn/post/6844903704663949325
// 来源：掘金

function people(props = {}) {
  this.name = props.name
  this.age = props.age
}

people.prototype.sayName = function () {
  console.log(this.name)
}
people.prototype.getAge = function () {
  return this.age
}
const p1 = new people({
  name: 'jack',
  age: 22
})
p1.sayName() // jack
console.log(p1.getAge()) // 22


// 改造后
function myNew(constructor, ...arg) {
  const res = {}
  // 实例的__proto__挂到constructor.prototype上
  res.__proto__ = constructor.prototype // 点评：这一步应该放在第一步后面
  // 执行构造函数给这个res实例赋值
  const fnReturn = constructor.apply(res, arg) // 点评：没有考虑构造函数有返回的情况

  return Object.prototype.toString.call(fnReturn) === '[object Object]' ? fnReturn : res
}



// 思考：
//封装一个函数时候，需要注意先锁定参数范围，不符合的抛出异常，符合的根据分类进行下一步操作
// 构造函数首字母大写是约定俗成的，不强制要求
// 构造函数可以有返回，如果是基础类型，就返回this;如果是引用类型，就返回引用类型；
// 类数组对象转换成数组的方式 Array.from(arguments) / [...arguments] / [].slice.call(arguments)