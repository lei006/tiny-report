<template>
  <div class="tiny-paper-box">
    <div class="tiny-paper rd-f5" :style="{'width':paper.layout.size.width + 'px','height':paper.layout.size.height + 'px',fontSize:paper.layout.font.size + 'px'}">
      <div class="tiny-paper-content" ref="report" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp" @dragover="onDragOver" @drop="onDrag">

      
          <template v-for="(item,key) in paper.layout.items">
            <TinyImage :options="options"  :key="key" v-if="item.class == 'image'" v-model="paper.layout.items[key]" @mousedown="onItemMouseDown(item)" @dragging="dragging" @dragstop="dragstop" />
            <TinyRect :options="options"  :key="key" v-if="item.class == 'rect'" v-model="paper.layout.items[key]"  @mousedown="onItemMouseDown(item)"  @dragging="dragging" @dragstop="dragstop"/>
            <TinyLabel :options="options"  :key="key" v-if="item.class == 'label'" v-model="paper.layout.items[key]"  @mousedown="onItemMouseDown(item)"  @dragging="dragging" @dragstop="dragstop"/>
            <TinyEllipse :options="options"  :key="key" v-if="item.class == 'ellipse'" v-model="paper.layout.items[key]"  @mousedown="onItemMouseDown(item)"  @dragging="dragging" @dragstop="dragstop"/>
            <TinyInput :options="options"  :key="key" v-if="item.class == 'input'" v-model="paper.layout.items[key]"  @mousedown="onItemMouseDown(item)"  @dragging="dragging" @dragstop="dragstop"/>
            <TinyTextarea :options="options"  :key="key" v-if="item.class == 'textarea'" v-model="paper.layout.items[key]"  @mousedown="onItemMouseDown(item)"  @dragging="dragging" @dragstop="dragstop"/>
            <TinySelectDate :options="options"  :key="key" v-if="item.class == 'select-date'" v-model="paper.layout.items[key]"  @mousedown="onItemMouseDown(item)"  @dragging="dragging" @dragstop="dragstop"/>
            <TinySelectTime :options="options"  :key="key" v-if="item.class == 'select-time'" v-model="paper.layout.items[key]"  @mousedown="onItemMouseDown(item)"  @dragging="dragging" @dragstop="dragstop"/>
          </template>
          <div v-if="selectRect.show == true" :style="{'left': selectRect.left + 'px', 'top': selectRect.top+ 'px', 'width': selectRect.width+ 'px', 'height': selectRect.height+ 'px'}" class="tiny-paper-selected-rect"></div>
      </div>
      <TinyTop>options:{{options}} size:{{paper.layout.size}}, {{drag}},{{this.activeItem}}</TinyTop>
    </div>
  </div>
</template>

<script>

import printJS from 'print-js'
import html2canvas from "html2canvas"


import TinyImage from './ReportComponents/TinyImage.vue'
import TinyEllipse from './ReportComponents/TinyEllipse.vue'
import TinyRect from './ReportComponents/TinyRect.vue'
import TinyLabel from './ReportComponents/TinyLabel.vue'
import TinyTop from './ReportComponents/TinyTop.vue'
import TinyInput from './ReportComponents/TinyInput.vue'
import TinyTextarea from './ReportComponents/TinyTextarea.vue'
import TinySelectDate from './ReportComponents/TinySelectDate.vue'
import TinySelectTime from './ReportComponents/TinySelectTime.vue'

import Var from './TinyVariable'


const stringRandom = require('string-random');



