import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Main from "./src/components/main"

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Main />
        <StatusBar style="light" />
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
