<template>
    <div class="report-box">
      <div class="left">
        <div class="report-ev-item">
          <div class="title">源码</div>
          <div class="data">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea"> </el-input>
          </div>
        </div>
        <div class="report-ev-item">
          <div class="title">事件</div>
          <div class="data">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea"> </el-input>
          </div>
        </div>
        <div class="report-ev-item">
          <div class="title">属性</div>
          <div class="data">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea"> </el-input>
          </div>
        </div>


      </div>
      <div class="right">
        <YcTinyReport 
            @activeItemChange="onEventActiveItemChange"
            @reportChange="onEventLayoutChange">
        </YcTinyReport>
      </div>

    </div>
  </template>
  
  <script>
  
  export default {
      data(){
        return {
          initData: 'hello 你好',
          textarea:"111111111",
      
        }
      },
      methods:{
        onEventActiveItemChange(report, item){
          console.log("onEventActiveItemChange", report, item);

        },
        onEventLayoutChange(data){
          console.log("onEventLayoutChange", data);
        },
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
    width: 450px;
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
    width: 100px;
  }
  .report-ev-item .data{
    flex: 1;
  }





  </style>
  