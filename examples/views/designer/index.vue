<template>
  <div class="dashboard-container">
        <!--
        <ReportItem />

        <TinyPaper />
        <TinyTitle />
        <TinyRich />
        <TinyRect />
        -->
        <TinyDesigner />
        <!--
        <tp-image />
        -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
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
