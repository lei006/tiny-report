<template>
  <div>
    <div>
      <el-page-header @back="goBack" content="详情页面">
        <div slot="content">
          <el-link type="primary" @click="show_item='report01'">报告01</el-link>
          <el-link type="primary" @click="show_item='design01'">设计器01</el-link>
        </div>
      </el-page-header>      
    </div>
    <hr>
    <div>
      <Report01 v-show="show_item==='report01'"></Report01>
      <Design01 v-show="show_item==='design01'"></Design01>
   </div>
    
  </div>
</template>

<script>

import Report01 from './examples/report01.vue'
import Design01 from './examples/design01.vue'

export default {
    components:{Report01, Design01},
    data(){
      return {
        initData: 'hello 你好',
        show_item:"report01",
      }
    },
    methods: {
      goBack() {
        console.log('go back');
      }
    }


}
</script>

<style>

</style>
