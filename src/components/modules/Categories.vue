<template>
  <div class="categories">
    <VueSelect
      v-model="input"
      button-class="flat big"
    >
      <VueSelectButton
        v-for="option of options"
        :key="option.id"
        :value="option.id"
        :label="option.label"
        class="primary big"
      />
    </VueSelect>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

const defaultOption = { id: null, label: 'All Categories' }

export default {
  computed: {
    input: {
      get () {
        return (this.categories.find(c => c.id === this.currentCategory) || defaultOption).id
      },
      set (val) {
        this.setCategory(val)
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
