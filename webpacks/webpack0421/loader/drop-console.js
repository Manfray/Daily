const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')
module.exports=function(source){
  const ast = parser.parse(source,{ sourceType: 'module'})
  console.log('这是抽象语法树')
  // console.log(ast)
  traverse(ast,{
    CallExpression(path){ 
      console.log('这是转换后的path对象')
      // console.log(path)
      if(t.isMemberExpression(path.node.callee) && t.isIdentifier(path.node.callee.object, {name: "console"})){
        path.remove()
      }
    }
  })
  const output = generator(ast, {}, source);
  console.log('这是重新生成的js代码')
  console.log(output)
  return output.code
}