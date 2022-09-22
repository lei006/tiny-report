<template>
  <div>
    <TinyReport :propData='initData'/>
  </div>
</template>

<script>
import TinyReport from './tinyReport/index.vue'
export default {
    data(){
      return {
        initData: 'hello 你好'
      }
    },
    components:{
      TinyReport
    }
}
</script>

<style>

</style>
