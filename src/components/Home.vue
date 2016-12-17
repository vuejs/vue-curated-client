<template>
  <div class="page">
    <div class="modules">
      <div class="logo">
        <img src="../assets/logo.png" />
      </div>

      <div class="toolbar">
        <input class="search-field" v-model="searchText" placeholder="Search package" />
      </div>

      <module v-for="module of moduleList" :module="module"></module>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

import Module from './ModuleListItem.vue'

const moduleFields = `
id
label
url
vue
links {
  url
  label
}
status
badge
`

const moduleQuery = gql`query {
  modules {
    ${moduleFields}
  }
}`

const searchQuery = gql`query search ($text: String!) {
  searchModules (text: $text) {
    ${moduleFields}
  }
}`

export default {
  name: 'page-home',

  components: {
    Module
  },

  data () {
    return {
      searchText: ''
    }
  },

  computed: {
    moduleList () {
      return this.searchText ? this.searchModules : this.modules
    }
  },

  apollo: {
    modules: moduleQuery,

    searchModules: {
      query: searchQuery,
      variables () {
        return {
          text: this.searchText || false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~style/imports";

.modules {
  max-width: 600px;
  margin: 12px auto;

  .toolbar {
    padding: 8px 0;
  }

  .search-field {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    border: solid 2px lighten($primary-color, 20%);
    border-radius: 3px;
    padding: 6px 12px;
    font-family: inherit;
    font-size: inherit;
    vertical-align: middle;
    outline: none;

    &:focus {
      border-color: $primary-color;
    }
  }
}

.logo {
  text-align: center;

  img {
    max-height: 32px;
  }
}
</style>
