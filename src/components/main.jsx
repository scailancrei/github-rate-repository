import React from "react"
import { View, StyleSheet } from "react-native"
import RepositoryList from "./repositoryList"
import AppBar from "./appBar"
import theme from "../themes/theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background.mainBackgroundColor,
  },
})

const Main = () => {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={
        (styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom })
      }
    >
      <AppBar />
      <RepositoryList />
    </View>
  )
}

export default Main
