console.log(1)
Promise.resolve().then(() => { // script宏任务中的微任务，会在当前宏任务执行完了之后，全部执行
  console.log(3)
})
new Promise((resolve, reject) => {
  resolve()
  console.log(4)
}).then(() => {
  console.log(5)
})