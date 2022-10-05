<template>
      <input class="report-input-box" :class="{'input-box-border':options.isShowBorder,'input-box-disable':!options.isItemEnable, 'input-box-edit-area':options.isShowBackArea}" :tabindex="tabindex" :disabled="!options.isItemEnable" v-model="inputData" :placeholder="placeholder" />
</template>

<script>

export default {
  name: 'TinyItemInputBox',
  components:{},
  model: {
      prop: "itemData",
      event: "eventItemData"
  },
  props: {
      itemData: {
          type: String
      },
      model: {
          type: String
      },
      options:{
        type: Object,
        default: ()=>{
          return {
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
        itemData:{
            handler(newVal) {
              this.inputData = newVal;
            },
            deep:true,
            immediate:true,
        },
        inputData: function (newval) {
          this.$emit('eventItemData',newval);
        },
        model:{
            handler(newVal) {
				console.log("input, model, ", newVal);
              if(newVal === "design") {
                this.isItemEnable = false; 	//是否有效
                this.isShowBackArea = true; //显示背景
                this.isShowBorder = true;  	//显示边框
              } else if (newVal === "tab") {
                this.isItemEnable = false; 	//是否有效
                this.isShowBackArea = true; //显示背景
                this.isShowBorder = true;  	//显示边框
              } else if (newVal === "write") {
                this.isItemEnable = true; 	//是否有效
                this.isShowBackArea = true; //显示背景
                this.isShowBorder = true;  	//显示边框
              } else {
                this.isItemEnable = false; 	//是否有效
                this.isShowBackArea = false; //显示背景
                this.isShowBorder = false;  	//显示边框
              }
            },
            deep:true,
            immediate:true,
        },
      
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


</style>
