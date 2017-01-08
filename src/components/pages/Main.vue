<template>
  <div class="page">

    <main-pane class="left-pane"></main-pane>

    <div class="page-wrapper">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import MainPane from '../modules/MainPane.vue'

export default {
  name: 'main',

  components: {
    MainPane,
  },
}
</script>

<style lang="stylus" scoped>
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
  background: rgba(black, .025);
  // border-right: solid 1px darken(white, 5%);
  float: left;
}

.page-wrapper {
  flex: auto 1 1;
  width: 60%;
  max-width: 1000px;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}

@media (min-width: 1700px) {
  .page {
    width: 1700px;
    margin: auto;
  }

  .left-pane {
    border-left: solid 1px darken(white, 5%);
  }

  .page-wrapper {
    border-right: solid 1px darken(white, 5%);
  }
}
</style>
