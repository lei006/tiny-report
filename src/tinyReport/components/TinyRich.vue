<template>
  <div class="report-item-box" 
      :class="{'input-box-border':options.isShowBorder,'input-box-disable':!options.isItemEnable, 'input-box-edit-area':options.isItemShowControl}" :tabindex="tabindex">
        <TinyRichEditor v-model="editData" placeholder="请输入内容"></TinyRichEditor>
  </div>
</template>

<script>

import TinyRichEditor from '../../tinyRichEditor/index.vue'
//import TinyMCE from '../ComponentsHelper/TinyMCE/index.vue'

export default {
  name: 'TinyItemInputBox',
  components:{TinyRichEditor},
  model: {
      prop: "modelData",
      event: "eventModelData"
  },
  props: {
      modelData: {
          type: String
      },
      options:{
        type: Object,
      },
      tabindex:{
        type: String,
      }
  },

  data () {
    return {
      editData:"<p></p>",
      disabled:false,
    }
  }, 
  watch: {
    editData(val) {
      this.$emit("eventModelData", val);
    },
    modelData:{
        handler(newVal) {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.editData = newVal;
          }, 250);
        },
        deep:true,
        immediate:true,
    },
  },



  methods:{
    dragging(id, left, top){
      this.$emit("dragging", id, left, top);
    },
    dragstop(id, left, top){
      this.$emit("dragstop", id, left, top);
    }, 
    onMouseDown(){
      this.$emit("mousedown", this.reportItem);
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.report-item-box{
  box-sizing: border-box;
  border-radius: 4px;
  border: 0px solid #DCDFE6;
  width:100%;
  padding: 5px;
  -webkit-input-placeholder:#fff;
}


.report-item-box:focus {
    outline: none;
    border-color: #409eff;
}

.input-box-border{
  border: 1px solid #DCDFE6;
}

.input-box-disable{
  background-color: #409eff00;
}

.input-box-edit-area{
  background-color: #f0f0f0;
}

</style>





