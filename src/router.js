import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from 'components/pages/Main'
import Welcome from 'components/pages/Welcome'
import ModuleDetails from 'components/modules/ModuleDetails.vue'
import NotFound from 'components/pages/NotFound'

Vue.use(VueRouter)

/* eslint-disable object-property-newline */
const routes = [
  { path: '/', component: Main, children: [
    { path: '', name: 'home', component: Welcome },
    { path: 'module/:id', name: 'module', component: ModuleDetails, props: true },
  ] },
  { path: '*', component: NotFound },
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
  scrollBehavior,
})

export default router
