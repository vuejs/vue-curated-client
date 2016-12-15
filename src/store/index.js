import Vue from 'vue'
import Vuex from 'vuex'
import { getModuleData } from '../api/github'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    modules: [],
    categories: []
  },

  getters: {
    modules: state => state.modules,
    categories: state => state.categories
  },

  mutations: {
    'modules' (state, modules) {
      state.modules = modules
    },
    'categories' (state, categories) {
      state.categories = categories
    }
  },

  actions: {
    async fetchModules ({ commit }) {
      const { modules, categories } = await getModuleData()
      commit('modules', modules)
      commit('categories', categories)
    }
  }
})

store.dispatch('fetchModules')

export default store
