<template>
  <div class="tiny-designer">
    <el-container>
      <el-aside width="200px">
        <TinyComponentsList />
      </el-aside>
        <el-main>
          <el-container>
            <el-header style="height: 32px; padding: 0 3px;">
              <TinyDesignerTop @onBtnHit="onBtnHit"/>
            </el-header>
            <el-main>
              <TinyReport ref="reportPaper" @selectchange="onSelectChange"></TinyReport>
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
      reportData:{},
    }
  },
  methods:{
    onBtnHit(btn, data){
      if (btn == "btn_paper_a4") {
          this.$refs.reportPaper.SetSize(700,800);
      }else if (btn == "btn_paper_b5"){
          this.$refs.reportPaper.SetSize(600,900);
      }else if (btn == "btn_paper_tiny"){
          this.$refs.reportPaper.SetSize(200,200);
      }else if (btn == "btn_print"){
          this.$refs.reportPaper.Print();
      }else if (btn == "btn_design"){
          this.$refs.reportPaper.SetModel("design");
      }else if (btn == "btn_write"){
          this.$refs.reportPaper.SetModel("write");
      }else if (btn == "btn_preview"){
          this.$refs.reportPaper.SetModel("preview");
      }else if (btn == "align_left"){
          this.$refs.reportPaper.align(btn);
      }else if (btn == "align_right"){
          this.$refs.reportPaper.align(btn);
      }else if (btn == "align_top"){
          this.$refs.reportPaper.align(btn);
      }else if (btn == "align_bottom"){
          this.$refs.reportPaper.align(btn);
      }else if (btn == "align_width"){
          this.$refs.reportPaper.align(btn);
      }else if (btn == "align_height"){
          this.$refs.reportPaper.align(btn);
      }else if (btn == "btn_test"){
          this.$refs.reportPaper.Test();
      }else{
        console.log("未处理事件", btn);
      }

    },
    onSelectChange(items) {
      console.log("onSelectChange", items);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.el-container {
  height: 100%;
}


.tiny-designer {

  min-width: 800px;
  min-height: 100px;

  width: 100%;
  height: 100%;
  

  border:1px solid #888;

  margin-left: 2px;
  box-shadow: inset 0 0 1px 1px #dadada;

}


</style>


<style>

.el-button--tiny,.el-button--tiny.is-round {
    padding: 3px 7px;
    font-size: 12px;
    margin-right: 3px;
}

.el-button--tiny.is-circle {
    padding: 3px
}


.el-radio-button--tiny .el-radio-button__inner {
    padding: 3px 7px;
    font-size: 12px;
    border-radius: 0
}

.el-radio-button--tiny .el-radio-button__inner.is-round {
    padding: 3px 7px
}


</style>