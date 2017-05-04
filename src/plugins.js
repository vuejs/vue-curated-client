import Vue from 'vue'

import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

import 'vue-resize/dist/vue-resize.css'
import VueResize from 'vue-resize/dist/vue-resize'
Vue.use(VueResize)

import Responsive from './utils/responsive'
Vue.use(Responsive, {
  computed: {
    mobile () {
      return this.width <= 768
    },
    tablet () {
      return this.width <= 900
    },
    desktop () {
      return !this.tablet
    },
  },
})

import Emoji from './utils/emoji'
Vue.use(Emoji)
