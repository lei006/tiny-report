<template>
  <div class="components-list tiny-report-no-select">
    <div class="widget-cate">基础字段</div>
    <ul>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'label')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>标签</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'title')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>标题</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'input')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>单行</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'textarea')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>多行</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'rich-text')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>富文本</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'select-one')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>单选</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'select-many')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>多选</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'select-cascader')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>连选</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'select-time')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>时间</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'select-date')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>日期</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'select-datetime')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>日期时间</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'rect')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>矩形</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'ellipse')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>椭圆</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'image')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>图片</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'qr_code')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>条形码</span></a></li>
      <li class="form-edit-widget-label" draggable="true" @dragstart="onDragStart($event,'qr_code')"><a><i class="icon iconfont icon-tiny-reportriqi3"></i><span>二维码</span></a></li>
    </ul>
  </div>
</template>

<script>

import draggable from "vuedraggable";


export default {
  name: 'TinyComponentsList',
  components: {
    draggable,
  },  
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{

    onDragStart(event, report_item_name){
     event.dataTransfer.setData("tiny-report-item-type",report_item_name);//存储图片的src
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.components-list{
    width: 100%;
    height: 100%;
    border:1px solid #cccccc;
    overflow:auto;
}

.components-list .widget-cate {
    padding: 5px 8px;
    font-size: 13px;
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
    width: 90px;
    line-height: 24px;
    position: relative;
    float: left;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 1px;
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



</style>
