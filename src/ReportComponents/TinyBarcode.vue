<template>
      <img :id="id" class="tiny-barcode tiny-report-no-select" draggable="false" ref="barcode"/>
</template>

<script>
import JsBarcode  from 'jsbarcode';

const stringRandom = require('string-random');

export default {
  name: 'item-qrcode',
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
      color:{
        type:String,
        default:()=>{
          return "#555"
        }
      },
      linewidth:{
        type:Number,
        default:()=>{
          return 2;
        }
      }
  },
  watch:{
    itemData:{
      handler(newVal) {

        if(!newVal){
          newVal="testbar"
        }
        this.barcode_data = newVal;
        this.creatBarCode();
      },
      deep:true,
      immediate:true,
    },
    color(){
      this.creatBarCode();
    },
    linewidth(){
      this.creatBarCode();
    },
  },

  data () {
    return {
      id:stringRandom(),
      barcode_data:"",
    }
  },
  methods:{

    creatBarCode() {

      let barcode_data = this.barcode_data;
      let linewidth = this.linewidth;
      let linecolor = this.color

      clearTimeout(this.bar_timer);

      this.bar_timer = setTimeout(() => {

        let height = this.$refs.barcode.offsetHeight

        JsBarcode("#" + this.id, barcode_data, {
          format: "CODE128",  //条形码的格式
          lineColor: linecolor,  //线条颜色
          width:linewidth, //线宽
          height:height,  //条码高度
          displayValue: true //是否显示文字信息
        })

      },800);
    },

    resize(){
      this.creatBarCode();
    },

  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tiny-barcode {
  width:100%;
  height: 100%;
  object-fit: contain;
}


</style>
