<template>
    <div class="dashboard-container">
          <TinyDesigner />
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import TinyDesigner from '../../../../src/TinyDesign.vue'

  export default {
    name: 'Dashboard',
    components:{
        TinyDesigner
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 0px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  
  .dashboard-container {
    height: 100%;
    width: 100%;
  
  }
  
  </style>
  