<template>
  <div class="module-list">
    <div class="header">
      <div class="logo">
        <router-link :to="{ name: 'home' }"><img src="~assets/logo.png" /></router-link>
      </div>

      <categories class="filter"></categories>
      <releases class="filter"></releases>
    </div>

    <div class="toolbar">
      <span class="search-input">
        <i class="icon material-icons">search</i>
        <input v-model="searchText" placeholder="Search package" />
      </span>
    </div>

    <div class="modules">
      <module v-for="module of modules" :module="module"></module>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import { moduleFields } from 'api/data'

import Module from './ModuleListItem.vue'
import Categories from './Categories.vue'
import Releases from './Releases.vue'

const moduleQuery = gql`query modules ($searchText: String, $category: String, $release: String) {
  modules (searchText: $searchText, category: $category, release: $release) {
    ${moduleFields}
  }
}`

export default {
  name: 'main-pane',

  components: {
    Module,
    Categories,
    Releases,
  },

  data () {
    return {
      modules: [],
      searchText: '',
    }
  },

  apollo: {
    modules: {
      query: moduleQuery,
      variables () {
        return {
          searchText: this.searchText,
          category: this.category && this.category.id,
          release: this.release && this.release.id,
        }
      },
    },
  },

  computed: {
    ...mapGetters({
      category: 'category',
      release: 'release',
    }),
  },
}
</script>

<style lang="scss" scoped>
@import "~style/imports";

.module-list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
}

.header {
  display: flex;
  align-items: center;
}

.logo {
  margin: 0 12px;
  flex: auto 0 0;
  img {
    max-height: 32px;
  }
}

.filter {
  flex: auto 0 0;
}

.toolbar {
  padding: 8px 0;
}

.modules {
  flex: auto 1 1;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
