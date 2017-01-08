<template>
  <div class="main-pane" :class="{loading: loading}">
    <div class="header">
      <div class="logo">
        <router-link :to="{ name: 'home' }"><img src="~assets/logo.png" width="32" height="32" /></router-link>
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
      <transition-group name="module" tag="div" class="modules-list">
        <module v-for="module of modules" v-if="module" class="module" :key="module.id" :module="module" :class="{active: currentModuleDetailsId === module.id}"></module>
      </transition-group>

      <ui-loading-overlay :show="loading" no-background></ui-loading-overlay>

      <div class="empty" v-if="!loading && modules.length === 0">
        <i class="material-icons">cake</i> No package found.
      </div>
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
      loading: 0,
    }
  },

  apollo: {
    modules: {
      query: moduleQuery,
      variables () {
        return {
          searchText: this.searchText,
          category: this.category,
          release: this.release,
        }
      },
      update: data => data ? data.modules : [],
      returnPartialData: true,
      loadingKey: 'loading',
      throttle: {
        wait: 800,
        leading: true,
        trailing: true,
      },
    },
  },

  computed: {
    currentModuleDetailsId () {
      if (this.$route.matched.some(r => r.name === 'module')) {
        return this.$route.params.id
      }
    },

    ...mapGetters({
      category: 'categoryId',
      release: 'releaseId',
    }),
  },
}
</script>

<style lang="scss" scoped>
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
  transition: all .5s;
}

.module-enter,
.module-leave-active {
  opacity: 0;
  transform: scale(.9);
}

.module-leave-active {
  margin-bottom: -70px;
}

.main-pane {
  &.loading {
    .modules-list {
      opacity: .5;
    }
  }
}
</style>
