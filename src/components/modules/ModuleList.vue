<template>
  <div class="modules">
    <div class="logo">
      <router-link :to="{ name: 'home' }"><img src="~assets/logo.png" /></router-link>
    </div>

    <div class="toolbar">
      <span class="search-input">
        <i class="icon material-icons">search</i>
        <input v-model="searchText" placeholder="Search package" />
      </span>
    </div>

    <module v-for="module of moduleList" :module="module"></module>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { moduleFields } from 'api/data'

import Module from './ModuleListItem.vue'

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
  .toolbar {
    padding: 8px 0;
  }
}

.logo {
  text-align: center;

  img {
    max-height: 32px;
  }
}
</style>
