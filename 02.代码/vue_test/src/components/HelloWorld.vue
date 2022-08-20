<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <input v-if="isEdit" ref="input666" type="text">
    <button v-else @click="clickHandler">+1</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 1,
      isEdit:false
    }
  },
  methods: {
    clickHandler() {
      // console.log('A',this.msg)
      // this.msg = 2;
      // console.log('B',this.msg)
      // debugger
      this.isEdit=true;

      // nextTick接收一个回调函数,该回调函数会在视图更新之后执行
      this.$nextTick(()=>{
        this.$refs.input666.focus();
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
