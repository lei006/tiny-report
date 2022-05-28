<template>
  <div class="tiny-designer-top">
    <TinyToolbarBox>
      <el-radio-group v-model="radio1"  size="mini" @change="onReportModel">
        <el-radio-button label="btn_design">设计</el-radio-button>
        <el-radio-button label="btn_write">填写</el-radio-button>
        <el-radio-button label="btn_preview">预览</el-radio-button>
      </el-radio-group>
      <div class="btn-diviler"></div>    
      <el-button size="mini" @click="onToolHit('btn_print')">打印</el-button>
      <div class="btn-diviler"></div>
      <el-radio-group v-model="radio2"  size="mini" @change="onReportSize">
        <el-radio-button label="btn_paper_a4">A4</el-radio-button>
        <el-radio-button label="btn_paper_b5">B5</el-radio-button>
      </el-radio-group>
      <div class="btn-diviler"></div>
        <div class="tiny-toolbar-btn" @click="onToolHit('align_left')"><i class="icon iconfont icon-tiny-reportzuoduiqi"></i></div>
        <div class="tiny-toolbar-btn" @click="onToolHit('align_left')"><i class="icon iconfont icon-tiny-reportjurassic_horizalign-center"></i></div>
        <div class="tiny-toolbar-btn" @click="onToolHit('align_right')"><i class="icon iconfont icon-tiny-reportyouduiqi"></i></div>
      <div class="btn-diviler"></div>

        <div class="tiny-toolbar-btn" @click="onToolHit('align_top')"><i class="icon iconfont icon-tiny-reportshangduiqi1"></i></div>
        <div class="tiny-toolbar-btn" @click="onToolHit('align_left')"><i class="icon iconfont icon-tiny-reportchuizhijuzhongduiqi2"></i></div>
        <div class="tiny-toolbar-btn" @click="onToolHit('align_bottom')"><i class="icon iconfont icon-tiny-reportxiaduiqi1"></i></div>
      <div class="btn-diviler"></div>
        <div class="tiny-toolbar-btn" @click="onToolHit('align_left')"><i class="icon iconfont icon-tiny-reportdengkuan1"></i></div>
        <div class="tiny-toolbar-btn" @click="onToolHit('align_left')"><i class="icon iconfont icon-tiny-reportdenggao1"></i></div>


    </TinyToolbarBox>
    <div class="designer-toolsbar">
      <TinyToolbarBox>
        <el-button size="mini" @click="onToolHit('qr_code')">导入JSON</el-button>
        <el-button size="mini" @click="onToolHit('qr_code')">预览</el-button>
        <el-button size="mini" @click="onToolHit('qr_code')">清空</el-button>
        <el-button size="mini" @click="onToolHit('qr_code')">导出JSON</el-button>
        <el-button size="mini" @click="onToolHit('qr_code')">生成代码</el-button>
      </TinyToolbarBox>
    </div>
  </div>
</template>

<script>

import TinyToolbarAlign from './TinyToolbarAlign.vue'
import TinyToolbarBox from './TinyToolbarBox.vue'


export default {
  name: 'TinyDesignerTop',
  components:{TinyToolbarAlign, TinyToolbarBox},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      radio1:"3",
      radio2:"A4"
    }
  },
  methods:{

    onBtnHit(data, data1){
      this.$emit('onBtnHit', data, data1)
    },
    onToolHit(data){
      this.onBtnHit(data);
    },
    onReportModel(data){
      this.onBtnHit(data);
    },
    onReportSize(data){
      this.onBtnHit(data);
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



.el-radio-button--mini .el-radio-button__inner {
    padding: 1px 2px;
    font-size: 12px;
    border-radius: 2;
}

.tiny-toolbar-btn{


display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    border-radius: 4px;

    padding: 2px 5px;
    font-size: 10px;
    border-radius: 2;
    margin-right: 2px;
}

.tiny-toolbar-btn:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 1;
}
.tiny-toolbar-btn:hover {
    color: #409EFF;
    border-color: #409EFF;
    outline: 1;
}


</style>
