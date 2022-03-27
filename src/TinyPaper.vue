<template>
  <div class="tiny-paper-box">
    <div class="tiny-paper rd-f5">
      <div class="tiny-paper-content">
        ReportPaper组件1
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TinyPaper',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tiny-paper-box {
  width: 100%;
  height: 100%;

  padding: 20px;

  background-color: #edeef3;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow:scroll;
}



.rd-f5 {
    background-color: #fff;
    box-shadow: 0 3px 6px 0 rgba(0,0,0,.3);
}


.tiny-paper {
  width: 500px;
  height: 400px;
  padding: 15px;
}

.tiny-paper-content {
  width: 100%;
  height: 100%;

  border:1px dashed #cccccc;
}


</style>
