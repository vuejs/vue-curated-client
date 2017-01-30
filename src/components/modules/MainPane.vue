<template>
  <div class="main-pane" :class="{loading: loading}">
    <div class="header">
      <div class="logo">
        <router-link :to="{ name: 'home' }"><img src="~assets/logo.png" width="32" height="32" /></router-link>
      </div>

      <releases class="filter"></releases>
      <categories class="filter"></categories>
    </div>

    <div class="toolbar">
      <span class="search-input">
        <i class="icon material-icons">search</i>
        <input v-model="searchText" placeholder="Search package" />
      </span>
    </div>

    <div class="modules">
      <div class="empty" v-if="!loading && displayModules.length === 0">
        <i class="material-icons">cake</i> No package found.
      </div>

      <transition-group name="module" tag="div" class="modules-list">
        <module v-for="module of displayModules" v-if="module" class="module" :key="module.id" :module="module" :class="{active: currentModuleDetailsId === module.id}"></module>
      </transition-group>

      <ui-loading-overlay :show="loading" no-background></ui-loading-overlay>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import { search } from 'utils/search'

import Module from './ModuleListItem.vue'
import Categories from './Categories.vue'
import Releases from './Releases.vue'

const moduleQuery = gql`query modules ($release: String) {
  modules (release: $release) {
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
    category {
      id
      label
    }
    details {
      description
      forks_count
      stargazers_count
      forks_count
      open_issues_count
      created_at
      owner {
        login
        avatar_url
        html_url
      }
    }
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
      loading: 0,
    }
  },

  apollo: {
    modules: {
      query: moduleQuery,
      variables () {
        return {
          release: this.release,
        }
      },
      update: data => data ? data.modules : [],
      returnPartialData: true,
      loadingKey: 'loading',
      skip () {
        return this.releases.length === 0
      },
    },
  },

  computed: {
    currentModuleDetailsId () {
      if (this.$route.matched.some(r => r.name === 'module')) {
        return this.$route.params.id
      }
    },

    filteredModules () {
      let list = this.modules

      if (this.category) {
        list = list.filter(module => module.category.id === this.category)
      }

      if (this.searchText) {
        list = search(list, this.searchText, [
          { field: item => item.id, weight: 2 },
          { field: item => item.category.label, weight: 1 },
          { field: item => item.details.description, weight: 1 },
        ])
      }

      return list
    },

    displayModules () {
      return this.filteredModules // .sort((a, b) => a.label < b.label ? -1 : 1)
    },

    ...mapGetters({
      category: 'categoryId',
      releases: 'releases',
      release: 'releaseId',
    }),
  },
}
</script>

<style lang="stylus" scoped>
@import "~style/imports";

.main-pane {
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
  position: relative;
}

.module {
  transition: all .5s, opacity .3s;
}

.module-enter,
.module-leave-active {
  opacity: 0;
}

.module-leave-active {
  margin-bottom: -90px;
}

.main-pane {
  &.loading {
    .modules-list {
      opacity: .5;
    }
  }
}
</style>
