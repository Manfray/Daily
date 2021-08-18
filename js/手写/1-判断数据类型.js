function getDataType(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
}
console.log(getDataType(1))
console.log(getDataType(true))
console.log(getDataType('aaa'))
console.log(getDataType(undefined))
console.log(getDataType(null))
console.log(getDataType({a: 1}))
console.log(getDataType([]))
console.log(getDataType(function () {}))
console.log(getDataType(new Date()))
console.log(getDataType(new Error()))