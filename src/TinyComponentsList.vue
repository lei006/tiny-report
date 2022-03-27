<template>
  <div class="components-list">
    <div class="widget-cate">基础字段</div>
    <ul>
    <li class="form-edit-widget-label"><a><i class="icon iconfont icon-input"></i><span>单行文本</span></a></li>
    <li class="form-edit-widget-label" draggable="false" style=""><a draggable="false"><i class="icon iconfont icon-diy-com-textarea"></i><span>多行文本</span></a></li>
    <li class="form-edit-widget-label"><a><i class="icon iconfont icon-number"></i><span>计数器</span></a></li>
    <li class="form-edit-widget-label"><a><i class="icon iconfont icon-radio-active"></i><span>单选框组</span></a></li>
    <li class="form-edit-widget-label"><a><i class="icon iconfont icon-check-box"></i><span>多选框组</span></a></li>
    <li class="form-edit-widget-label"><a><i class="icon iconfont icon-select"></i><span>下拉选择框</span></a></li>
    <li class="form-edit-widget-label"><a><i class="icon iconfont icon-time"></i><span>时间选择器</span></a></li>
    <li class="form-edit-widget-label"><a><i class="icon iconfont el-icon-edit"></i><span>日期选择器</span></a></li>
    <li class="form-edit-widget-label"><a><i class="icon iconfont icon-pingfen1"></i><span>评分</span></a></li>
    <li class="form-edit-widget-label"><a><i class="icon iconfont icon-color"></i><span>颜色选择器</span></a></li>
    <li class="form-edit-widget-label"><a><i class="icon iconfont icon-switch"></i><span>开关</span></a></li>
    <li class="form-edit-widget-label"><a><i class="icon iconfont icon-slider"></i><span>滑块</span></a></li>
    <li class="form-edit-widget-label"><a><i class="icon iconfont icon-wenzishezhi-"></i><span>文字</span></a></li>
    <li class="form-edit-widget-label"><a><i class="icon iconfont icon-html"></i><span>HTML</span></a></li>
    <li class="form-edit-widget-label"><a><i class="icon iconfont icon-button"></i><span>按钮</span></a></li>
    <li class="form-edit-widget-label"><a><i class="icon iconfont icon-lianjie"></i><span>文字链接</span></a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TinyComponentsList',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.components-list{
    padding: 8px 0;
    width: 100%;
    height: 100%;

    border:1px solid #cccccc;

    overflow:auto;

}

.components-list .widget-cate {
    padding: 8px 12px;
    font-size: 13px;
}

.components-list ul {
    position: relative;
    overflow: hidden;
    padding: 0 10px 10px;
    margin: 0;
}


.components-list .form-edit-widget-label {
    font-size: 12px;
    display: block;
    width: 48%;
    line-height: 26px;
    position: relative;
    float: left;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 1%;
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
