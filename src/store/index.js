import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag'
import { apolloClient } from 'api/apollo'

Vue.use(Vuex)

const releasesQuery = gql`query releases {
  vue_releases {
    id
    label
  }
}`

const categoriesQuery = gql`query categories {
  module_categories {
    id
    label
  }
}`

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
    'fetch_releases' ({ commit }) {
      apolloClient.query({
        query: releasesQuery,
        forceFetch: true,
      }).then(result => {
        const releases = result.data.vue_releases
        commit('set_release', releases[0].id)
        commit('set_releases', releases)
      })
    },

    'fetch_categories' ({ commit }) {
      apolloClient.query({
        query: categoriesQuery,
        forceFetch: true,
      }).then(result => {
        commit('set_categories', result.data.module_categories)
      })
    },
  },
})

export default store
