<template>
  <transition name="tab">
    <div class="tab" :key="id" v-if="inited" v-show="isActive">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: null,
    },
  },

  data () {
    return {
      inited: false,
    }
  },

  computed: {
    isActive () {
      return this.$parent.currentTab === this
    },
  },

  watch: {
    isActive (val) {
      if (val) {
        this.inited = true
      }
    },
  },

  created () {
    this.$parent.addTab(this)
  },

  beforeDestroy () {
    this.$parent.removeTab(this)
  },
}
</script>

<style lang="stylus">
.tab-enter-active,
.tab-leave-active {
  transition: all .15s cubic-bezier(0.0, 0.0, 0.2, 1);
}

.tab-leave-active {
  position: absolute;
  top: -24px;
  left: 0;
  right: 0;
}

.tab-enter,
.tab-leave-to {
  opacity: 0;
}

.tabs {
  &.switch-direction-left {
    .tab-enter {
      transform: translateX(100px);
    }

    .tab-leave-to {
      transform: translateX(-100px);
    }
  }

  &.switch-direction-right {
    .tab-enter {
      transform: translateX(-100px);
    }

    .tab-leave-to {
      transform: translateX(100px);
    }
  }
}
</style>
