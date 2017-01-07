import Vue from 'vue'
import App from './App'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)

import './api/apollo'

import * as filters from './filters'
for (const k in filters) {
  Vue.filter(k, filters[k])
}

import './components/common'

import router from './router'
import store from './store'

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
})
