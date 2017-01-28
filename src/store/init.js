export default function initStore (store) {
  store.dispatch('fetch_releases')
  store.dispatch('fetch_categories')
}
