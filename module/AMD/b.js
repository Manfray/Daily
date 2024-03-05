// b.js
define(['a.js'], function(a) {
  var name = 'lilei'
  var age = 15
  console.log(a.name) // 'morrain'
  console.log(a.getAge()) // 18
  return {
    name,
    getAge: () => age
  }
})
