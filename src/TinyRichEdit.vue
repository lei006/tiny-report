<template>

  <div class="tiny-rich-edit">
        <TinyRich v-model=editData></TinyRich>
  </div>


</template>

<script>


import TinyRich from './ReportComponents/TinyRich.vue'

export default {
  name: 'YmTinyRichEdit',
  components:{TinyRich},
  data () {
    return {
      editData:"",
    }
  },
  model: {
      prop: "modelData",
      event: "eventModelData"
  },
  props: {
    modelData: {
      type: String,
      default: ""
    }
  },
  watch:{
    modelData:function(newVal){
      this.editData = newVal;
    },
    editData: function (newVal){
      this.$emit("eventModelData", newVal)
    },
  },
  mounted(){


  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tiny-rich-edit{
  width: 100%;
  height: 100%;
}


</style>

