import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    category: null,
    release: null,
  },

  getters: {
    'category': state => state.category,
    'release': state => state.release,
  },

  mutations: {
    'set_category': (state, category) => {
      state.category = category
    },
    'set_release': (state, release) => {
      state.release = release
    },
  },
})

export default store
