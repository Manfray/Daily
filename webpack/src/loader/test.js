/**
 * loader Function
 * @param {String} content 文件内容
 */
module.exports = function(content){
  console.log('测试')
  console.log(content)
  return "测试loader:" + content
}