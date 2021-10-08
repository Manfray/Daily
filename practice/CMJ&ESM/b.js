const say = require('./a')
console.log(say.say)
const  object = {
   name:'《React进阶实践指南》',
   author:'我不是外星人'
}
console.log('我是 b 文件')
module.exports = function(){
    return object
}
exports.num = 1
