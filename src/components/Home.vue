<template>
  <div class="page">
    <!-- Logo -->
    <div class="logo">
      <img src="../assets/logo.png">
    </div>

    <div class="packages">
      <input class="search-field" v-model="searchText" />

      <module v-for="module of modules" :data="module"></module>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

import Module from './ModuleListItem.vue'

const moduleQuery = gql`query {
  modules {
    label
    url
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

  apollo: {
    modules: moduleQuery
  }
}
</script>
