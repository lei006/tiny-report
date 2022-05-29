<template>
  <div class="tiny-paper-box">
    <div class="tiny-paper rd-f5" :style="{'width':paper.layout.size.width + 'px','height':paper.layout.size.height + 'px',fontSize:paper.layout.font.size + 'px'}">
      <div class="tiny-paper-content" @click="onClick" @dragover="onAllowDrag">

      


          <template v-for="(item,key) in paper.layout.items">
            <TinyImage :key="key" :mode="mode" v-if="item.class == 'image'" v-model="paper.layout.items[key]" @mousedown="onMouseDown" @dragging="dragging" @dragstop="dragstop" :allowResize="item.selectted && isAllowResize" :allowDrag="item.selectted && isAllowDrag" :showBackArea="isShowBackArea" :zindex="item.zindex"/>
            <TinyRect :key="key" :mode="mode" v-if="item.class == 'rect'" v-model="paper.layout.items[key]"  @mousedown="onMouseDown"  @dragging="dragging" @dragstop="dragstop" :allowResize="item.selectted && isAllowResize" :allowDrag="item.selectted && isAllowDrag" :showBackArea="isShowBackArea" :zindex="item.zindex"/>
            <TinyLabel :key="key" :mode="mode" v-if="item.class == 'label'" v-model="paper.layout.items[key]"  @mousedown="onMouseDown"  @dragging="dragging" @dragstop="dragstop" :allowResize="item.selectted && isAllowResize" :allowDrag="item.selectted && isAllowDrag" :showBackArea="isShowBackArea" :zindex="item.zindex"/>
            <TinyEllipse :key="key" :mode="mode" v-if="item.class == 'ellipse'" v-model="paper.layout.items[key]"  @mousedown="onMouseDown"  @dragging="dragging" @dragstop="dragstop" :allowResize="item.selectted && isAllowResize" :allowDrag="item.selectted && isAllowDrag" :showBackArea="isShowBackArea" :zindex="item.zindex"/>
          </template>
      </div>
      <TinyTop>模式:{{mode}} size:{{paper.layout.size}}, {{drag}},{{this.activeItem}}</TinyTop>
    </div>
  </div>
</template>

<script>

import TinyImage from './ReportComponents/TinyImage.vue'
import TinyEllipse from './ReportComponents/TinyEllipse.vue'
import TinyRect from './ReportComponents/TinyRect.vue'
import TinyLabel from './ReportComponents/TinyLabel.vue'
import TinyTop from './ReportComponents/TinyTop.vue'

import Var from './TinyVariable'

        



