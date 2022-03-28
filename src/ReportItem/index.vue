<template>
  <div class="tiny-report-item">
    <VueDragResize :x='reportItem.left' :y='reportItem.top' :w='reportItem.width'  :h='reportItem.height' :minw='1' :minh='1' :enableNativeDrag='true'
      :draggable='reportItem.isActive'  :resizable='reportItem.isActive' :preventDeactivation='true' :parentLimitation='true'
      @dragging="onDragging(reportItem, $event)"
      @resizing="onResizing(reportItem, $event)"
      @resizestop="onResizestop(reportItem, $event)"
      @deactivated="onDeactivated(reportItem)"
    >
      <div class="tiny-report-item-area">
        <slot>基本组件1</slot>
        <div class="tiny-report-item-mask"></div>
      </div>
    </VueDragResize>
  </div>
</template>

<script>

import VueDragResize from '../DragResize/index.vue';


export default {
  name: 'ReportItem',
  components:{VueDragResize},
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
      },
      model: {
          type: String,
          default: "edit",
      },
      disabled: {
          type: Boolean,
          default: false,
      },
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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
