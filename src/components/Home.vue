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
import { mapGetters } from 'vuex'

import Module from './Module.vue'

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

  computed: mapGetters({
    modules: 'modules'
  })
}
</script>
