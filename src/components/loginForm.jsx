import { View, StyleSheet, Button, Alert } from "react-native"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import InputController from "./inputController"
import { router } from "expo-router"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import theme from "../themes/theme"
import Text from "./text"
import useLogin from "../hooks/useLogin"
import AuthStorageContext from "../contexts/authStorageContext"

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
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must have at least 3 characters"),
})

export default function LoginForm() {
  const authStorage = useContext(AuthStorageContext)
  const [getLogin] = useLogin()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  })

  const submit = async (values) => {
    const { email, password } = values
    try {
      const { data } = await getLogin({
        email,
        password,
      })
      if (data.login) {
        setLoading(true)
        await authStorage.setToken("token", data.login.value)
        setLoading(false)
        setError(null)
        router.dismissAll()
        router.replace("/")
      }
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    const getTokenAsync = async () => {
      const token = await authStorage.getToken("token")
      return token
    }
    getTokenAsync().then((response) => {
      console.log(response)
      if (response) {
        router.push("/")
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {error ? (
          Alert.alert("Error", error.message, [
            {
              text: "Close",
              onPress: () => setError(null),
              style: "cancel",
            },
          ])
        ) : loading ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : (
          <View>
            <InputController
              defaultValue={""}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
              control={control}
              name="email"
              placeholder="Enter Email"
              errors={errors}
              textContentType={"emailAddress"}
              holderColor={"grey"}
              secureTextEntry={false}
              rules={{ required: true }}
            />

            <InputController
              defaultValue={""}
              control={control}
              textContentType={"password"}
              autoCapitalize={"none"}
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
        )}
      </View>
    </View>
  )
}
