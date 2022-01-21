import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { BACKEND_URL, WS_URL } from './settings'
import { ApolloLink, split } from 'apollo-link'

Vue.use(VueApollo)

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("token")
    operation.setContext({
        headers: {
            authorization: token ? `jwt ${token}` : null
        }
    })
    return forward(operation)
})

const httpLink = new HttpLink({
    uri: BACKEND_URL,
    fetch
})

const wsLink = new WebSocketLink({
    uri: WS_URL,
    options: { reconnect: true }
})

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
    },
    wsLink,
    httpLink
)

export const client = new ApolloClient({
    link: authMiddleware.concat(link),
    cache: new InMemoryCache({
        addTypename: true
    })
})

const apolloProvider = new VueApollo({
    defaultClient: client
})

export default apolloProvider