import Vue from 'vue'

// Plugins
import './plugins'

// Filters
import * as filters from './filters'

// Global components
import './components/common'

// Injections

import router from './router'
import store from './store'
// Apollo GraphQL
import { createProvider } from './api/apollo'

// Root component
import App from './App'

// Filters
for (const k in filters) {
  Vue.filter(k, filters[k])
}

const apolloProvider = createProvider()

/* eslint-disable no-new */
new Vue({
  router,
  store,
  provide: apolloProvider.provide(),
  el: '#app',
  ...App,
  created () {
    this.$store.dispatch('init')
  },
})
