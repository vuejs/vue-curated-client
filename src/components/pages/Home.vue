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
  display: flex;
  align-items: stretch;
}

.left-pane {
  flex: auto 1 1;
  width: 40%;
  height: 100%;
  max-width: 700px;
  padding: 12px;
  box-sizing: border-box;
  border-right: solid 1px darken(white, 5%);
  float: left;
}

.page-content {
  flex: auto 1 1;
  width: 60%;
  max-width: 1000px;
  overflow-x: hidden;
  overflow-y: auto;

  @media (min-width: 1700px) {
    border-right: solid 1px darken(white, 5%);
  }
}
</style>
