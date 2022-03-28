<template>
  <div class="tiny-designer-top">
    <div class="designer-layout-box">
      <el-radio-group v-model="radio1"  size="mini">
        <el-radio-button label="设计"></el-radio-button>
        <el-radio-button label="填写"></el-radio-button>
        <el-radio-button label="打印"></el-radio-button>
      </el-radio-group>
      <div class="btn-diviler"></div>    
      <el-radio-group v-model="radio2"  size="mini">
        <el-radio-button label="A4"></el-radio-button>
        <el-radio-button label="B5"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="designer-toolsbar">
      <el-button size="mini">导入JSON</el-button>
      <el-button size="mini">预览</el-button>
      <el-button size="mini">清空</el-button>
      <el-button size="mini">导出JSON</el-button>
      <el-button size="mini">生成代码</el-button>
    </div>
  </div>
</template>

<script>



export default {
  name: 'TinyDesignerTop',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      radio1:"3",
      radio2:"A4"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.tiny-designer-top {

  width: 100%;
  height: 45px;
  border:1px solid #cccccc;

  padding: 10px;

  display: flex;
  justify-content:space-between;
  align-items: center;


}


.btn-diviler {
    height: 25px;
    float: left;
    width: 1px;
    background: #eee;
    margin: 10px;
}

.designer-layout-box {

  display: flex;
  justify-content:center;
  align-items: center;
}
.designer-toolsbar {


}


.el-button+.el-button {
  margin-left: 0px;
}





</style>
