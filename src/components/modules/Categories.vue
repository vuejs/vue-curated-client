<template>
  <div class="categories">
    <ui-select v-model="input" :options="options"></ui-select>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

const defaultOption = { id: null, label: 'All Categories' }

export default {
  computed: {
    input: {
      get () {
        return this.categories.find(c => c.id === this.currentCategory) || defaultOption
      },
      set (val) {
        this.setCategory(val.id)
      },
    },

    options () {
      return [
        defaultOption,
        ...this.categories,
      ]
    },

    ...mapGetters({
      categories: 'categories',
      currentCategory: 'categoryId',
    }),
  },

  methods: {
    ...mapMutations({
      setCategory: 'set_category',
    }),
  },
}
</script>
