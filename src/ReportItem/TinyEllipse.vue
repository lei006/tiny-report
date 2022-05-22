<template>
    <report-base-item>
      <div class="ellipse"></div>
    </report-base-item>
</template>

<script>

import ReportBaseItem from './index.vue'

export default {
  name: 'TpImage',
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

.ellipse{
  width: 100%;
  height: 100%;
  margin: 0px;
  background: #FFD900;
  border-radius: 50% / 50%;
}


</style>
