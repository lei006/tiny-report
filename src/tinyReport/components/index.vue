<template>

    <vue-draggable-resizable ref="item" :parent="true" 
    :x='left' 
    :y='top' 
    :w='width'  
    :h='height' 
    :minw='1' 
    :minh='1' 
    :enableNativeDrag='true'
    :z="zindex"
      :draggable='options.isAllowDrag && selectted'  :resizable='options.isAllowResize && selectted' :preventDeactivation='true' :parentLimitation='true'
      @dragging="dragging"
      @dragstop="dragstop"
      @resizing="onResize"
      @resizestop="onResize"
      class-name="draggable-item-class"
      :on-drag-start="onDragStartCallback"
    >
      <div class="tiny-report-item-class tiny-report-no-select" v-bind:class="{'tiny-report-drag-area':(options.isAllowDrag || options.isAllowResize) }" @click="onClick" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp"
        :style="{'background':backgroundcolor, 'fontSize':fontsize + 'px', 'color':fontcolor,'fontFamily':fontfamily, 'font-weight': fontweight}"
      >
        <slot>基本组件</slot>
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
            return {left:10,top:20,isActive:true}
          },
      },
      options:{
        type: Object,
      },
      left:{
        type:Number
      },
      top:{
        type:Number
      },
      width:{
        type:Number
      },
      height:{
        type:Number
      },
      selectted:{
        type:Boolean
      },
      backgroundcolor:{
        type:String
      },
      fontcolor:{
        type:String
      },
      fontsize:{
        type:Number
      },
      fontfamily:{
        type:String
      },
      fontweight:{
        type:String
      },
      attop:{
        type:Boolean
      },
  },
	watch:{
		reportItem:{
			handler(newVal){
				if(newVal.selectted) {
					if(this.attop === true) {
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
			zindex:0,
		}
	},
	mounted(){

	},
	methods:{
		dragging(left, top){
			this.$emit("dragging", {left, top});
		},
		dragstop(left, top){
			this.$emit("dragstop", {left, top});
		},
		onResize(left, top, width, height){
			this.$emit('resize', {left, top, width, height})
		},
		onClick(){
			this.$emit('eventReportItem', {selectted:true})
		},

		onMouseDown(ev){
			this.$emit('eventReportItem', {selectted:true})
			this.$emit("mousedown", ev);
		},

		onDragStartCallback(){
			this.$refs.item.checkParentSize();
		},
		onMouseMove(){

		},
		onMouseUp(ev){
			//加这个是为了阻止向上传递事件..
			this.$emit("mouseup", ev);
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

.report-item-backarea {
  background-color: #ccc;
}


.tiny-report-drag-area {
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
