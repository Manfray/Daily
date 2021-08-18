这个loader依赖以下三个包
```
npm i -D @babel/parser @babel/traverse @babel/generator @babel/types
```
下面是各个包的作用：
- @babel/parser 将源代码解析成 AST
- @babel/traverse 对AST节点进行递归遍历，生成一个便于操作、转换的path对象
- @babel/generator 将AST解码生成js代码
- @babel/types通过该模块对具体的AST节点进行进行增、删、改、查