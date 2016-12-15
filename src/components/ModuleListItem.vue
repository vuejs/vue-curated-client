<template>
  <div class="module">
    <span class="label">{{ data.label }}</span>
    <a :href="data.url">repo</a>
    <span class="stars">{{ details.stargazers_count }} <i class="material-icons">star</i></span>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const detailsQuery = gql`query details($url: String!) {
  module(url: $url) {
    details {
      name
      description
      forks_count
      stargazers_count
      watchers_count
      open_issues_count
      owner {
        login
        avatar_url
        url
      }
    }
  }
}`

export default {
  props: {
    data: {
      type: Object
    }
  },

  data () {
    return {
      details: {}
    }
  },

  apollo: {
    details: {
      query: detailsQuery,
      variables () {
        return {
          url: this.data.url
        }
      },
      update ({ module }) {
        return module.details
      }
    }
  }
}
</script>
