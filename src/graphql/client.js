import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core"

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://192.168.1.50:4000/graphql",
  }),
  cache: new InMemoryCache(),
})

export default client