export default {
  name: 'TinyReport',
  components:{TinyImage,TinyEllipse, TinyRect, TinyLabel, TinyTop, TinyInput, TinyTextarea, TinySelectDate, TinySelectTime},
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
      options:{
        mode:Var.TINY_REPORT__WRITE,
        isAllowResize:true, 
        isAllowDrag:true,
        isItemEnable:true,
        isShowBackArea:true,
        topItemId:"",
      },
      activeItem:null,

      // 同步拖动....
      drag:{
        sync: false,
        draggingId: null,
        prevOffsetX: 0,
        prevOffsetY: 0,
      },
      selectRect:{
        show:false,
        left:0,
        top:0,
        width:0,
        height:0,
        startX:0,
        startY:0,
      },
      default_items:[

      ],
    }
  },
  computed: {
    draggingElement: function () {
      if (! this.drag.draggingId) return;

      return this.paper.layout.items.find(el => el.id === this.drag.draggingId);
    }
  },

  mounted(){

    this.AddItemByType("image", 100, 10);
    this.AddItemByType("rect", 110, 20);
    this.AddItemByType("label", 120, 30);
    this.AddItemByType("ellipse", 130, 40);

    /*
    this.paper.layout.items.push({id: 1, class:"image",left:100,top:10,width:100,height:200,isActive:true, zindex:0, selectted:false});
    this.paper.layout.items.push({id: 2, class:"rect",left:110,top:20,width:100,height:200,isActive:true, zindex:0, selectted:false});
    this.paper.layout.items.push({id: 3, class:"label",left:120,top:30,width:180,height:290,isActive:true, zindex:0, selectted:false});
    this.paper.layout.items.push({id: 4, class:"ellipse",left:130,top:40,width:160,height:200,isActive:true, zindex:0, selectted:false});
    */

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
    window.addEventListener('mouseup', ev=>{
      this.selectRect.show = false;
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
    onItemMouseDown(item){
      this.options.topItemId = item.id;
      this.activeItem = item;
    },
    onMouseDown(ev){
      this.selectRect.show = false; //暂时屏蔽
      this.selectRect.startX = ev.offsetX;
      this.selectRect.startY = ev.offsetY;
      this.selectRect.width = 0;
      this.selectRect.height = 0;
    },
    onMouseMove(ev){
      if(this.selectRect.show == false) {
        return;
      }

      if (ev.offsetX >= this.selectRect.startX) {
        this.selectRect.left = this.selectRect.startX;
        this.selectRect.width = ev.offsetX - this.selectRect.startX;
      }else{
        this.selectRect.left = ev.offsetX;
        this.selectRect.width = this.selectRect.startX - ev.offsetX;
      }

      if(ev.offsetY >= this.selectRect.startY) {
        this.selectRect.top = this.selectRect.startY;
        this.selectRect.height = ev.offsetY - this.selectRect.startY;
      }else{
        this.selectRect.top = ev.offsetY;
        this.selectRect.height = this.selectRect.startY - ev.offsetY;
      }
    },
    onMouseUp(ev){

      // 按下与抬起相同，则取消所有选择
      if(this.selectRect.startX == ev.offsetX && this.selectRect.startY == ev.offsetY){
        this.onCancelAllSelectted();
        return ;
      }


      if(this.selectRect.show == false) {
        //this._cancel_all_selectted();
        return;
      }
      let select_item = this.selectRect;
      let report_layout_items = this.paper.layout.items;

      // 判断矩形是否相交
      function is_collide(rect1,rect2){
        var maxX,maxY,minX,minY


        maxX = rect1.left+rect1.width >= rect2.left+rect2.width ? rect1.left+rect1.width : rect2.left+rect2.width
        maxY = rect1.top+rect1.height >= rect2.top+rect2.height ? rect1.top+rect1.height : rect2.top+rect2.height
        minX = rect1.left <= rect2.left ? rect1.left : rect2.left
        minY = rect1.top <= rect2.top ? rect1.top : rect2.left

        if( ( (maxX - minX) <= (rect1.width+rect2.width) ) && ( (maxY - minY) <= (rect1.height+rect2.height) ) ){
          return true
        }else{
          return false
        }
      }

      for (let i = 0; i < this.paper.layout.items.length; i++) {
        if(is_collide(this.paper.layout.items[i], select_item) == true){
          this.paper.layout.items[i].selectted = true;
        }
      }
    },
    onDragOver(ev){
        ev.preventDefault();

      //console.log("onDragOver", ev.target)
    },
    onDrag(ev){

      var src = ev.dataTransfer.getData("tiny-report-item-type");//获取src
      ev.preventDefault();
      this.AddItemByType(src, ev.offsetX, ev.offsetY);
      console.log("ev,",ev);
    },
    
    SetSize(width, height){
      this.paper.layout.size.width = width;
      this.paper.layout.size.height = height;
    },
    SetModel(mode){
      if (mode == Var.TINY_REPORT__DESIGN) {
        this.options.isAllowResize = true;
        this.options.isAllowDrag = true;
        this.options.isShowBackArea = true;
      }

      if (mode == Var.TINY_REPORT__PREVIEW) {
        this.options.isAllowResize = false;
        this.options.isAllowDrag = true;
        this.options.isShowBackArea = false;
      }

      if (mode == Var.TINY_REPORT__WRITE) {
        this.options.isAllowResize = false;
        this.options.isAllowDrag = false;
        this.options.isShowBackArea = false;
      }

      this.mode = mode;

    },
    onCancelAllSelectted(ev){
      for (let i = 0; i < this.paper.layout.items.length; i++) {
        this.paper.layout.items[i].selectted = false;
      }
      this.activeItem = null;
    },
    AddItemByType(type_name, x, y) {

      let new_id = stringRandom();

      function create_item(name, id, left, top){
        let item = {id, class:name, left, top, width:10,height:100, zindex:0, selectted:false};
        return item;
      }



      if(type_name === "image") {
          let new_item = create_item("image", new_id, x, y);
          new_item.width = 160;
          new_item.height = 160;
          this.paper.layout.items.push(new_item);
      }
      else if(type_name === "rect") {
          this.paper.layout.items.push({id:new_id, class:"rect",left:x,top:y,width:100,height:100,isActive:true, zindex:0, selectted:false}); 
      }
      else if(type_name === "label") {
          this.paper.layout.items.push({id:new_id, class:"label",left:x,top:y,width:60,height:20,isActive:true, zindex:0, selectted:false}); 
      }
      else if(type_name === "ellipse") {
          this.paper.layout.items.push({id:new_id, class:"ellipse",left:x,top:y,width:100,height:100,isActive:true, zindex:0, selectted:false}); 
      }else if(type_name === "input") {
          this.paper.layout.items.push({id:new_id, class:"input",left:x,top:y,width:100,height:30,isActive:true, zindex:0, selectted:false, data:"" }); 
      }else if(type_name === "textarea") {
          this.paper.layout.items.push({id:new_id, class:"textarea",left:x,top:y,width:160,height:50,isActive:true, zindex:0, selectted:false, data:"" }); 
      }else if(type_name === "select-date") {
          this.paper.layout.items.push({id:new_id, class:"select-date",left:x,top:y,width:160,height:50,isActive:true, zindex:0, selectted:false, data:"" }); 
      }else if(type_name === "select-time") {
          this.paper.layout.items.push({id:new_id, class:"select-time",left:x,top:y,width:160,height:30,isActive:true, zindex:0, selectted:false, data:"" }); 
      }else{
        console.error("尝试增加一个不支持的类型", type_name);
      }

    },
    Print(){

        html2canvas(this.$refs.report, {scale: 3,allowTaint: true,taintTest: true,}).then(canvas => {
          console.log("html2canvas  canvas = ",canvas);
          let dataURL = canvas.toDataURL("image/png");
          printJS(dataURL, 'image')
        });
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

.tiny-paper-selected-rect {
  position:absolute;
  width: 0px;
  height: 0px;
  background-color: #ccfcccaa;
  z-index: 5000;
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



.el-input--tiny {
    font-size: 12px
}

.el-input--tiny .el-input__inner {
    height: 28px;
    line-height: 28px;
    padding: 0px 7px;
}

.el-input--tiny .el-input__icon {
    line-height: 28px
}


.el-date-editor.el-input,.el-date-editor.el-input__inner {
    width: 150px
}


.el-input--mini {
    font-size: 12px
}

.el-input--mini .el-input__inner {
    height: 28px;
    line-height: 28px;
    width: 150px;
}

.el-input--mini .el-input__icon {
    line-height: 28px
}


</style>
