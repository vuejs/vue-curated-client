<template>
  <div class="ui-dropdown menu">
    <div ref="trigger" class="trigger">
      <slot name="trigger"></slot>
    </div>
    <ui-drop :show="open" @show="open = arguments[0]" :trigger="() => $refs.trigger" drop-position="bottom left" open-on="click">
      <div class="dropdown">
        <div class="dropdown-content">
          <slot name="dropdown"></slot>
        </div>
      </div>
    </ui-drop>
  </div>
</template>

<script>
export default {
  data () {
    return {
      open: false,
    }
  },

  computed: {
    cssClasses () {
      return {
        open: this.open,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~style/imports";

.ui-dropdown {
  display: inline-block;
}

.dropdown {
  background: white;
}

.dropdown-content {
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  border: solid 1px $md-grey-100;
  border-bottom: solid 2px $md-grey-300;
  border-radius: 2px;
}
</style>
