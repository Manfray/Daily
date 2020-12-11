// 代理模式
var test = 1
var aaa = (function () {
  var test = 1
  return function () {
    test ++
    console.log(test)
  }
})()
aaa()
aaa()
console.log(test)

for (var index = 0; index < 5; index++) {
  setTimeout(function () {
    console.log(index)
  }, 0)
}
var i = 0
if (i<4) {
  setTimeout(function () {
    console.log(i)
  }, 0)
  i++
  if (i < 2) {
    setTimeout(function () {
      console.log(i)
    }, 0)
    i++
    if (i < 2) {
      setTimeout(function () {
        console.log(i)
      }, 0)
    }
  }
}

