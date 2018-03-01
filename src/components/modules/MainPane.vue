<template>
  <div class="main-pane" :class="cssClass">
    <div class="section header">
      <div class="logo">
        <router-link :to="{ name: 'home' }"><img src="~assets/logo.png" width="32" height="32" /></router-link>
      </div>

      <releases class="filter"></releases>
      <categories class="filter"></categories>
    </div>

    <transition name="fade">
      <div class="section toolbar search-toolbar" v-if="!$responsive.mobile || showSearch">
        <div class="back" v-if="$responsive.mobile">
          <a @click="closeSearch"><VueIcon icon="arrow_back"/></a>
        </div>

        <VueInput
          v-model="searchText"
          class="search-input big"
          placeholder="Search package"
          icon-left="search"
        />
      </div>
    </transition>

    <div class="section modules" @scroll="handleScroll">
      <transition name="fade">
        <div class="empty" v-if="!loading && displayModules.length === 0">
          <template v-if="(!showSearch || searchText)">
            <VueIcon icon="cake"/>
            <span>No package found.</span>
          </template>
          <template v-else>
            <VueIcon icon="search"/>
            <span>Type to search packages</span>
          </template>
        </div>
      </transition>

      <transition-group name="module" tag="div" class="modules-list">
        <module v-for="module of displayModules" v-if="module" class="module" :key="module.id" :module="module" :class="{active: currentModuleDetailsId === module.id}"></module>
        <div v-if="!loading" class="suggestion" key="suggestion">
          <span>Not finding what you are looking for?</span>
          <a href="https://github.com/vuejs/awesome-vue"><VueIcon icon="star"/> Browse more packages</a>
        </div>
      </transition-group>

      <VueLoadingIndicator
        v-if="loading"
        class="overlay primary big transparent"
      />
    </div>

    <transition name="zoom">
      <VueButton
        v-if="$responsive.mobile && !showSearch"
        class="icon-button round fab big primary"
        icon-left="search"
        @click="openSearch"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { search } from 'utils/search'

import Module from './ModuleListItem.vue'
import Categories from './Categories.vue'
import Releases from './Releases.vue'

import MODULES_QUERY from 'graphql/Modules.gql'

import ObserveScroll from 'mixins/ObserveScroll'

export default {
  name: 'main-pane',

  mixins: [ObserveScroll],

  components: {
    Module,
    Categories,
    Releases,
  },

  data () {
    return {
      modules: [],
      searchText: '',
      apolloLoading: 0,
    }
  },

  apollo: {
    modules: {
      query: MODULES_QUERY,
      variables () {
        const release = this.releases.length === 0 || this.release === this.releases[0].id ?
          '_LATEST_' : this.release
        return {
          release,
        }
      },
      update: data => data ? data.modules.slice().sort((a, b) => a.label < b.label ? -1 : 1) : [],
      loadingKey: 'apolloLoading',
    },
  },

  computed: {
    ...mapGetters({
      category: 'categoryId',
      releases: 'releases',
      release: 'releaseId',
      releasesReady: 'releasesReady',
    }),

    cssClass () {
      return {
        loading: this.loading,
        scrolled: this.scrollTop !== 0,
      }
    },

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

      if (!this.$responsive.mobile || this.showSearch) {
        if (this.searchText) {
          list = search(list, this.searchText, [
            { field: item => item.id, weight: 2 },
            { field: item => item.category.label, weight: 1 },
            { field: item => item.details.description, weight: 1 },
          ])
        } else if (this.showSearch) {
          list = []
        }
      }

      return list
    },

    displayModules () {
      return this.filteredModules
    },

    loading () {
      return this.apolloLoading
    },

    showSearch () {
      return this.$route.query.search
    },
  },

  methods: {
    openSearch () {
      this.$router.push({ query: { search: true }})
    },

    closeSearch () {
      this.$router.push({ query: {}})
    },
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

.section {
  padding: 0 12px;

  &:first-child {
    padding-top: 12px;
  }

  &:last-child {
    padding-bottom: 12px;
  }
}

.header {
  display: flex;
  align-items: center;
  flex: auto 0 0;
  box-sizing: border-box;

  > div + div {
    margin-left 6px
  }

  @media ({$small-screen}) {
    color: white;
    background: $primary-color;
    height: 70px;
    padding-top: 0 !important;
    position: relative;
    z-index: 1;

    >>> .vue-button {
      color @color
      .vue-icon {
        svg {
          fill @color
        }
      }
    }
  }
}

.logo {
  margin: 0 12px;
  flex: auto 0 0;
  img {
    max-height: 32px;

    @media ({$small-screen}) {
      filter: grayscale(100%) contrast(500%);
    }
  }
}

.filter {
  flex: auto 0 0;
}

.toolbar {
  padding-top: 8px;
  padding-bottom: 8px;
  flex: auto 0 0;
  display: flex;
  align-items: center;

  > * {
    &:not(:last-child) {
      margin-right: 6px;
    }
  }
}

.search-toolbar {
  .search-input {
    flex: auto 1 1;
  }

  @media ({$small-screen}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    box-sizing: border-box;
    padding: 12px;
    z-index: 1;
    background: white;

    .back {
      font-size: 24px;
      width: 32px;
      text-align: center;
    }
  }
}

.modules {
  flex: auto 1 1;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;

  @media ({$not-small-screen}) {
    padding-left: 0;
    padding-right: 0;
    margin-left: 12px;
    margin-right: 12px;
  }

  @media ({$small-screen}) {
    padding-top: 12px;
    padding-bottom: 64px;
  }
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

.empty,
.suggestion {
  text-align: center;
  color: darken(white, 50%);
  padding: 24px 12px;
}

.empty
  .vue-icon
    >>> svg
      fill darken(white, 50%)

.suggestion {
  v-box()
  box-center()

  a {
    display: flex;
    margin-top 2px
  }
}

@media ({$small-screen}) {
  .header {
    transition: box-shadow .15s;
  }

  .scrolled {
    .header {
      box-shadow: 0 2px 24px rgba(black, .2);
    }
  }
}

</style>
