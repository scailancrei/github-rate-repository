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
  icons: {
    flexDirection: "row",
    margin: 3,
    padding: 2,
  },
  pressable: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 5,
    margin: 5,
    borderRadius: 10,
    shadowColor: "#000",
    color: "white",
    backgroundColor: "blue",
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <Pressable
          style={styles.pressable}
          onPress={() => console.log("AppBar")}
        >
          <Text style={{ color: "white" }}>Repository</Text>
          <RepositoryIcon />
        </Pressable>
        <Link asChild href="/signin">
          <Pressable style={styles.pressable}>
            <Text style={{ color: "white" }}>Sign In</Text>
            <LoginIcon />
          </Pressable>
        </Link>
      </View>
    </View>
  )
}

export default AppBar