export default {
  name: 'TinyReport',
  components:{TinyImage,TinyEllipse, TinyRect, TinyLabel, TinyTop},
  data () {
    return {
      paper:{
        layout:{
          size:{
            width:1440,
            height:400
          },
          font:{
            size:12,
          },
          items:[],       //报告项列表...
        },
        data:{
          items:[],       //报告数据列表...
        }
      },
      mode: Var.TINY_REPORT__WRITE,  //模式
      isAllowResize:true, 
      isAllowDrag:true,
      isShowBackArea:true,
      
      activeItem:null,

      // 同步拖动....
      drag:{
        sync: false,
        draggingId: null,
        prevOffsetX: 0,
        prevOffsetY: 0,
      },
    }
  },
  computed: {
    draggingElement: function () {
      if (! this.drag.draggingId) return;

      return this.paper.layout.items.find(el => el.id === this.drag.draggingId);
    }
  },

  mounted(){
    this.paper.layout.items.push({id: 1, class:"image",left:100,top:10,width:100,height:200,isActive:true, zindex:0, selectted:false});
    this.paper.layout.items.push({id: 2, class:"rect",left:110,top:20,width:100,height:200,isActive:true, zindex:0, selectted:false});
    this.paper.layout.items.push({id: 3, class:"label",left:120,top:30,width:180,height:290,isActive:true, zindex:0, selectted:false});
    this.paper.layout.items.push({id: 4, class:"ellipse",left:130,top:40,width:160,height:200,isActive:true, zindex:0, selectted:false});

    window.addEventListener('keydown', ev => {
      if (ev.key === "Control") {
        this.drag.sync = true;
      }
    });
    window.addEventListener('keyup', ev => {
      if (ev.key === "Control") {
        this.drag.sync = false;
      }
    });



  },
  methods:{
    dragging(id, left, top){
        this.drag.draggingId = id;
        if (! this.drag.sync) return;
        const offsetX = left - this.draggingElement.left;
        const offsetY = top - this.draggingElement.top;

        const deltaX = this.deltaX(offsetX);
        const deltaY = this.deltaY(offsetY);
        this.paper.layout.items.map(el => {
          if ( (el.selectted) && (el.id !== id) ) {
            el.left += deltaX;
            el.top += deltaY;
          }
          return el;
        });
    },
    dragstop(id, left, top){
      this.paper.layout.items.map(el => {
          if ( el.id === id) {
          el.left = left;
          el.top = top;
        }
        return el;
      });
      this.drag.draggingId = null;
      this.drag.prevOffsetX = 0;
      this.drag.prevOffsetY = 0;
    },
    deltaX(offsetX) {
      const ret = offsetX - this.drag.prevOffsetX;
      this.drag.prevOffsetX = offsetX;
      return ret;
    },
    deltaY(offsetY) {
      const ret = offsetY - this.drag.prevOffsetY;
      this.drag.prevOffsetY = offsetY;
      return ret;
    },
    // 对齐--
    align(mode){

      if(!this.activeItem) return;


      if(mode === "align_left") {
        // 找到最左的..
        let report_layout_items = this.paper.layout.items;
        let left_pos = this.activeItem.left;
        for (let i = 0; i < report_layout_items.length; i++) {
          const element = report_layout_items[i];
          if(element.selectted===true){
            report_layout_items[i].left = left_pos;
          }
        }
      }
      
      if(mode === "align_right") {
        // 找到最左的..
        let report_layout_items = this.paper.layout.items;
        let right_pos = this.activeItem.left + this.activeItem.width;
        for (let i = 0; i < report_layout_items.length; i++) {
          const element = report_layout_items[i];
          if(element.selectted===true){
            report_layout_items[i].left = right_pos - report_layout_items[i].width;
          }
        }
      }

      if(mode === "align_top") {

        let report_layout_items = this.paper.layout.items;
        let top_pos = this.activeItem.top;
        for (let i = 0; i < report_layout_items.length; i++) {
          const element = report_layout_items[i];
          if(element.selectted===true){
            report_layout_items[i].top = top_pos;
          }
        }

      }

      if(mode === "align_bottom") {
        let report_layout_items = this.paper.layout.items;
        let bottom_pos = this.activeItem.top + this.activeItem.height;

        for (let i = 0; i < report_layout_items.length; i++) {
          const element = report_layout_items[i];
          if(element.selectted===true){
            report_layout_items[i].top = bottom_pos - report_layout_items[i].height;
          }
        }
      }

      if(mode === "align_width") {

          let report_layout_items = this.paper.layout.items;

          let item_width = this.activeItem.width;
          for (let i = 0; i < report_layout_items.length; i++) {
            const element = report_layout_items[i];
            if(element.selectted===true){
              report_layout_items[i].width = item_width;
            }
          }
      }
      if(mode === "align_height") {

          let report_layout_items = this.paper.layout.items;
          let item_height = this.activeItem.height;
          for (let i = 0; i < report_layout_items.length; i++) {
            const element = report_layout_items[i];
            if(element.selectted===true){
              report_layout_items[i].height = item_height;
            }
          }
      }


    },
    onMouseDown(item){
      this.activeItem = item;
      console.log(" paper onMouseDown", item.id, item);
    },
    onAllowDrag(ev, item){
      console.log("allowDrag", ev, item);
    },
    onActivated(item){

      console.log("1111111111111111 22");
    },

    SetSize(width, height){
      this.paper.layout.size.width = width;
      this.paper.layout.size.height = height;
    },
    SetModel(mode){
      if (mode == Var.TINY_REPORT__DESIGN) {
        this.isAllowResize = true;
        this.isAllowDrag = true;
        this.isShowBackArea = true;
      }

      if (mode == Var.TINY_REPORT__PREVIEW) {
        this.isAllowResize = false;
        this.isAllowDrag = true;
        this.isShowBackArea = false;
      }

      if (mode == Var.TINY_REPORT__WRITE) {
        this.isAllowResize = false;
        this.isAllowDrag = false;
        this.isShowBackArea = false;
      }

      this.mode = mode;

    },
    onClick(){
      for (let i = 0; i < this.paper.layout.items.length; i++) {
        this.paper.layout.items[i].selectted = false;
      }
      this.activeItem = null;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tiny-paper-box {
  width: 100%;
  height: 100%;

  padding: 20px;

  background-color: #edeef3;

  overflow:scroll;
}



.rd-f5 {
    background-color: #fff;
    box-shadow: 0 3px 6px 0 rgba(0,0,0,.3);
}


.tiny-paper {
  width: 500px;
  height: 1400px;
  padding: 15px;
  margin:auto;

  position: relative;


}

.tiny-paper-content {
  width: 100%;
  height: 100%;

  border:1px dashed #cccccc;

  position: relative;

}


</style>

<style>

.tiny-report-no-select{

/* Chrome all / Safari all /opera15+*/ 
-webkit-user-select: none;   
/* Firefox all */  
-moz-user-select: none;     
/* IE 10+ */ 
-ms-user-select: none;       
/* 通用 */
user-select: none; 

}

</style>
