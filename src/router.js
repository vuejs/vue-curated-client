import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from 'components/pages/Home.vue'
import Module from 'components/pages/Module.vue'
import NotFound from 'components/pages/NotFound.vue'

/* eslint-disable object-property-newline */
const routes = [
  { path: '/', name: 'home', component: Home, children: [
    { path: 'module/:id', name: 'module', component: Module }
  ] },
  { path: '*', component: NotFound }
]

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior
})

export default router
