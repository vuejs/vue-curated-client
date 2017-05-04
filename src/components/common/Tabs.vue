<template>
  <div class="tabs" :class="cssClass">
    <div class="header">
      <div v-for="(tab, index) of tabs" class="tab-header" :class="{ active: tab === currentTab }" @click="currentTabIndex = index">
        <i class="icon material-icons" v-if="tab.icon" v-html="tab.icon"></i>
        {{ tab.label }}
      </div>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [],
      currentTabIndex: 0,
      switchDirection: 'left',
    }
  },

  computed: {
    currentTab () {
      return this.currentTabIndex < this.tabs.length && this.tabs[this.currentTabIndex]
    },

    cssClass () {
      return [
        `switch-direction-${this.switchDirection}`,
      ]
    },
  },

  methods: {
    addTab (tab) {
      this.tabs.push(tab)
    },

    removeTab (tab) {
      const index = this.tabs.indexOf(tab)
      if (index !== -1) {
        this.tabs.splice(index, 1)
      }
    },
  },

  watch: {
    currentTabIndex (val, oldVal) {
      if (val < oldVal) {
        this.switchDirection = 'right'
      } else {
        this.switchDirection = 'left'
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "~style/imports";

.header {
  h-box();
  margin: 24px;
}

.tab-header {
  padding: 12px 16px;
  border-bottom: solid 2px transparent;
  color: grey;
  cursor: pointer;
  transition: all .1s;

  &.active {
    border-bottom-color: rgba($primary-color, .5);
    color: $primary-color;
  }

  &:hover {
    background: rgba($primary-color, .2);
  }
}

.body {
  position: relative;
}
</style>
