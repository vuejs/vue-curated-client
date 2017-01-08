<template>
  <div class="categories">
    <ui-select v-model="input" :options="options"></ui-select>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters, mapMutations } from 'vuex'

const categoriesQuery = gql`query categories {
  moduleCategories {
    id
    label
  }
}`

const defaultOption = { id: null, label: 'All Categories' }

export default {

  data () {
    return {
      categories: [],
    }
  },

  apollo: {
    categories: {
      query: categoriesQuery,
      update: ({ moduleCategories }) => moduleCategories,
    },
  },

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
