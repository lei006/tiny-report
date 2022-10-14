<template>
  <div class="app-box">
    <div class="header">
      <el-page-header @back="goBack" content="详情页面">
        <div slot="content">
          <el-link type="primary" @click="show_item='null'">置空</el-link>
          <el-link type="primary" @click="show_item='report01'">报告01</el-link>
          <el-link type="primary" @click="show_item='report02'">报告02</el-link>
          <el-link type="primary" @click="show_item='report03'">报告03</el-link>
          <el-link type="primary" @click="show_item='design01'">设计器01</el-link>
        </div>
      </el-page-header>      
    </div>
    <div class="main">
      <Report01 v-if="show_item==='report01'"></Report01>
      <Report02 v-if="show_item==='report02'"></Report02>
      <Report03 v-if="show_item==='Report03'"></Report03>
      <Design01 v-if="show_item==='design01'"></Design01>
   </div>


  </div>
</template>

<script>

import Report01 from './examples/report01.vue'
import Report02 from './examples/report02.vue'
import Report03 from './examples/report03.vue'
import Design01 from './examples/design01.vue'

export default {
    components:{Report01, Report02, Report03, Design01},
    data(){
      return {
        initData: 'hello 你好',
        show_item:"null",
      }
    },
    methods: {
      goBack() {
        console.log('go back');
      }
    }


}
</script>

<style scoped>

.app-box {
  width: 100%;
  height: 100%;
  background-color: #fafafa;

  display: flex;
  flex-direction: column;
}

.app-box .main{
  flex: 1;
  background-color: #fFffff;

  overflow: hidden;
}


</style>
<style>

html body{
  width: 100vw;
  height: 100vh;
  margin: 0px;
  padding: 0px;
}

</style>