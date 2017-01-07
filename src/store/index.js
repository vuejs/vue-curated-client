import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    categoryId: null,
    releaseId: null,
  },

  getters: {
    'categoryId': state => state.categoryId,
    'releaseId': state => state.releaseId,
  },

  mutations: {
    'set_category': (state, categoryId) => {
      state.categoryId = categoryId
    },
    'set_release': (state, releaseId) => {
      state.releaseId = releaseId
    },
  },
})

export default store
