import { StatusBar } from "expo-status-bar"
import { Platform, StyleSheet, View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ApolloProvider } from "@apollo/client"
import Main from "./src/components/main"
import client from "./src/graphql/client"

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <Main />
          <StatusBar style="light" />
        </View>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: Platform.select({
      ios: "Roboto",
      android: "Arial",
      default: "",
    }),
  },
})
