<template>
      <div class="tiny-report-rect" :style="{'border-radius': radius + 'px', 'background-color':color}"></div>
</template>

<script>

export default {
  name: 'TinyReportRect',
  components:{},
  model: {
      prop: "reportItem",
      event: "eventReportItem"
  },
  props: {
      radius:{
          type: Number,
          default:()=>{
            return 0;
          }
      },
      color:{
          type: String,
      },
      reportItem: {
          type: Object
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
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tiny-report-rect{
  width: 100%;
  height: 100%;
  margin: 0px;
  background: #FFD900;
}


</style>
