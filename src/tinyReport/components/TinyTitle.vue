<template>
      <div class="tiny-report-label"><slot>Title</slot></div>
</template>

<script>

export default {
  name: 'TinyReportTitle',
  components:{},
  model: {
      prop: "reportItem",
      event: "eventReportItem"
  },
  props: {
      reportItem: {
          type: Object
      },
      mode:{
        type:String
      },
      options:{
        type: Object,
        default: ()=>{
          return {
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
