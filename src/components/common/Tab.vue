<template>
  <div class="tab" v-if="inited" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
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
