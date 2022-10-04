<template>
    <div class="components-list tiny-report-no-select">
      <div class="title-bar">报告操作</div>
      <div class="item">
            <div class="title">模式:</div>
            <div class="data">
                <el-select v-model="reportOptions.model" size="mini" placeholder="请选择">
                    <el-option
                    v-for="item in options_model"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>                
            </div>
        </div>
        <div class="item">
            <div class="title">比例:</div>
            <div class="data">
                <el-select v-model="reportOptions.pageRatio" size="mini" placeholder="请选择">
                    <el-option
                    v-for="item in options_scale"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>  
            </div>
        </div>
        <div class="item">
            <div class="title">打印:</div>
            <div class="data">
                <el-button size="tiny" @click="onToolHit('btn_print')">打印</el-button>                
            </div>
        </div>
        <div class="item">
            <div class="title">页数:</div>
            <div class="data">
                <el-input-number size="mini" v-model="reportOptions.pageNum"></el-input-number>
            </div>
        </div>
        <div class="item">
            <div class="title">友好名:</div>
            <div class="data">
                <el-checkbox v-model="reportOptions.friendName">显示</el-checkbox>                
            </div>
        </div>
        <div class="item">
            <div class="title">对齐:</div>
            <div class="data">
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
            </div>
        </div>
    </div>
  </template>
  
  <script>
  
  
  
  export default {
    components: {
    },
    props: {
        options:{
            type: Object
        },
    }, 
    data () {
      return {
        options_model: [{
          value: 'design',
          label: '设计'
        }, {
          value: 'write',
          label: '填写'
        }, {
          value: 'tab',
          label: 'TAB'
        }, {
          value: 'preview',
          label: '预览'
        }],
        options_scale: [{
          value: 1.25,
          label: 'A4'
        }, {
          value: 1.5,
          label: 'B5'
        }, ],
        reportOptions:this.options,
      }
    },
    watch: {
        reportOptions: {
            handler: function(newVal) {
                
                this.$emit("optionsChange", newVal);
            },
            deep:true,
            immediate: true
        }
    },    
    methods:{
  
      onDragStart(event, preset_item){
        console.log("onDragStart", preset_item);
        
        event.dataTransfer.setData("report_item",JSON.stringify(preset_item));//存储图片的src
      },
      onBtnAdd(preset_item){
        console.log('onBtnAdd==========>', preset_item)
      },
  
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  
  .components-list{
      width: 100%;
      margin-bottom: 5px;
  
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;    
  }
  
  .components-list .widget-cate {
      padding: 5px 8px;
      font-size: 13px;
      display: flex;
  }
  
  .components-list ul {
      position: relative;
      overflow: hidden;
      padding: 0 0px 0px 0;
      margin: 0;    
  
      max-height: 300px;
      overflow:auto;
  
  }
  
  
  .components-list .form-edit-widget-label {
      font-size: 13px;
      display: block;
      width: 190px;
      line-height: 24px;
      position: relative;
      float: left;
      left: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 2px;
      color: #333;
      border: 1px solid #f4f6fc;
  }
  
  
  .components-list .form-edit-widget-label>a {
      display: block;
      cursor: move;
      background: #f4f6fc;
      border: 1px solid #f4f6fc;
  }
  .components-list .form-edit-widget-label a {
      color: #333;
      display: flex;
      align-items: center;
  }
  .components-list .form-edit-widget-label span {
      height: 100%;
      width: 120px;
  }
  
  
  .components-list .form-edit-widget-label:hover a {
      color: #409eff;
  }
  
  
  .components-list .form-edit-widget-label:hover {
      color: #409eff;
      border: 1px dashed #409eff;
  }
  
  .components-list .form-edit-widget-label>a .icon {
      margin-right: 6px;
      margin-left: 8px;
      font-size: 14px;
      display: inline-block;
      vertical-align: middle;
  }
  .components-list .form-edit-widget-label .btn {
      font-size: 10px;
      display: inline-block;
      vertical-align: middle;
  }
  
  .title-bar {
      box-sizing: border-box;
      padding: 8px;
      font-weight: 400;
      font-size: 14px;
      background: #eee;
      line-height: 14px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width:100%;
  }
  

  .item {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .item .title{
    padding-left: 10px;
    width: 60px;
    font-size: 14px;
    line-height: 28px;
  } 

  .item .data {
    padding-left: 5px;
    padding-right: 5px;
    flex:1;
    background-color: #e0eeff;
    line-height: 28px;

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
  