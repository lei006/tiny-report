<template>
    <div>
      222
      <YcTinyReport @activeItemChange="onEventActiveItemChange"
        @reportChange="onEventLayoutChange">
      </YcTinyReport>
    </div>
  </template>
  
  <script>
  
  export default {
      data(){
        return {
          initData: 'hello 你好'
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
  
  <style>
  
  </style>
  