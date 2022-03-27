<template>
  <div class="tiny-designer-top">
    <el-radio-group v-model="radio1"  size="mini">
      <el-radio-button label="设计"></el-radio-button>
      <el-radio-button label="填写"></el-radio-button>
      <el-radio-button label="打印"></el-radio-button>
    </el-radio-group>
    <div class="btn-diviler"></div>    

  </div>
</template>

<script>



export default {
  name: 'TinyDesignerTop',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      radio1:"3"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.tiny-designer-top {

  width: 100%;
  height: 45px;

  display: flex;
  justify-content: left;
  align-items: center;


}


.btn-diviler {
    height: 25px;
    float: left;
    width: 1px;
    background: #eee;
    margin: 10px;
}

</style>
