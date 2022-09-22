<template>
      <el-date-picker v-if="model==='write' || model=='design' || model=='tab'" size="mini" :disabled="model!=='write'" :format="format" :value-format="format" v-model="inputData" type="date" placeholder="选择日期"></el-date-picker>
      <div v-else-if="model==='preview'" size="mini">{{inputData}}</div>
</template>

<script>

import dateFormat, { masks } from "dateformat";

export default {
  name: 'TinySelectDate',
  components:{},
  model: {
      prop: "itemData",
      event: "eventItemData"
  },
  props: {
      itemData: {
          type: String
      },
      model:{
        type:String
      },      
      zindex:{
        type:Number,
        default:0,
      },
      format:{
        type:String,
        default:"yyyy年MM月dd日"
      },
      def_now:{
        type:Boolean,
        default:false,
      },
  },
  data () {
    return {
      inputData:"",
      isItemEnable:false,
    }
  },
  watch:{
    inputData:{
      handler(newVal, oldVal){
        this.$emit("eventItemData", newVal);
      },
      deep:true,
      immediate:false,
    },
    itemData:{
      handler(newVal, oldVal){
        this.inputData = newVal;
      },
      deep:true,
      immediate:true,
    },
    
  },
  mounted(){
    if(this.def_now === true) {
      //this.inputData = formatDate(new Date(), this.format);
      //console.log("this.inputData=", this.inputData)
    }
  },
  methods:{
    
  }

}




function formatDate(date, format) {
	if (!date) return;
	if (!format)
		format = "yyyy-MM-dd";
	switch (typeof date) {
	case "string":
		date = new Date(date.replace(/-/, "/"));
		break;
	case "number":
		date = new Date(date);
		break;
	}
	if (!date instanceof Date) return;
	var dict = {
		"yyyy" : date.getFullYear(),
		"M" : date.getMonth() + 1,
		"d" : date.getDate(),
		"H" : date.getHours(),
		"m" : date.getMinutes(),
		"s" : date.getSeconds(),
		"MM" : ("" + (date.getMonth() + 101)).substr(1),
		"dd" : ("" + (date.getDate() + 100)).substr(1),
		"HH" : ("" + (date.getHours() + 100)).substr(1),
		"mm" : ("" + (date.getMinutes() + 100)).substr(1),
		"ss" : ("" + (date.getSeconds() + 100)).substr(1)
	};
	return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
		return dict[arguments[0]];
	});
}





</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tiny-report-label{
  width: 100%;
  height: 100%;
  margin: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
