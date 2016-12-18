import Vue from 'vue'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
    transportBatching: false
  })
})

// Install the vue plugin
Vue.use(VueApollo, {
  apolloClient
})
