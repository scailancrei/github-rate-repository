import React from "react"
import { View, StyleSheet, Pressable } from "react-native"

import Text from "./text"
import theme from "../themes/theme"
import { Link } from "expo-router"
import { LoginIcon, RepositoryIcon } from "./Icons"

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background.appBarColor,
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("AppBar")}>
        <RepositoryIcon />
      </Pressable>
      <Link asChild href="/signin">
        <Pressable>
          <LoginIcon />
        </Pressable>
      </Link>
    </View>
  )
}

export default AppBar
