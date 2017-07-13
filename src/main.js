import Vue from 'vue'

// Plugins
import './plugins'

// Filters
import * as filters from './filters'
for (const k in filters) {
  Vue.filter(k, filters[k])
}

// Global components
import './components/common'

// Injections

import router from './router'
import store from './store'
// Apollo GraphQL
import { createProvider } from './api/apollo'
const apolloProvider = createProvider()

// Root component
import App from './App'

/* eslint-disable no-new */
new Vue({
  router,
  store,
  apolloProvider,

  el: '#app',
  render: h => h(App),

  created () {
    this.$store.dispatch('init')
  },
})
