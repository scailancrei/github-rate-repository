import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core"
import { setContext } from "@apollo/client/link/context"
import authStorage from "../utils/authStorage"

const httpLink = new createHttpLink({
  uri: "http://192.168.1.50:4000/graphql",
})

const getToken = async () => {
  const token = await authStorage.getToken("token")
  return token
}

const authContext = setContext(async (_, { headers }) => {
  const token = await getToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const createApolloClient = () => {
  return new ApolloClient({
    link: authContext.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
