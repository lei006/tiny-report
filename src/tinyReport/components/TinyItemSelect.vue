<template>

  <div class="report-item-box">
    <el-select v-if="options.isItemEnable" size="mini" :multiple="multiple" :tabindex="tabindex" class="report-item-select"  :class="{'select-disable':!options.isItemEnable}" v-model="inputData" :disabled="!options.isItemEnable" >
        <el-option v-for="item in selectItems" :key="item" :value="item">
            {{item}}
        </el-option>
    </el-select>

    <div v-if="!options.isItemEnable" class="report-item-select-text" :class="{'select-disable':!options.isItemEnable}" >{{inputData | selectDataFilter}}</div>
  </div>

</template>

<script>

export default {
  name: 'tinyItemSelect',
  model: {
      prop: "itemData",
      event: "eventItemData"
  },
  props: {
      itemData: {
          type: String
      },

      options:{
        type: Object,
        default: ()=>{
          return {
            isShowBorder:false,
            isItemEnable:true,    //是否有效
            isShowBackArea:true,  //显示背景
          }
        }
      },
      tabindex:{
        type: String,
      },
      preset_data:{
        type:String,
        default:"",
      },
      multiple:{
        type: Boolean,
        default:false,
      }
  },
  data () {
    return {
      inputData:"",
      selectItems:["男","女"],
    }
  },
  watch: {
        preset_data:{
            handler(newVal) {
              try {
                this.selectItems = newVal.split(",");
              } catch (error) {
                console.error("select one error:", error);
                this.selectItems = [];
              }

            },
            deep:true,
            immediate:true,
        },
        itemData:{
          handler(newVal) {
            console.log("111111111111", newVal);
              
              if(this.multiple == true) {
                
                try {
                  let array = JSON.parse(newVal);
                  this.inputData = array;                  
                } catch (error) {
                  console.warn(error);
                  this.inputData = [];
                }
                
              }else{
                this.inputData = newVal;
              }
              
            },
            deep:true,
            immediate:true,
        },

        inputData:{
          handler(newVal) {
            //console.log("inputData--->", newVal);
            if(this.multiple == true){
              let data_str = JSON.stringify(newVal);
              this.$emit('eventItemData',data_str);
            }else{
              this.$emit('eventItemData',newVal);
            }
          },
          deep:true,
          immediate:false,
        },
  },

  filters: {
    selectDataFilter(data) {
      if (data.constructor == Array) {
        return data.join(",")
      }
      return data;
    },

  },
  methods:{


  }

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

.report-item-box {
  width: 100%;
  height: 100%;
}

.report-item-box select{
  padding: 0 10px;

  width: 100%;
  height: 100%;  
}


.report-item-select{
  width:100%;

  border: 0px solid #DCDFE6;
}

.report-item-select-text{
  padding: 0 15px;

  width: 100%;
  height: 100%;  
  
  display: flex;
  align-items: center;  
}


.select-disable{
  background-color: #409eff00;
}



</style>
