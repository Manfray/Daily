// bundle.js
(function(modules) {
  // 模块管理的实现
  // 闭包缓存对象
  var installedModules = {}
  /**
   * 加载模块的业务逻辑实现
   * @param {String} moduleName 要加载的模块名
   */
  var require = function(moduleName) {
    // 如果已经加载过，就从缓存获取直接返回
    if (installedModules[moduleName]) return installedModules[moduleName].exports

    // 如果没有加载，就生成一个 module，并放到 installedModules
    var module = installedModules[moduleName] = {
      moduleName: moduleName,
      exports: {}
    }

    // 执行要加载的模块
    modules[moduleName].call(module.exports, module, module.exports, require)

    return module.exports
  }

  return require('index.js')
})({
  'a.js': function(module, exports, require) {
    // a.js 文件内容
    const b = require('b.js')
    console.log('我是a.js, 打印b.js的导出：', b)
    const array = []
    module.exports = {
      mname: 'a',
      setArray: () => {
        array.push(1)
      },
      getArray: () => {
        console.log(array)
      }
    }
  },
  'b.js': function(module, exports, require) {
    // b.js 文件内容
    const a = require('a.js')
    console.log('我是b.js, 打印a.js的导出：', a)
    a.setArray()
    a.setArray()
    a.setArray()
    a.getArray()
    module.exports = {
      mname: 'b'
    }
  },
  'index.js': function(module, exports, require) {
    // index.js 文件内容
    const b = require('b.js')
    console.log('我是index.js, 打印b.js的导出：', b)
    module.exports = {
      mname: 'index'
    }
  }
})
