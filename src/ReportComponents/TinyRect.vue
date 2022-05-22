<template>
    <report-base-item>
      <div class="tiny-report-rect"></div>
    </report-base-item>
</template>

<script>

import ReportBaseItem from './index.vue'

export default {
  name: 'TinyReportRect',
  components:{ReportBaseItem},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
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
