<template>
      <img class="tiny-qrcode tiny-report-no-select" draggable="false" :src="imgData" ref="qrCodeUrl" />
</template>

<script>
import QRCode from 'qrcode'


export default {
  name: 'item-qrcode',
  components:{},
  model: {
      prop: "reportItem",
      event: "eventReportItem"
  },
  props: {
      reportItem: {
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
        type: String,
        default:()=>{
          return "#aaa"
        }
      }
  },
  watch:{
    reportItem:{
      handler(newVal) {
        this.qr_data = newVal;
        this.createQrUrl();
      },
      deep:true,
      immediate:true,
    }
  },
  data () {
    return {
      imgData:"",
      qr_data:"",
    }
  },
  methods:{

    createQrUrl() {
        let _self = this;
        let data = this.qr_data;
        if(data === undefined || data === null || data === "") {
            data = "test data"
        }

        if(this.qr_timer) {
            clearTimeout(this.qr_timer);
        }

        this.qr_timer = setTimeout(() => {


          let width = this.$refs.qrCodeUrl.offsetWidth;
          let height = this.$refs.qrCodeUrl.offsetHeight;
          console.log("qr", width, height);
            QRCode.toDataURL(data, {
                                    width, 
                                    height, 
                                    margin:1, 
                                    errorCorrectionLevel: 'H' 
                                  }, function (err, url) {
              _self.imgData = url;
            })
        }, 300);
    }


  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tiny-qrcode {
  width:100%;
  height:100%;
  object-fit:contain;
}


</style>
