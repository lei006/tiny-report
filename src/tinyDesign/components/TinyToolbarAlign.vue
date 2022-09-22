<template>
  <div>
      <el-button size="mini" @click="onToolHit('btn_print')">打印</el-button>
      <el-button size="mini" @click="onToolHit('btn_print')">打印</el-button>
  </div>
</template>

<script>

export default {
  name: 'ReportToolbarAlign',
  components: {}, 
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
