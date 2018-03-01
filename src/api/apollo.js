import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionQueryResultData from './fragment-types.json'

export const GRAPHQL_URI = process.env.GRAPHQL_URL || 'http://localhost:3000/graphql'

const link = new HttpLink({
  // You should use an absolute URL here
  uri: GRAPHQL_URI,
})

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const cache = new InMemoryCache({
  fragmentMatcher,
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link,
  cache,
})

// Install the vue plugin
Vue.use(VueApollo)

export function createProvider () {
  return new VueApollo({
    defaultClient: apolloClient,
  })
}
