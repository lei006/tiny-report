<template>
    <div class="tiny-designer">
  
        <div class="tool-side">
			<TinyReportOption :options="options" @optionsChange="onChangeOptions"></TinyReportOption>
            <TinyComponentsList />
            <TinyPresetFields :preset_fields="filter_preset_fields"></TinyPresetFields>
        </div>
        <div class="main">
            <div class="layout-main-col">
                <div class="main">
                    <TinyReport v-model="reportData"  ref="reportPaper"
						:options="options"
						@activeItemChange="onEventActiveItemChange"
						@layoutChange="onEventLayoutChange"></TinyReport>
                </div>
            </div>
        </div>
        <div v-if="true" class="properties-box" style="">
            <TinyProperties ref="property" @propertyChange="onEventPropertyChange" />          
        </div>

    </div>
  </template>
  
  <script>
    
  import TinyComponentsList from './components/TinyComponentsList.vue'
  import TinyPresetFields from './components/TinyPresetFields.vue'
  import TinyReportOption from './components/TinyReportOption.vue'
  import TinyProperties from './components/TinyProperties.vue'
  import TinyReport from '../tinyReport/index.vue'
  import TinyDesignerTop from './components/TinyDesignerTop.vue'
  
  
  export default {
    name: 'YcTinyDesign',
    components:{TinyReportOption, TinyPresetFields,TinyComponentsList,TinyProperties,TinyReport, TinyDesignerTop},
  
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
		curPageNum:1,
		options:{
			pageNum:1,
			pageRatio:1.25,
			friendName:false,
			model:"design",
		}
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
  
        //console.log("onEventPropertyChange", item);
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
      onEventLayoutChange(report){
        this.report_item_id_list = [];
        report.items.forEach(element => {
          this.report_item_id_list.push(element.id);
        });
        //console.log('eventLayoutChange', this.report_item_id_list);
      },
	  onChangeOptions(options){
        console.log('onChangeOptions', options);

	  },
      onEventModelchange(model){
        this.curModel = model;
      },
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
    
    border:1px solid #888;
  
    box-shadow: inset 0 0 1px 1px #dadada;
  
    text-align:start;
    font-size: 16px;

    display: flex;
    flex-direction: row;


  }

	.tiny-designer .main{
		padding:0px; 
		flex:1; 
		overflow: auto;
	}


	.tool-side {
		width: 250px;
		border: 1px solid #cccccc; 
		background-color: #fff;
		overflow: auto;
	}


	.layout-main-col{
		display: flex;
		flex-direction: column;
	}

	.layout-main-col .top{
		height:42px;
	}


	.layout-main-col .main{
		flex:1;	
	}

    .properties-box {
		border: 1px solid #cccccc; 
		width:250px;
		overflow: auto;
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
      padding: 2px 4px;
      font-size: 10px;
      border-radius: 0
  }
  
  .el-radio-button--tiny .el-radio-button__inner.is-round {
      padding: 3px 7px
  }
  
  
  </style>