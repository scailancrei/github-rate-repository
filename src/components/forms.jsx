import { View, StyleSheet, TextInput, Alert, Button } from "react-native"
import { useForm } from "react-hook-form"
import InputController from "./inputController"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import theme from "../themes/theme"

const styles = StyleSheet.create({
  form: {
    backgroundColor: theme.background.formBackgroundColor,
    margin: 5,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
    justifyContent: "center",
    shadowColor: "#000",

    color: "white",
    padding: 10,
  },

  button: {
    margin: 5,
    padding: 5,
    width: 200,
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#000",
    color: "white",
    backgroundColor: "blue",
    fontSize: 16,
  },
})

const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must have at least 3 characters")
    .max(10),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must have at least 3 characters")
    .max(10),
})

export default function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  console.log(JSON.stringify(errors, null, 3))
  const submit = (data) => {
    console.log(data)
    Alert.alert(JSON.stringify(data))
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <InputController
          control={control}
          name="username"
          placeholder="Enter Username"
          errors={errors}
          holderColor={"grey"}
          secureTextEntry={false}
          rules={{ required: true }}
        />

        <InputController
          control={control}
          name="password"
          placeholder="Enter Password"
          errors={errors}
          holderColor={"grey"}
          secureTextEntry={true}
          rules={{ required: true, minLength: 3 }}
        />
        <View style={styles.button}>
          <Button title="Submit" onPress={handleSubmit(submit)} />
        </View>
      </View>
    </View>
  )
}
