import { View, StyleSheet, Pressable } from "react-native"
import { HomeIcon } from "../src/components/Icons"
import { Link } from "expo-router"
import theme from "../src/themes/theme"

export default function SignIn() {
  const styles = StyleSheet.create({
    pressable: {
      color: theme.colors.links,
    },
  })
  return (
    <View style={styles.container}>
      <Link asChild href="/">
        <Pressable>
          <HomeIcon />
        </Pressable>
      </Link>
    </View>
  )
}
