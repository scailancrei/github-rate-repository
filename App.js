import { StatusBar } from "expo-status-bar"
import { Platform, StyleSheet, View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Main from "./src/components/main"
import theme from "./src/themes/theme"

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
    fontFamily: Platform.select({
      ios: "Roboto",
      android: "Arial",
      default: "",
    }),
  },
})
