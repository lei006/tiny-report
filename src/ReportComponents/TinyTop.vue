<template>
      <div class="tiny-report-item-top-label">
        <slot>标签</slot>
      </div>
</template>

<script>

import ReportBaseItem from './index.vue'

export default {
  name: 'TinyReportLabel',
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

.tiny-report-item-top-label {

  position: absolute;
  border-style:dashed;
  border-width:0px;
  top:2px;
  left:2px;
  color: #00f8;
}



</style>
