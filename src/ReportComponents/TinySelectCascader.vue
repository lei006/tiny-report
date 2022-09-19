<template>
    
    <el-cascader v-if="model==='write' || model=='design' || model=='tab'" size="mini" 
          v-model="inputData" 
          :disabled="!options.isItemEnable"  
          :props="defaultProps"
          clearable
          :show-all-levels="showAll"
          :options="selectOptions" 
          @change="handleChange">
    </el-cascader>
    <div v-else>{{inputData | selectDataFilter}}</div>

</template>

<script>

export default {
  name: 'TinyItemSelectCascader',
  components:{},
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
            isAllowResize:false,  //允许调整大小
            isAllowDrag:true,     //允许拖动
            isItemEnable:true,    //是否有效
            isShowBackArea:true,  //显示背景
          }
        }
      },
      model:{
        type:String
      },
      zindex:{
        type:Number,
        default:0,
      },
      preset_data:{
        type:String,
        default:"",
      },
      showAll:{
        type:Boolean,
        default:true,
      },
  },
  data () {
    return {
      inputData:"",
      defaultProps: {
          children: 'children',
          label: 'label',
          value: 'label',
          expandTrigger: 'hover'
      },
      selectOptions: [],
    }
  },

  watch:{
    preset_data:{
      handler(newVal, oldVal){

        try {
          this.selectOptions = JSON.parse(newVal);
        } catch (error) {
          this.selectOptions = [];
        }
        console.log("-->",newVal, this.selectOptions);
      },
      deep:true,
      immediate:true,
    },

    inputData:{
      handler(newVal, oldVal){
        let val_str = JSON.stringify(newVal);
        this.$emit('eventItemData', val_str);
      },
      deep:true,
      immediate:false,
    },
    itemData:{
      handler(newVal, oldVal){

        try {
          let val_array = JSON.parse(newVal);
          this.inputData = val_array;
        } catch (error) {
          this.inputData = [];
        }
      },
      deep:true,
      immediate:true,
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
    handleChange(value) {
        console.log(value);
    }

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

.el-cascader {
  width:100%;
}


</style>
