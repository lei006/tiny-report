<template>

    <vue-draggable-resizable :parent="true" :x='reportItem.left' :y='reportItem.top' :w='reportItem.width'  :h='reportItem.height' :minw='1' :minh='1' :enableNativeDrag='true'
      :draggable='reportItem.isActive'  :resizable='reportItem.isActive' :preventDeactivation='true' :parentLimitation='true'
      @dragging="onDragging(reportItem, $event)"
      @resizing="onResizing(reportItem, $event)"
      @resizestop="onResizestop(reportItem, $event)"
      @deactivated="onDeactivated(reportItem)"
    >
      <div class="tiny-report-item-area tiny-report-no-select">
        <slot>基本组件1</slot>
        <div class="tiny-report-item-mask"></div>
      </div>
    </vue-draggable-resizable>
</template>

<script>

import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  name: 'ReportItem',
  components:{VueDraggableResizable},
  model: {
      prop: "reportItem",
      event: "eventReportItem"
  },
  props: {
      reportItem: {
          type: Object,
          default: ()=> {
            return {left:100,top:10,width:100,height:200,isActive:true}
          },
      }
  },
  watch:{
    reportItem(val) {
        console.log("watch reportItem -->", val)

    }
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    console.log("reportItem -->", this.reportItem)
  },
  methods:{
    onDragging(item, val){
      item.left = val.left
      item.top = val.top
    },
    onResizing(item,val){
      item.width = val.width
      item.height = val.height
      item.left = val.left
      item.top = val.top
    },
    onResizestop(item,val){
      item.width = val.width
      item.height = val.height
      item.left = val.left
      item.top = val.top
    },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>




.tiny-report-item-area {
  width:100%;
  height:100%;
  position: relative;

  border-style:dashed;
  border-width:1px;
}

.tiny-report-item-mask {
      width: 100%;
      height: 100%;
      position: absolute;

      top: 0;
      left: 0;
      background-color: rgba(100, 0, 0,0.05);


}



</style>
