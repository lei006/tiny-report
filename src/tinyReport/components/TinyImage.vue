<template>
  <div style="width: 100%; height: 100%"  @dragover="onDragOver" @drop="onDrag" class="image-box-area">
      <el-image style="width: 100%; height: 100%; border-radius:6px;"  :src="imageData" :fit="fit">
        <div slot="error" class="image-slot"></div>
      </el-image>
  </div>      
</template>

<script>

export default {
  name: 'TpImage',
  components:{},
  model: {
      prop: "itemData",
      event: "eventItemData"
  },
  props: {
      itemData: {
          type: String
      },
      fit: {
          type: String,
          default:()=>{
            return "contain";
          }
      },
      mode:{
        type:String
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
  },   
  data () {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      imageData:"",
    }
  },
  watch: {
    itemData:{
          handler(newVal) {
            this.imageData = newVal;
          },
          deep:true,
          immediate:true,
    },
    imageData:{
          handler(newVal) {
            this.$emit('eventItemData',newVal);
          },
          deep:true,
          immediate:false,
    },
    
  },



  methods:{
    onDragOver(ev){
      ev.preventDefault();
    },
    onDrag(ev){
      ev.preventDefault();
      var src = ev.dataTransfer.getData("report_image");//获取src
      if(src === undefined || src === "") {
        return;
      }
      let new_item = JSON.parse(src)
      this.imageData = new_item.thumbnail;
    }
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.image-slot{
  font-size: 24px;
  color: #888;
}

.image-box-area{
  background-color: rgb(248, 240, 232);
  border-radius: 3px;
}


</style>
