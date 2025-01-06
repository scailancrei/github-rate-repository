import { View } from "react-native"
import { Stack } from "expo-router"
import Text from "../src/components/text"
import { ApolloProvider } from "@apollo/client"
import createApolloClient from "../src/graphql/client"
import AuthStorageContext from "../src/contexts/authStorageContext"
import AuthStorage from "../src/utils/authStorage"
const authStorage = AuthStorage
const client = createApolloClient(authStorage)

export default function Layout() {
  return (
    <ApolloProvider client={client}>
      <AuthStorageContext.Provider value={authStorage}>
        <View style={{ height: "100%" }}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerTitle: "Home",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="signin"
              options={{
                headerLeft: () => <Text>Home</Text>,
                headerBackVisible: true,
                headerBackTitle: "Home",
                headerTitle: "Sign In",

                headerTitleAlign: "center",
              }}
            />
          </Stack>
        </View>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  )
}
