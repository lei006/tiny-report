<template>
  <div class="tiny-paper-box">
    <div class="tiny-paper rd-f5" :style="{'width':paper.size.width + 'px','height':paper.size.height + 'px',fontSize:paper.font.size + 'px'}">
      <div class="tiny-paper-content">

          <template v-for="(item,key) in paper.items">
            <TinyImage :key="key" v-if="item.class == 'image'" v-model="paper.items[key]" />
            <TinyRect :key="key" v-if="item.class == 'rect'" v-model="paper.items[key]" :item1="msg"/>
            <TinyLabel :key="key" v-if="item.class == 'label'" v-model="paper.items[key]" />
            <TinyEllipse :key="key" v-if="item.class == 'ellipse'" v-model="paper.items[key]" />
          </template>
          <TinyLabel v-model="item_test" />

      </div>
    </div>
  </div>
</template>

<script>

import TinyImage from './TinyImage.vue'
import TinyEllipse from './TinyEllipse.vue'
import TinyRect from './TinyRect.vue'
import TinyLabel from './TinyLabel.vue'

export default {
  name: 'TinyReport',
  components:{TinyImage,TinyEllipse, TinyRect, TinyLabel},
  data () {
    return {
      paper:{
        size:{
          width:1440,
          height:400
        },
        font:{
          size:12,
        },
        model:"design", //设计，填写，预览，打印
        items:[],       //报告项列表...
      },
      item_test:{class:"label",left:120,top:30,width:100,height:200,isActive:true},
      msg: 'Welcome to Your Vue.js App',  
    }
  },
  mounted(){
    this.paper.items.push({class:"image",left:100,top:10,width:100,height:200,isActive:true});
    this.paper.items.push({class:"rect",left:110,top:20,width:100,height:200,isActive:true});
    this.paper.items.push({class:"label",left:120,top:30,width:100,height:200,isActive:true});
    this.paper.items.push({class:"ellipse",left:130,top:40,width:100,height:200,isActive:true});
  },
  methods:{
    SetSize(width, height){
      this.paper.size.width = width;
      this.paper.size.height = height;
    },
    SetModel(mod){
      this.paper.model = mod;
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

}

.tiny-paper-content {
  width: 100%;
  height: 100%;

  border:1px dashed #cccccc;

  position: relative;

}


</style>
