<template>
  <div class="tiny-designer">

    <el-container>
      <el-aside width="220px" style="border: 1px solid #cccccc; background-color: #fff;">
        <TinyComponentsList />
        <TinyPresetFields :preset_fields="filter_preset_fields"></TinyPresetFields>
      </el-aside>
        <el-main  style="padding:0px; overflow:hidden;">
          <el-container>
            <el-header class="top-tool-header" style="height:42px;">
              <TinyDesignerTop :model="curModel"  @onBtnHit="onBtnHit" @modelchange="onEventModelchange"/>
            </el-header>
            <el-main style="padding:0px;">
              <TinyReport v-show="showReport" :model="curModel" :friendname="friendname" ref="reportPaper" @activeItemChange="onEventActiveItemChange" @layoutChange="eventLayoutChange"></TinyReport>
            </el-main>
          </el-container>
        </el-main>
      <el-aside style="border: 1px solid #cccccc;">
        
        <TinyProperties ref="property" @propertyChange="onEventPropertyChange" />
        
      </el-aside>
    </el-container>

  </div>
</template>

<script>

import Var from './TinyVariable'

import TinyComponentsList from './DesignComponents/TinyComponentsList.vue'
import TinyPresetFields from './DesignComponents/TinyPresetFields.vue'
import TinyProperties from './DesignComponents/TinyProperties.vue'
import TinyReport from './TinyReport.vue'
import TinyDesignerTop from './DesignComponents/TinyDesignerTop.vue'


export default {
  name: 'YmTinyDesign',
  components:{TinyPresetFields,TinyComponentsList,TinyProperties,TinyReport, TinyDesignerTop},

  props: {
      //预置字段
      preset_fields: {  
          type: Array,
          default: function() {
              return [];
          },
      },
  },  
  data () {
    return {
      curModel:"design",
      reportData:{},
      showReport:false,
      report_item_id_list:[],
      friendname:true,
    }
  },
  computed: {
    filter_preset_fields: function () {
      //排除已使用过的...
      return this.preset_fields.filter(item => !this.report_item_id_list.includes(item.id))
    }
  },
  mounted(){
    this.$refs.reportPaper.SetModel("design");
  },
  methods:{
    onBtnHit(btn){

      if (btn == "btn_paper_a4") {
          this.$refs.reportPaper.SetSize(700,800);
      }else if (btn == "btn_paper_b5"){
          this.$refs.reportPaper.SetSize(600,900);
      }else if (btn == "btn_paper_tiny"){
          this.$refs.reportPaper.SetSize(200,200);
      }else if (btn == "btn_friend_name"){
          this.friendname = !this.friendname;
      }else if (btn == "btn_print"){
          this.$refs.reportPaper.Print();
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
      this.$emit("command",btn,"top_menu");
      
    },

    onEventActiveItemChange(report, item) {
      this.$refs.property.setItem(report, item);
    },
    onEventPropertyChange(item){

      this.$refs.reportPaper.updateReportItem(item);

      console.log("onEventPropertyChange", item);
    },
    open(report) {
      this.showReport = true;
    },
    close(){
      this.showReport = false;
    },
    getLayout(){
      return this.$refs.reportPaper.getLayout();
    },
    setLayout(layout_str){
        this.showReport = true;
        if( !layout_str || layout_str == "") {
          return this.$refs.reportPaper.resetLayout();
        }else{
          return this.$refs.reportPaper.setLayout(layout_str);
        }
    },
    eventLayoutChange(report){
      this.report_item_id_list = [];
      report.items.forEach(element => {
        this.report_item_id_list.push(element.id);
      });
      //console.log('eventLayoutChange', this.report_item_id_list);
    },
    onEventModelchange(model){
      this.curModel = model;
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

  box-shadow: inset 0 0 1px 1px #dadada;

  text-align:start;
  font-size: 16px;
}

.top-tool-header{
  padding: 0 3px; 
  border: 1px solid #cccccc;
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