<template>
    <report-base-item v-model="reportItem"  
        @dragging="dragging" 
        @dragstop="dragstop"
        @mousedown="onMouseDown"
        :options="options"
      >
      <el-input size="tiny" type="textarea" autosize v-model="reportItem.data" placeholder="请输入内容"></el-input>
    </report-base-item>
</template>

<script>

import ReportBaseItem from './index.vue'

export default {
  name: 'TinyItemInputBox',
  components:{ReportBaseItem},
  model: {
      prop: "reportItem",
      event: "eventReportItem"
  },
  props: {
      reportItem: {
          type: Object
      },
      options:{
        type: Object,
        default: ()=>{
          return {
            mode:"",
            isAllowResize:false,  //允许调整大小
            isAllowDrag:true,     //允许拖动
            isItemEnable:true,    //是否有效
            isShowBackArea:true,  //显示背景
          }
        }
      },
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      input:"aaaaaaa",
    }
  },
  methods:{
    dragging(id, left, top){
      this.$emit("dragging", id, left, top);
    },
    dragstop(id, left, top){
      this.$emit("dragstop", id, left, top);
    }, 
    onMouseDown(){
      this.$emit("mousedown", this.reportItem);
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tiny-report-label{
  width: 100%;
  height: 100%;
  margin: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
