<template>
  <div class="tiny-designer">
    <el-container>
      <el-aside>
        <TinyComponentsList />
      </el-aside>
        <el-main>
          <el-container>
            <el-header style="height: 45px;">
              <TinyDesignerTop />
            </el-header>
            <el-main>
              <TinyPaper></TinyPaper>
            </el-main>
          </el-container>
        </el-main>
      <el-aside>
        <TinyProperties />
      </el-aside>
    </el-container>
  </div>
</template>

<script>

import TinyComponentsList from './TinyComponentsList.vue'
import TinyProperties from './TinyProperties.vue'
import TinyPaper from './TinyPaper.vue'
import TinyDesignerTop from './TinyDesignerTop.vue'


export default {
  name: 'TinyDesigner',
  components:{TinyComponentsList,TinyProperties,TinyPaper, TinyDesignerTop},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.tiny-designer {

  min-width: 800px;
  min-height: 100px;

  width: 100%;
  height: 100%;
  


    margin-left: 20px;
    box-shadow: inset 0 0 3px 2px #dadada;

}


</style>
