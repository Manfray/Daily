
// a.js 文件内容
const b = require('./b.js')
console.log('我是a.js, 打印b.js的导出：', b)
module.exports = {
  mname: 'a'
}
