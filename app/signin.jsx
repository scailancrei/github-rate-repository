import { View, StyleSheet, Pressable } from "react-native"
import Form from "../src/components/forms"

import theme from "../src/themes/theme"

export default function SignIn() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      padding: 10,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    pressable: {
      color: theme.colors.links,
    },
  })
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          height: 40,
          width: "80%",
          justifyContent: "center",
        }}
      >
        <Form />
      </View>
    </View>
  )
}
