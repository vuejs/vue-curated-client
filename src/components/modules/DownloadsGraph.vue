<template>
  <div class="downloads-graph">
    <transition name="fade">
      <ui-graph v-if="values" :values="values"></ui-graph>
    </transition>
  </div>
</template>

<script>
import DOWNLOADS_QUERY from 'graphql/Downloads.gql'

export default {
  props: {
    moduleId: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      days: null,
    }
  },

  apollo: {
    days: {
      query: DOWNLOADS_QUERY,
      variables () {
        return {
          id: this.moduleId,
        }
      },
      update: ({ module }) => {
        return module &&
          module.npm_package &&
          module.npm_package.range_downloads
      },
    },
  },

  computed: {
    values () {
      return this.days && this.days.map(day => day.downloads)
    },
  },
}
</script>

<style lang="stylus" scoped>
.graph {
  width: 100%;
  height: 100%;
}
</style>
