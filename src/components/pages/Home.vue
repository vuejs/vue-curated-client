<template>
  <div class="page">

    <module-list class="left-pane"></module-list>

    <div class="page-content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import ModuleList from '../modules/ModuleList.vue'

export default {
  components: {
    ModuleList
  }
}
</script>

<style lang="scss" scoped>
@import "~style/imports";

.page {
  height: 100%;
}

.left-pane {
  width: 40%;
  height: 100%;
  max-width: 700px;
  padding: 12px;
  box-sizing: border-box;
  border-right: solid 1px darken(white, 5%);
  float: left;
}

.page-content {
  width: 60%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
