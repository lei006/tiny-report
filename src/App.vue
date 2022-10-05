<template>
  <div>
    <div>
      {{show_item}}
      <a @click="show_item='demo01'">test1</a>
      <a @click="show_item='demo02'">test2</a>
    </div>
    <div>
      <Demo01 v-show="show_item==='demo01'"></Demo01>
      <Demo02 v-show="show_item==='demo02'"></Demo02>
   </div>
    
  </div>
</template>

<script>

import Demo01 from './components/demo01.vue'
import Demo02 from './components/demo02.vue'

export default {
    components:{Demo01, Demo02},
    data(){
      return {
        initData: 'hello 你好',
        show_item:"demo01",
      }
    },
}
</script>

<style>

</style>
