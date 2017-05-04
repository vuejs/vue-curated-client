<template>
  <div class="page">

    <main-pane class="left-pane"></main-pane>

    <template v-if="$responsive.mobile">
      <transition name="mobile-page" duration="150">
        <div class="page-wrapper" :key="$route.fullPath">
          <router-view></router-view>
        </div>
      </transition>
    </template>
    <div v-else class="page-wrapper">
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
  box-sizing: border-box;
  background: rgba(black, .025);
  // border-right: solid 1px darken(white, 5%);
  float: left;
}

.page-wrapper {
  flex: auto 1 1;
  width: 60%;
  max-width: 1000px;
  position: relative;

  .page-content {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
  }
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

@media ({$small-screen}) {
  .page {
    display: block;
  }

  .left-pane {
    width: 100%;
  }

  .page-wrapper {
    position: static;
  }

  .page-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;
  }
}
</style>
