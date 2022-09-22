<template>
  <div>
    <tinyDesign/>
  </div>
</template>

<script>
import TinyReport from './tinyReport/index.vue'
import tinyDesign from './tinyDesign/index.vue'
export default {
    data(){
      return {
        initData: 'hello 你好'
      }
    },
    components:{
      TinyReport,tinyDesign
    }
}
</script>

<style>

</style>
