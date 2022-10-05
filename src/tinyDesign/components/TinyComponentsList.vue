<template>
  <div class="components-list tiny-report-no-select">
    <div class="title-bar">基础字段</div>
    <ul>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'label-text')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>标签文本</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'label-data')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>标签数据</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'input-text')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>单行文本</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'text-area')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>多行文本</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'rich-text')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>富文本</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'select-item')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>选项</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'select-cascader')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>连选</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'select-date')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>日期</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'rect')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>矩形</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'ellipse')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>椭圆</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'image')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>图片</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'qr_code')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>二维码</span></a></li>
    </ul>
  </div>
</template>

<script>

const stringRandom = require('string-random');


export default {
  name: 'TinyComponentsList',
  components: {
  },  
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{

    onDragStart(event, field_type){

      let new_id = "custom_" + stringRandom();

      let report_item = {
          id:new_id,
          class:field_type,
          friend_name:"",
          data:"",
      };

      if(field_type == "label_text") {
        report_item.data = "标签："
      }
      else if(field_type == "select-item") {
        report_item.data = "远项一,远项二"
      }

      

     event.dataTransfer.setData("report_item",JSON.stringify(report_item) );//存储图片的src
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.components-list{
    width: 220px;
    margin-bottom: 15px;
    
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
}


.components-list .form-edit-widget-label {
    font-size: 13px;
    display: block;
    width: 94px;
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
