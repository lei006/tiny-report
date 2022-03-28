<template>
  <div class="tiny-designer">
    <el-container>
      <el-aside>
        <TinyComponentsList />
      </el-aside>
        <el-main>
          <el-container>
            <el-header style="height: 45px;">
              <TinyDesignerTop @onBtnHit="onBtnHit"/>
            </el-header>
            <el-main>
              <TinyPaper ref="reportPaper"></TinyPaper>
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
import TinyImage from './TinyImage.vue'


export default {
  name: 'TinyDesigner',
  components:{TinyComponentsList,TinyProperties,TinyPaper, TinyDesignerTop,TinyImage},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    onBtnHit(btn, data){
      if (btn == "onReportSize") {

        if (data == "A4") {
          this.$refs.reportPaper.SetSize(1440,900);
        } else if (data == "B5") {
          this.$refs.reportPaper.SetSize(800,600);
        }

      }else if (btn == "onReportModel"){

      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>







.el-header {
    padding: 0 0px;
}


.tiny-designer {

  min-width: 800px;
  min-height: 100px;

  width: 100%;
  height: 100%;
  

  border:1px solid #fc0c0c;

    margin-left: 20px;
    box-shadow: inset 0 0 3px 2px #dadada;

}

.el-container {
  height: 100%;
}


</style>
