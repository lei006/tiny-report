<template>
    <report-base-item  v-model="reportItem"  
        @dragging="dragging" 
        @dragstop="dragstop"
        :allowResize="allowResize"
        :allowDrag="allowDrag"
        :showBackArea="showBackArea"
        :zindex="zindex"
      >
      <el-image style="width: 100%; height: 100%" :src="url" :fit="fit"></el-image>mode:{{mode}}
    </report-base-item>
</template>

<script>

import ReportBaseItem from './index.vue'

export default {
  name: 'TpImage',
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
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      fit:"contain",
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'      
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

</style>
