/**
 * 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过Webpack提供的API改变输出结果。通俗来说：一盘美味的 
 * 盐豆炒鸡蛋 需要经历烧油 炒制 调味到最后的装盘等过程，而plugin相当于可以监控每个环节并进行操作，比如可以写一个少放胡椒粉plugin,监控webpack
 * 暴露出的生命周期事件(调味)，在调味的时候执行少放胡椒粉操作。那么它与loader的区别是什么呢？上面我们也提到了loader的单一原则,loader只能一件
 * 事，比如说less-loader,只能解析less文件，plugin则是针对整个流程执行广泛的任务。
 */
// Creating a Plugin 
// A plugin for webpack consists of:

// A named JavaScript function or a JavaScript class.
// Defines apply method in its prototype.
// Specifies an event hook to tap into.
// Manipulates webpack internal instance specific data.
// Invokes webpack provided callback after functionality is complete.
// webpack5以后的用法和5以前的用法不一样
class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('HelloWorldPlugin', (compilation,callback)=>{ // tapAsync, tapPromise异步事件钩子, 
      setTimeout(function () {
        console.log('Done with async work...');
        let str = ''
        for (let filename in compilation.assets){
          // console.table(compilation.assets)
          console.log(filename)
          str += `文件:${filename}  大小${compilation.assets[filename]['size']()}\n`
        }
        // 通过compilation.assets可以获取打包后静态资源信息，同样也可以写入资源
        compilation.assets['fileSize.md'] = {
          source:function(){
            return str
          },
          size:function(){
            return str.length
          }
        }
        callback()
      }, 1000)
    });
  }
}

module.exports = HelloWorldPlugin;