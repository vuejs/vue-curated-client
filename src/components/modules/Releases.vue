<template>
  <div class="releases">
    <ui-select v-model="input" :options="options"></ui-select>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters, mapMutations } from 'vuex'

const releasesQuery = gql`query {
  vueReleases {
    id
    label
  }
}`

const defaultOption = { id: null, label: 'All Releases' }

export default {

  data () {
    return {
      releases: [],
    }
  },

  apollo: {
    releases: {
      query: releasesQuery,
      update: ({ vueReleases }) => vueReleases,
    },
  },

  computed: {
    input: {
      get () {
        return this.currentRelease || defaultOption
      },
      set (val) {
        this.setRelease(val)
      },
    },

    options () {
      return [
        defaultOption,
        ...this.releases,
      ]
    },

    ...mapGetters({
      currentRelease: 'release',
    }),
  },

  methods: {
    ...mapMutations({
      setRelease: 'set_release',
    }),
  },
}
</script>
