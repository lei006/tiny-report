<template>
      <div class="tiny-label-box">
      <div class="tiny-label-context"
          :class="{'label-align-justify': align =='justify', 'label-align-left': align =='left', 'label-align-right': align =='right', 'label-align-center': align =='center'}"      
      >
        {{label}}
      </div>
      </div>
</template>

<script>

export default {
  name: 'TinyLabelText',
  components:{},
  model: {
      prop: "reportItemData",
      event: "eventReportItem"
  },
  props: {
      label: {
          type: String
      },
      align:{
        type:String
      },
      options:{
        type: Object,
      },
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  methods:{
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tiny-label-box{
  width: 100%;
  height: 100%;
  margin: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.tiny-label-context {
  width: 100%;
  white-space:nowrap;
}


.label-align-justify {
	text-align-last:justify;
	text-align:justify;
	text-justify:distribute-all-lines;
}


.label-align-left {
	text-align-last:left;
	text-align:left;
	text-justify:distribute-all-lines;
}

.label-align-right {
	text-align-last:right;
	text-align:right;
	text-justify:distribute-all-lines;
}

.label-align-center {
	text-align-last:center;
	text-align:center;
	text-justify:distribute-all-lines;
}





</style>
