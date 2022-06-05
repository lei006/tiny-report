<template>
    <report-base-item  v-model="reportItem"  
        @dragging="dragging" 
        @dragstop="dragstop"
        @mousedown="onMouseDown"
        :options="options"
      >
      <div class="tiny-qrcode tiny-report-no-select" draggable="false" ref="qrCodeUrl"></div>
    </report-base-item>
</template>

<script>
import QRCode from 'qrcodejs2'

import ReportBaseItem from './index.vue'


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
            this.creatQrCode(newVal.data, newVal.width - 2, newVal.height - 2);          
            this.qr_data = newVal.data;
            this.old_width = newVal.width;
            this.old_height = newVal.height;
            this.qr_timer = null;
          }
        }, 100);
        //this.url = code;
      },
      deep:true,
      immediate:true,
    }
  },
  data () {
    return {
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
    creatQrCode(data, width, height) {
        this.$refs.qrCodeUrl.innerHTML="";
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: data, // 需要转换为二维码的内容
            width: width,
            height: height,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
        console.log("creatQrCode", qrcode)
        return qrcode;
    },
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tiny-qrcode {

}


</style>
