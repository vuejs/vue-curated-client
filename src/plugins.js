import Vue from 'vue'
import VTooltip from 'v-tooltip'
import 'vue-resize/dist/vue-resize.css'
import VueResize from 'vue-resize/dist/vue-resize'
import Responsive from './utils/responsive'
import Emoji from './utils/emoji'

Vue.use(VTooltip)

Vue.use(VueResize)

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

Vue.use(Emoji)
