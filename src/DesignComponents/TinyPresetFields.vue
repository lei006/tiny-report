<template>
  <div class="components-list tiny-report-no-select">
    <div class="title-bar">预置字段</div>
    <ul>
      <li v-for="(preset_item,key) in preset_fields" class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,preset_item)"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>{{preset_item.friend_name}}</span><div class="btn" @click="onBtnAdd(preset_item)">添加</div></a></li>
    </ul>
  </div>
</template>

<script>



export default {
  name: 'TinyComponentsList',
  components: {
  },
  props: {
      //预置字段
      preset_fields: {  
          type: Array,
          default: function() {
              return [];
          },
      },
  },  
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{

    onDragStart(event, preset_item){
      console.log("onDragStart", preset_item);
      
      event.dataTransfer.setData("report_item",JSON.stringify(preset_item));//存储图片的src
    },
    onBtnAdd(preset_item){
      console.log('onBtnAdd==========>', preset_item)
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.components-list{
    width: 100%;
    margin-bottom: 5px;

    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;    
}

.components-list .widget-cate {
    padding: 5px 8px;
    font-size: 13px;
    display: flex;
}

.components-list ul {
    position: relative;
    overflow: hidden;
    padding: 0 0px 0px 0;
    margin: 0;    

    max-height: 300px;
    overflow:auto;

}


.components-list .form-edit-widget-label {
    font-size: 13px;
    display: block;
    width: 190px;
    line-height: 24px;
    position: relative;
    float: left;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 2px;
    color: #333;
    border: 1px solid #f4f6fc;
}


.components-list .form-edit-widget-label>a {
    display: block;
    cursor: move;
    background: #f4f6fc;
    border: 1px solid #f4f6fc;
}
.components-list .form-edit-widget-label a {
    color: #333;
    display: flex;
    align-items: center;
}
.components-list .form-edit-widget-label span {
    height: 100%;
    width: 120px;
}


.components-list .form-edit-widget-label:hover a {
    color: #409eff;
}


.components-list .form-edit-widget-label:hover {
    color: #409eff;
    border: 1px dashed #409eff;
}

.components-list .form-edit-widget-label>a .icon {
    margin-right: 6px;
    margin-left: 8px;
    font-size: 14px;
    display: inline-block;
    vertical-align: middle;
}
.components-list .form-edit-widget-label .btn {
    font-size: 10px;
    display: inline-block;
    vertical-align: middle;
}

.title-bar {
    box-sizing: border-box;
    padding: 8px;
    font-weight: 400;
    font-size: 14px;
    background: #eee;
    line-height: 14px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width:100%;
}




</style>
