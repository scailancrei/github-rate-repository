import { StatusBar } from "expo-status-bar"
import { Platform, StyleSheet, View } from "react-native"

import Main from "./src/components/main"

export default function App() {
  return (
    <View style={styles.container}>
      <Main />
      <StatusBar style="dark" />
    </View>
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
