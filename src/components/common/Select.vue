<template>
  <ui-dropdown ref="dropdown">
    <div class="current-option" slot="trigger">
      <span>{{ value.label }}</span>
      <i class="material-icons">expand_more</i>
    </div>
    <template slot="dropdown">
      <div v-for="option of options" class="option" :class="{active: option === value}" @click="selectOption(option)">{{ option.label }}</div>
    </template>
  </ui-dropdown>
</template>

<script>
export default {
  props: ['value', 'options'],

  methods: {
    selectOption (option) {
      this.$emit('input', option)
      this.$refs.dropdown.open = false
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "~style/imports";

.current-option {
  padding: 12px;
}

.option {
  padding: 12px 32px 12px 16px;
  transition: background .15s, color .15s;
  white-space: nowrap;

  &:hover {
    background: rgba($primary-color, .1);
  }

  &.active {
    background: $primary-color;
    color: white;
  }
}

.current-option,
.option {
  cursor: pointer;
}

</style>
