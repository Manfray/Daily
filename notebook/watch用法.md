### watch中的复杂应用场景，
```
'activeData.styleCssConfig.background-color'(val, oldVal) {
    updateCustomDecorats({ 'background-color': val }, this.activeData)
},
```

data中的数据由简单的字符串变为复杂的待处理的，这种怎么办？如果还用之前的那种监听方式，可能会报下诉错误

Failed watching path: "activeData.styleCssConfig.background-color" Watcher only accepts simple dot-delimited paths. For full control, use a function instead.

意思是说，只接受简单的点分隔路径。 要完全控制，请改用函数

```

created() {
  this.initAlginAndJustifyMap()
  this.$watch(
    function () {
      return this.activeData.styleCssConfig['background-color']
    },
    function (val, oldVal) {
      console.log(111)
      updateCustomDecorats({ 'background-color': val }, this.activeData)
    }
  )
},
```