1. 用npm run dev 替换 webpack才能运行，是因为直接运行webpack会去全局找这个命令，npm run dev会在当前这个项目里面找webpack命令

# 跟目录下直接放node_modules，方便所有模块直接引用

使用 watch mode(观察模式) 
你可以指示 webpack "watch" 依赖图中所有文件的更改。如果其中一个文件被更新，代码将被重新编译，所以你不必再去手动运行整个构建。
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "watch": "webpack --watch",
  "build": "webpack"
  }
```

"server": "webpack serve" // webpack-cli 4以上支持
"server": "webpack-dev-server" // webpack-cli 4以下支持 两个版本彼此互不支持

讲的还不错的webpack教程：https://juejin.cn/post/6844904031240863758#heading-36