<template>
  <div class="module-releases">
    <release v-for="release of releases" :data="release"></release>

    <ui-loading-overlay :show="loading"></ui-loading-overlay>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const releasesQuery = gql`query releases($id: String!) {
  module(id: $id) {
    releases {
      id
      html_url
      tag_name
      name
      body
      prerelease
      published_at
      files {
        download_url
        size
        download_count
      }
    }
  }
}`

import Release from './ModuleRelease.vue'

export default {
  components: {
    Release,
  },

  props: {
    moduleId: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      loading: 0,
    }
  },

  apollo: {
    releases: {
      query: releasesQuery,
      variables () {
        return {
          id: this.moduleId,
        }
      },
      update: ({ module }) => {
        return module &&
          module.releases
      },
      loadingKey: 'loading',
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "~style/imports";

.module-releases {
  position: relative;
  min-height: 400px;
}
</style>
