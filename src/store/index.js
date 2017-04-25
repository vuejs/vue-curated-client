import Vue from 'vue'
import Vuex from 'vuex'
import { apolloClient } from 'api/apollo'

Vue.use(Vuex)

import RELEASES_QUERY from 'graphql/VueReleases.gql'
import CATEGORIES_QUERY from 'graphql/ModuleCategories.gql'

const store = new Vuex.Store({
  state: {
    categoryId: null,
    categories: [],
    releaseId: null,
    releases: [],
  },

  getters: {
    'categoryId': state => state.categoryId,
    'categories': state => state.categories,

    'releaseId': state => state.releaseId,
    'releases': state => state.releases,
  },

  mutations: {
    'set_category': (state, categoryId) => {
      state.categoryId = categoryId
    },

    'set_categories': (state, categories) => {
      state.categories = categories
    },

    'set_release': (state, releaseId) => {
      state.releaseId = releaseId
    },

    'set_releases': (state, releases) => {
      state.releases = releases
    },
  },

  actions: {
    'init' ({ dispatch }) {
      return Promise.all([
        dispatch('fetch_releases'),
        dispatch('fetch_categories'),
      ])
    },

    'fetch_releases' ({ commit }) {
      apolloClient.query({
        query: RELEASES_QUERY,
      }).then(result => {
        const releases = result.data.vue_releases
        commit('set_release', releases[0].id)
        commit('set_releases', releases)
      })
    },

    'fetch_categories' ({ commit }) {
      apolloClient.query({
        query: CATEGORIES_QUERY,
      }).then(result => {
        commit('set_categories', result.data.module_categories)
      })
    },
  },
})

export default store
