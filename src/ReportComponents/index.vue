<template>

    <vue-draggable-resizable ref="item" :parent="true" 
    :x='reportItem.left' 
    :y='reportItem.top' 
    :w='reportItem.width'  
    :h='reportItem.height' 
    :minw='1' 
    :minh='1' 
    :enableNativeDrag='true'
    :z="zindex"
      :draggable='options.isAllowDrag && reportItem.selectted'  :resizable='options.isAllowResize && reportItem.selectted' :preventDeactivation='true' :parentLimitation='true'
      @dragging="dragging"
      @dragstop="dragstop"
      @resizing="onResize"
      @resizestop="onResize"
      class-name="draggable-item-class"
      :on-drag-start="onDragStartCallback"
      @mouseup="onMouseUp"
    >
      <div class="tiny-report-item-class tiny-report-no-select" v-bind:class="{ 'tiny-report-item-area': options.isShowBackArea }" @click="onClick" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">
        <slot>基本组件</slot>
        <!--
        <div class="tiny-report-item-mask">{{reportItem}}==drag:{{allowDrag}}, resize:{{isAllowResize}}</div>
        -->
      </div>
    </vue-draggable-resizable>
</template>

<script>

import Var from '../TinyVariable'

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
            return {left:10,top:20,isActive:true}
          },
      },
      options:{
        type: Object,
        default: ()=>{
          return {
          isAllowResize:false, 
          isAllowDrag:true,
          isItemEnable:true,
          isShowBackArea:true,
        }}
      },
  },
  watch:{
    reportItem:{
      handler(newVal, oldVal){
        if(newVal.selectted) {
          if(newVal.id === this.options.topItemId) {
            this.zindex = 2;
          }else{
            this.zindex = 1;
          }
        }else{
          this.zindex = 0;
        }
      },
      deep:true,
      immediate:true,
    }
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      zindex:0,
    }
  },
  mounted(){

  },
  methods:{
    dragging(left, top){
      this.$emit("dragging", this.reportItem.id, left, top);
    },
    dragstop(left, top){
      this.$emit("dragstop", this.reportItem.id, left, top);
    },
    onResize(left, top, width, height){
      
      this.reportItem.left = left;
      this.reportItem.top = top;
      this.reportItem.width = width;
      this.reportItem.height = height;
      
    },
    onClick(event){
      this.reportItem.selectted = true;
    },

    onMouseDown(){
      this.reportItem.selectted = true;
      this.$emit("mousedown");
    },

    onDragStartCallback(){
      this.$refs.item.checkParentSize();
    },
    onMouseMove(){

    },
    onMouseUp(){
      //加这个是为了阻止向上传递事件..
    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.draggable-item-class {

    position: absolute;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

}



.tiny-report-item-class {
  width:100%;
  height:100%;
  position: relative;

  display: flex;
}

.tiny-report-item-area {
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


textarea {
  height: 100%;
}

</style>
