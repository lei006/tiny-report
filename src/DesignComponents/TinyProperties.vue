<template>
  <div class="components-list">
      <div class="attr-title tiny-report-no-select">111111111</div>
      
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



.attr-title {
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
