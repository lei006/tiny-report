<template>
  <div class="tiny-paper-box">
    <div class="tiny-paper rd-f5" :style="{'width':paper.layout.size.width + 'px','height':paper.layout.size.height + 'px',fontSize:paper.layout.font.size + 'px'}">
      <div class="tiny-paper-content" @click="onClick">

          <template v-for="(item,key) in paper.layout.items">
            <TinyImage :key="key" v-if="item.class == 'image'" v-model="paper.layout.items[key]" @dragging="dragging" @dragstop="dragstop"/>
            <TinyRect :key="key" v-if="item.class == 'rect'" v-model="paper.layout.items[key]"  @dragging="dragging" @dragstop="dragstop"/>
            <TinyLabel :key="key" v-if="item.class == 'label'" v-model="paper.layout.items[key]"  @dragging="dragging" @dragstop="dragstop"/>
            <TinyEllipse :key="key" v-if="item.class == 'ellipse'" v-model="paper.layout.items[key]"  @dragging="dragging" @dragstop="dragstop"/>
          </template>
      </div>
      <TinyTop>模式:{{paper.model}} size:{{paper.layout.size}}, {{drag}}</TinyTop>
    </div>
  </div>
</template>

<script>

import TinyImage from './ReportComponents/TinyImage.vue'
import TinyEllipse from './ReportComponents/TinyEllipse.vue'
import TinyRect from './ReportComponents/TinyRect.vue'
import TinyLabel from './ReportComponents/TinyLabel.vue'
import TinyTop from './ReportComponents/TinyTop.vue'

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
        model:"design", //设计，填写，预览，打印 ---design,write,print,preview
        data:{
          items:[],       //报告数据列表...
        }
      },
      item_test:{class:"label",left:120,top:30,width:100,height:200,isActive:true},
      msg: 'Welcome to Your Vue.js App',
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
    this.paper.layout.items.push({id: 1, class:"image",left:100,top:10,width:100,height:200,isActive:true});
    this.paper.layout.items.push({id: 2, class:"rect",left:110,top:20,width:100,height:200,isActive:true});
    this.paper.layout.items.push({id: 3, class:"label",left:120,top:30,width:180,height:290,isActive:true});
    this.paper.layout.items.push({id: 4, class:"ellipse",left:130,top:40,width:160,height:200,isActive:true});


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

        console.log("dragging", id, left, top);

        const deltaX = this.deltaX(offsetX);
        const deltaY = this.deltaY(offsetY);
        this.paper.layout.items.map(el => {
          if ( (el.isActive) && (el.id !== id) ) {
            el.left += deltaX;
            el.top += deltaY;
          }
          return el;
        });
    },
    dragstop(id, left, top){
      console.log("dragstop", id, left, top);
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


    SetSize(width, height){
      this.paper.layout.size.width = width;
      this.paper.layout.size.height = height;
    },
    SetModel(mod){
      this.paper.model = mod;
    },
    onClick(){
      for (let i = 0; i < this.paper.layout.items.length; i++) {
        this.paper.layout.items[i].isActive = false;
      }
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
