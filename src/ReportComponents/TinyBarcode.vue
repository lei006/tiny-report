<template>
    <report-base-item  v-model="reportItem"  
        @dragging="dragging" 
        @dragstop="dragstop"
        @mousedown="onMouseDown"
        :options="options"
      >
      <img :id="id" class="tiny-qrcode tiny-report-no-select" draggable="false" ref="qrCodeUrl" v-resize="onResize"/>
    </report-base-item>
</template>

<script>
import JsBarcode  from 'jsbarcode';

import ReportBaseItem from './index.vue'


const stringRandom = require('string-random');

export default {
  name: 'item-qrcode',
  components:{ReportBaseItem},
  model: {
      prop: "reportItem",
      event: "eventReportItem"
  },
  props: {
      reportItem: {
          type: Object
      },
      options:{
        type: Object,
        default: ()=>{
          return {
            mode:"",
            isAllowResize:false,  //允许调整大小
            isAllowDrag:true,     //允许拖动
            isItemEnable:true,    //是否有效
            isShowBackArea:true,  //显示背景
          }
        }
      },       
  },
  watch:{
    reportItem:{
      handler(newVal) {

        if(this.qr_timer) {
          clearTimeout(this.qr_timer);
        }

        this.qr_timer = setTimeout(() => {
          if( (this.qr_data !== newVal.data) || (this.old_width !== newVal.width) || (this.old_height !== newVal.height) ) {
            this.creatCode(newVal.data, 2, newVal.height - 2);          
            this.qr_data = newVal.data;
            this.old_width = newVal.width;
            this.old_height = newVal.height;
            this.qr_timer = null;
            let img_dcm = document.getElementById(this.id);
            console.log("img",img_dcm.offsetWidth,img_dcm.offsetHeight, newVal);
            //this.reportItem.width = img_dcm.offsetWidth;
            //this.reportItem.height = img_dcm.offsetHeight + 2;

          }
        }, 300);
        //this.url = code;
      },
      deep:true,
      immediate:true,
    }
  },
  data () {
    return {
      id:stringRandom(),
      msg: 'Welcome to Your Vue.js App',
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      fit:"contain",
      url: "",
      qr_data:"",
      old_width:0,
      old_height:0,
      qr_timer:null,
    }
  },
  methods:{
    dragging(id, left, top){
      this.$emit("dragging", id, left, top);
    },
    dragstop(id, left, top){
      this.$emit("dragstop", id, left, top);
    },
    onMouseDown(){
      this.$emit("mousedown", this.reportItem);
    },
    creatCode(data, width, height) {


        JsBarcode("#" + this.id, data, {
          format: "CODE128",  //条形码的格式
          lineColor: "#0aa",  //线条颜色
          width, //线宽
          height:height,  //条码高度
          displayValue: true //是否显示文字信息
        })

        /*
        this.$refs.qrCodeUrl.innerHTML="";
        var qrcode = JsBarcode(this.$refs.qrCodeUrl, {
            text: "1111111111111111111", // 需要转换为二维码的内容
            width: width,
            height: height,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
        console.log("creatQrCode", qrcode)
        return qrcode;
        */
    },
    onResize(data){
      console.log("onResize--->", data)
    },
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tiny-qrcode {

}


</style>
