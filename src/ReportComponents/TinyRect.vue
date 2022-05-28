<template>
    <report-base-item v-model="reportItem" 
        @dragging="dragging" 
        @dragstop="dragstop"
        :allowResize="allowResize"
        :allowDrag="allowDrag"
        :showBackArea="showBackArea"
        :zindex="zindex"
        
      >
      <div class="tiny-report-rect"></div>mode:{{mode}}
    </report-base-item>
</template>

<script>

import ReportBaseItem from './index.vue'

export default {
  name: 'TinyReportRect',
  components:{ReportBaseItem},
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
      //允许选中
      allowResize:{
        type:Boolean,
        default:false,
      },
      allowDrag:{
        type:Boolean,
        default:true,
      },
      //显示背景区域
      showBackArea:{
        type:Boolean,
        default:true,
      },
      zindex:{
        type:Number,
        default:0,
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
