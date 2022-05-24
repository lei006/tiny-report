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
              <TinyReport ref="reportPaper"></TinyReport>
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

import TinyComponentsList from './DesignComponents/TinyComponentsList.vue'
import TinyProperties from './DesignComponents/TinyProperties.vue'
import TinyReport from './TinyReport.vue'
import TinyDesignerTop from './DesignComponents/TinyDesignerTop.vue'


export default {
  name: 'TinyDesigner',
  components:{TinyComponentsList,TinyProperties,TinyReport, TinyDesignerTop},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    onBtnHit(btn, data){
      if (btn == "btn_paper_a4") {
          this.$refs.reportPaper.SetSize(1440,900);
      }else if (btn == "btn_paper_b5"){
          this.$refs.reportPaper.SetSize(800,600);
      }else if (btn == "btn_print"){
        console.log(btn)
      }else if (btn == "btn_design"){
          this.$refs.reportPaper.SetModel("design");
      }else if (btn == "btn_write"){
          this.$refs.reportPaper.SetModel("write");
      }else if (btn == "btn_preview"){
          this.$refs.reportPaper.SetModel("preview");
      }else{
        console.log("未处理事件", btn);
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
