import Vue from 'vue'
import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

// Create the apollo client
export const apolloClient = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: process.env.GRAPHQL_URL || 'http://localhost:3000/graphql',
  }),
})

// Install the vue plugin
Vue.use(VueApollo)

export function createProvider () {
  return new VueApollo({
    defaultClient: apolloClient,
  })
}
