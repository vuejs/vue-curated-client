import Vue from 'vue'

const components = require.context('./', true, /[a-z0-9]+\.vue$/)
// To extract the component name
const nameReg = /([a-z0-9]+)\./i
// Registration
components.keys().forEach(key => {
  const name = key.match(nameReg)[1]
  Vue.component(name, components(key).default)
})
