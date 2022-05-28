<template>
  <div class="tiny-toolbar-box">
      <slot>工具栏</slot>
  </div>
</template>

<script>


export default {
  name: 'ReportToolbarBox',
  components: {
  }, 
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tiny-toolbar-box {
  display: flex;
  justify-content:center;
  align-items: center;
}



</style>
