<template>
  <transition name="fade">
    <div class="ui-loading-overlay" v-if="show" :class="{'no-background': noBackground}">
      <ui-loading-animation></ui-loading-animation>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      default: false,
    },
    noBackground: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="stylus" scoped>
.ui-loading-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(white, .75);

  &.no-background {
    background: none !important;
  }
}
</style>
