import Vue from 'vue'
import { ApolloClient, createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

// Create the apollo client
export const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: process.env.GRAPHQL_URL || 'http://localhost:3000/graphql',
    transportBatching: true,
  }),
})

// Install the vue plugin
Vue.use(VueApollo)

export function createProvider () {
  return new VueApollo({
    defaultClient: apolloClient,
  })
}
