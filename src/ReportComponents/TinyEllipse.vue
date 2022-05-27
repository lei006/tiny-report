<template>
    <report-base-item  v-model="reportItem"  @dragging="dragging" @dragstop="dragstop">
      <div class="ellipse"></div>
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

.ellipse{
  width: 100%;
  height: 100%;
  margin: 0px;
  background: #FFD900;
  border-radius: 50% / 50%;
}


</style>
