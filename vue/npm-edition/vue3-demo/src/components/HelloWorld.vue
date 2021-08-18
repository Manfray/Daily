<template>
  <div class="hello">
    <!-- <h1 :class="cssvar.helloworldH1">{{ msg }}{{cssvar.helloworldH1}}</h1> -->
    <!-- <h1 :class="cssvar.helloworldH1">{{ msg }}{{cssvar.helloworldH1}}</h1> -->
    <span v-for="(item, index) in arr" :key="index">{{item}}</span>
    <button @click="test1">test1</button>
    <button @click="test2">test2</button>
  </div>
</template>

<script>
import cssvar from '../style/var.scss'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      arr: [1,2,3]
    }
  },
  computed: {
    cssvar () {
      return cssvar
    }
  },
  mounted() {
    console.log(cssvar)
  },
  methods: {
    test1 () {
      this.arr[2] = 4
    },
    test2 () {
      this.$set(this.arr, 2, 4)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  color: red;
  .test {
    transform: scale(3);
  }
  a {
    color: goldenrod;
  }
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
