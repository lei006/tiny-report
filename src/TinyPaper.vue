<template>
  <div class="tiny-paper-box">
    <div class="tiny-paper rd-f5" :style="{'width':paper.size.width + 'px','height':paper.size.height + 'px',fontSize:paper.font.size + 'px'}">
      <div class="tiny-paper-content">
        ReportPaper组件1

          <VueDragResize :isActive="true" :x='60' :y='60' :w='250'  :h='250' :parentLimitation='true' v-on:resizing="resize" v-on:dragging="resize">
              <h3>Hello World!</h3>
              <p>{{ top }} х {{ left }} </p>
              <p>{{ width }} х {{ height }}</p>
          </VueDragResize>


      </div>
    </div>
  </div>
</template>

<script>

import VueDragResize from 'vue-drag-resize'


export default {
  name: 'TinyPaper',
  components:{VueDragResize},
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
      },
      msg: 'Welcome to Your Vue.js App',
      width: 0,
      height: 0,
      top: 0,
      left: 0      
    }
  },
  methods:{
    SetSize(width, height){
      this.paper.size.width = width;
      this.paper.size.height = height;
    },
    SetModel(mod){
      this.paper.model = mod;
    },
    resize(){

    }

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
