import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Main from 'components/pages/Main'
import Home from 'components/pages/Home'
import Module from 'components/pages/Module'
import NotFound from 'components/pages/NotFound'

/* eslint-disable object-property-newline */
const routes = [
  { path: '/', component: Main, children: [
    { path: '', name: 'home', component: Home },
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
