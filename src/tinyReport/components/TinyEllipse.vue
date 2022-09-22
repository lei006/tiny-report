<template>
      <div class="ellipse" :style="{'background-color':color}"></div>
</template>

<script>


export default {
  name: 'TpImage',
  components:{},
  model: {
      prop: "reportItem",
      event: "eventReportItem"
  },
  props: {
      reportItem: {
          type: Object
      },
      color:{
          type: String,
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

.ellipse{
  width: 100%;
  height: 100%;
  margin: 0px;
  background: #FFD900;
  border-radius: 50% / 50%;
}


</style>
