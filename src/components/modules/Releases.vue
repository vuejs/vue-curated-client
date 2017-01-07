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
        return this.releases.find(r => r.id === this.currentRelease) || defaultOption
      },
      set (val) {
        this.setRelease(val.id)
      },
    },

    options () {
      return [
        defaultOption,
        ...this.releases,
      ]
    },

    ...mapGetters({
      currentRelease: 'releaseId',
    }),
  },

  methods: {
    ...mapMutations({
      setRelease: 'set_release',
    }),
  },
}
</script>
