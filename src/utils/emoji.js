import emojione from 'emojione'

export default {
  install (Vue) {
    Vue.prototype.$parseEmoji = (text) => emojione.shortnameToUnicode(text)
  },
}
