<template>
  <div class="tiny-designer-top">
    <TinyToolbarBox>
      <el-radio-group v-model="radio_model"  size="tiny" @change="onReportModel">
        <el-radio-button label="design">设计</el-radio-button>
        <el-radio-button label="write">填写</el-radio-button>
        <el-radio-button label="tab">TAB</el-radio-button>
        <el-radio-button label="preview">预览</el-radio-button>
      </el-radio-group>
      <div class="btn-diviler"></div>
      <el-button size="tiny" @click="onToolHit('btn_print')">打印</el-button>
      <div class="btn-diviler"></div>
      <el-radio-group v-model="radio2"  size="tiny" @change="onReportSize">
        <el-radio-button label="btn_paper_a4">A4</el-radio-button>
        <el-radio-button label="btn_paper_b5">B5</el-radio-button>
        <el-radio-button label="btn_paper_tiny">Tiny</el-radio-button>
      </el-radio-group>
      <div class="btn-diviler"></div>
      <el-button size="tiny" @click="onToolHit('btn_friend_name')">友好名</el-button>
      <div class="btn-diviler"></div>    
      <!--对齐部分-->
      <el-popover placement="top" trigger="hover">
            <div class="tiny-toolbar-btn" @click="onToolHit('align_left')"><i class="icon iconfont icon-tiny-reportzuoduiqi"></i></div>
            <div class="tiny-toolbar-btn" @click="onToolHit('align_left')"><i class="icon iconfont icon-tiny-reportjurassic_horizalign-center"></i></div>
            <div class="tiny-toolbar-btn" @click="onToolHit('align_right')"><i class="icon iconfont icon-tiny-reportyouduiqi"></i></div>
            <div class="tiny-toolbar-btn" @click="onToolHit('align_top')"><i class="icon iconfont icon-tiny-reportshangduiqi1"></i></div>
            <div class="tiny-toolbar-btn" @click="onToolHit('align_left')"><i class="icon iconfont icon-tiny-reportchuizhijuzhongduiqi2"></i></div>
            <div class="tiny-toolbar-btn" @click="onToolHit('align_bottom')"><i class="icon iconfont icon-tiny-reportxiaduiqi1"></i></div>
            <div class="tiny-toolbar-btn" @click="onToolHit('align_width')"><i class="icon iconfont icon-tiny-reportdengkuan1"></i></div>
            <div class="tiny-toolbar-btn" @click="onToolHit('align_height')"><i class="icon iconfont icon-tiny-reportdenggao1"></i></div>
        <el-button size="tiny" slot="reference">对齐</el-button>
      </el-popover>
      <div class="btn-diviler"></div>
      <el-button size="tiny" @click="onToolHit('btn_test')">测试</el-button>


    </TinyToolbarBox>
    <div class="designer-toolsbar">
      <TinyToolbarBox>
        <el-button size="tiny" @click="onToolHit('qr-code')">导入</el-button>
        <el-button size="tiny" @click="onToolHit('qr-code')">导出</el-button>
      </TinyToolbarBox>
    </div>
  </div>
</template>

<script>

import TinyToolbarBox from './TinyToolbarBox.vue'


export default {
  name: 'TinyDesignerTop',
  components:{ TinyToolbarBox},

  props: {
      model:{
        type: String,
      }
  },  
  data () {
    return {
      radio_model:"3",
      radio2:"A4",
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]      

    }
  },
  watch: {
    model:{
            handler(newVal) {
              this.radio_model = newVal;
            },
            deep:true,
            immediate:true,
        },
  },
  methods:{

    onBtnHit(data, data1){
      this.$emit('onBtnHit', data, data1)
    },
    onToolHit(data){
      this.onBtnHit(data);
    },
    onReportModel(data){
      this.$emit('modelchange', data)
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
  height: 42px;
  border:0px solid #cccccc;

  display: flex;
  justify-content:space-between;
  align-items: center;
}


.btn-diviler {
    height: 25px;
    float: left;
    width: 1px;
    background: #eee;
    margin: 5px;
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
