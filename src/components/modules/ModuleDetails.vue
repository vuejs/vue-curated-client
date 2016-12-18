<template>
  <div class="module-details">
    <div class="loading" v-if="!data">
      Loading...
    </div>

    <template v-else>
      <div class="header">
        <div class="title">
          <span class="module-name">{{ data.label }}</span>
        </div>

        <div class="links">
          <a class="open-url" :href="data.url" target="_blank">repo</a>
          <a class="open-url" v-for="link of data.links" :href="link.url" target="_blank">{{ link.label }}</a>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { moduleFields } from 'api/data'

const detailsQuery = gql`query details($id: String!) {
  module(id: $id) {
    ${moduleFields}
    details {
      name
      description
      forks_count
      stargazers_count
      forks_count
      open_issues_count
      owner {
        login
        avatar_url
        html_url
      }
    }
    category {
      id
      label
    }
  }
}`

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  apollo: {
    data: {
      query: detailsQuery,
      variables () {
        return {
          id: this.id
        }
      },
      update: ({ module }) => module
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~style/imports";

.module-details {
  padding: 12px;
}

.title {
  border-bottom: solid 1px darken(white, 5%);
}

.module-name {
  font-size: 32px;
}

.links {
  padding: 12px 0;

  a {
    display: inline-block;
    margin-right: 6px;
  }
}
</style>
