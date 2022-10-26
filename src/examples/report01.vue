<template>
    <div class="report-box">
      <div class="left">
        
        <div class="report-ev-item">
          <div class="title">模式</div>
          <div class="data">
            <el-row class="components-list">
              <el-radio-group v-model="report_model" size="mini">
                <el-radio-button v-for="(item, index) in report_models" :label="index">{{item.label}}</el-radio-button>
              </el-radio-group>
              <el-button size="small" @click="onBtnPrint">打印</el-button>
            </el-row>
            <div>{{report_model}}</div>
          </div>
        </div>

        <div class="report-ev-item">
          <div class="title">控件</div>
          <div class="data">
            <el-row class="components-list">
              <ul>
                <li v-for="(item, index) in report_items" class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,item)" @click="onClickItem(item)"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>{{item.friend_name}}</span></a></li>
              </ul>
            </el-row>
            <el-input type="textarea" size="mini" :rows="4" placeholder="请输入内容" v-model="drag_data"> </el-input>
            <el-button size="tiny">增加</el-button>
          </div>
        </div>

        <div class="report-ev-item">
          <div class="title">报告</div>
          <div class="data">
            <el-input type="textarea" size="mini" :rows="6" placeholder="请输入内容" v-model="report"> </el-input>
            <el-button size="tiny" @click="onSetReport">设置</el-button>
          </div>
        </div>


      </div>
      <div class="right">
        <YcTinyReport ref="tinyReport"
          :paperModel="report_model"
          @drag="onReportDrag"
          @reportChange="onReportChange"
          @modelChange="onReportModelChange"
          >
        </YcTinyReport>
      </div>

    </div>
  </template>
  
  <script>
  
  export default {
      data(){
        return {
          report_items:{},
          drag_data:"",
          report:"",
          report_data:"",
          report_tinydata:"",
          report_model:"",
          report_models:{},
        }
      },
      mounted(){
        this.report_items = this.$refs.tinyReport.def_items();
        this.report_models = this.$refs.tinyReport.get_models();
        console.log("tiny-report", this.report_items);
      },
      methods:{
        onClickItem(item){
          this.drag_data = JSON.stringify(item);
        },
        onReportDrag(event){
          var src = event.dataTransfer.getData("tiny-report-drag");//获取src
          this.drag_data = src;

          let tmp = JSON.parse(src);
          this.$set(tmp, "left", event.offsetX);
          this.$set(tmp, "top", event.offsetY);
          this.$refs.tinyReport.add(JSON.stringify(tmp));
        },
        onDragStart(event, item){
          event.dataTransfer.setData("tiny-report-drag",JSON.stringify(item) );//存储图片的src
        },
        onReportChange(data){
          this.report = JSON.stringify(data);
        },
        onReportModelChange(model){
          this.report_model=model;
        },
        onSetReport(){

          this.$refs.tinyReport.setLayout(this.report);
        },
        onBtnPrint(){
          this.$refs.tinyReport.Print();
        }

      }
  }
  </script>
  
  <style scoped>
  
  .report-box {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
  }


  .report-box .left{
    width: 650px;
    height:100%;
    padding: 20px;
  }

  .report-box .right{
    flex: 1;
    height:100%;
    overflow: auto;
  }



  .report-ev-item {
    width: 100%;
    margin-bottom: 10px;

    display: flex;
    flex-direction: row;
  }

  .report-ev-item .title{
    width: 90px;
  }
  .report-ev-item .data{
    flex: 1;
  }




  .components-list ul {
    position: relative;
    overflow: hidden;
    padding: 0 0px 0px 0;
    margin: 0;    
}


.components-list .form-edit-widget-label {
    font-size: 13px;
    display: block;
    width: 94px;
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




  </style>
  