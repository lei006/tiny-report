<template>
  <div class="text-area-box">
    <textarea  v-if="options.isItemEnable" class="report-input-box text-area" :class="{'input-box-border':options.isShowBorder,'input-box-disable':!options.isItemEnable, 'input-box-edit-area':options.isItemEnable}" :tabindex="tabindex" :disabled="!options.isItemEnable" v-model="inputData" :placeholder="placeholder" >
    </textarea>
    <div v-if="!options.isItemEnable" class="text-area"  :class="{'input-box-border':options.isShowBorder,'input-box-disable':!options.isItemEnable, 'input-box-edit-area':options.isItemEnable}" :tabindex="tabindex" :disabled="!options.isItemEnable">
      {{inputData}}
    </div>
  </div>
</template>

<script>

export default {
name: 'TinyItemInputBox',
components:{},
model: {
  prop: "reportItemData",
  event: "eventReportItem"
},
props: {
  reportItemData: {
      type: String
  },
  options:{
    type: Object,
    default: ()=>{
      return {
        isAllowResize:false,  //允许调整大小
        isAllowDrag:true,     //允许拖动
        isItemEnable:true,    //是否有效
        isShowBackArea:true,  //显示背景
        isShowBorder:true,  //显示边框
      }
    }
  },
  tabindex:{
    type: String,
  }
},

data () {
return {
  inputData:"",
  disabled:false,
  placeholder:"",
}
}, 
watch: {
    reportItemData:{
        handler(newVal) {
          this.inputData = newVal;
        },
        deep:true,
        immediate:true,
    },
    inputData: function (newval) {
      this.$emit('eventReportItem',newval);
    }
},

methods:{


}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.report-input-box{
  box-sizing: border-box;
  border-radius: 4px;
  border: 0px solid #DCDFE6;
  width:100%;
  padding: 5px;
  -webkit-input-placeholder:#fff;
}


.report-input-box:focus {
outline: none;
border-color: #409eff;
}

.input-box-border{
border: 1px solid #DCDFE6;
}

.input-box-disable{
background-color: #409eff00;
}

.input-box-edit-area{
background-color: #f0f0f0;
}

.text-area-box{
  width:100%;
  height:100%;
}

.text-area {
      width: 100%;
      height: 100%;
      line-height: 1.5;
      vertical-align: bottom;
      transition: all 0.3s, height 0s;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-variant: tabular-nums;
      list-style: none;
      font-feature-settings: 'tnum';
      position: relative;
      display: inline-block;
      width: 100%;
      padding: 4px 5px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 1.5;
      background-image: none;
      border-radius: 4px;
      transition: all 0.3s;
      word-break: break-word;
      white-space: break-spaces;
    }


</style>
