import React, { useContext } from "react"
import { View, StyleSheet, Pressable } from "react-native"
import Text from "./text"
import theme from "../themes/theme"
import { Link, router } from "expo-router"
import { LoginIcon, RepositoryIcon } from "./Icons"
import AuthStorageContext from "../contexts/authStorageContext"

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
  disabled: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 5,
    margin: 5,
    borderRadius: 10,
    shadowColor: "#000",
    color: "white",
    backgroundColor: "grey",
  },
})

const AppBar = ({ token }) => {
  const authStorage = useContext(AuthStorageContext)

  const logOut = async () => {
    await authStorage.removeToken("token")
    router.replace("/")
  }

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
        {token === null ? (
          <Link asChild href={{ pathname: "/signin" }}>
            <Pressable style={styles.pressable}>
              <Text style={{ color: "white" }}>Sign In</Text>
              <LoginIcon />
            </Pressable>
          </Link>
        ) : (
          <Pressable style={styles.disabled} onPress={logOut}>
            <Text style={{ color: "white" }}>LogOut</Text>
            <LoginIcon />
          </Pressable>
        )}
      </View>
    </View>
  )
}

export default AppBar
