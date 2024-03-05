
// b.js 文件内容
module.exports = {
  mname: 'b'
}
const a = require('./a.js')
console.log('我是b.js, 打印a.js的导出：', a)
