<template>
  <div class=''>
    <p ref="nm">{{ name }}</p>
    <button @click="test">增加</button>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      name: 111
    }
  },
  methods: {
    test () {
      // for (let i = 0; i < 10; i++) {
        console.log('乘以2')
        this.name = this.name * 2
        // setTimeout(() => {
        //   this.name = this.name * 2
        //   console.log(this.name)
        // }, 1000);
        setTimeout(() => {
          console.log('s1')
          console.log(this.$refs['nm'].innerText)
          this.name = this.name / 2
        }, 0);
        setImmediate(() => {
          console.log('s2')
          console.log(this.$refs['nm'].innerText)
          this.name = this.name / 2
        }, 0);
        Promise.resolve().then(() => {
          console.log('sp')
          console.log(this.$refs['nm'].innerText)
          this.name = this.name / 2
        }, 0);
        this.$nextTick(() => {
          console.log('ss')
          console.log(this.$refs['nm'].innerText)
          this.name = this.name / 2
        })
        console.log('乘以2')
        this.name = this.name * 2
        /**
         * 最终的结果
         */
        // 39 ss 说明1、宏任务结束后，页面会渲染，再执行微任务；2、nextTick是微任务里最快执行的
        // 40 222 
        // 34 sp resolve紧随其后
        // 35 222 // 这里要特别注意，说明两个微任务执行中，页面是不会渲染的
        // 29 s2 // 说明setimmidiate是宏任务里面最快执行的
        // 30 55.5 // 这里由于微任务自除了两次，所以除了4
        // 24 s1 // 最后执行的微任务
        // 25 27.75
      // }
    }
  },
}
</script>
<style scoped lang='scss'>
</style>
