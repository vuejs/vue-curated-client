import Vue from 'vue'
import App from './App'

import './apollo'

import router from './router'
import store from './store'

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
