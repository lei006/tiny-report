<template>
      <input class="report-input-box" :class="{'input-box-border':options.isItemShowControl,'input-box-disable':!options.isItemEnable, 'input-box-edit-area':options.isItemShowControl}" :tabindex="tabindex" :disabled="!options.isItemEnable" v-model="inputData" :placeholder="placeholder" />
</template>

<script>

export default {
  name: 'TinyItemInputBox',
  components:{},
  model: {
      prop: "itemData",
      event: "eventItemData"
  },
  props: {
      itemData: {
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
      inputData:"",
      disabled:false,
      placeholder:"",
    }
  }, 
  watch: {
        itemData:{
            handler(newVal) {
              this.inputData = newVal;
            },
            deep:true,
            immediate:true,
        },
        inputData: function (newval) {
          this.$emit('eventItemData',newval);
        },
  },

  methods:{


  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.report-input-box{
  box-sizing: border-box;
  border-radius: 4px;
  border: 0px solid #DCDFE6;
  width:100%;
  padding: 5px;
  -webkit-input-placeholder:#fff;
}


.report-input-box:focus {
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
