<template>
  <div class="components-list tiny-report-no-select">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="=报告属性" name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item title="=反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="=效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="=可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
    name: 'TinyProperties',
    data() {
      return {
        activeNames: ['1']
      };
    },

    methods: {
      handleChange(val) {
        console.log(val);
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.components-list{
    padding: 0px;
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


.el-collapse-item__header {
    height: 30px;
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
}






</style>
