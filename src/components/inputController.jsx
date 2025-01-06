import { Controller } from "react-hook-form"
import { View, TextInput, StyleSheet } from "react-native"
import Text from "./text"
import theme from "../themes/theme"

export default function InputController({
  control,
  autoCapitalize,
  name,
  rules,
  keyboardType,
  errors,
  secureTextEntry,
  textContentType,
  placeholder,
  defaultValue,
  holderColor,
}) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoCapitalize={autoCapitalize}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            placeholder={placeholder}
            textContentType={textContentType}
            placeholderTextColor={holderColor}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        defaultValue={defaultValue}
      />

      {errors && errors[name] && (
        <Text style={styles.errors}>{errors[name].message}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  errors: {
    margin: 10,
    borderRadius: 10,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.body,
    shadowColor: "#000",
    color: "red",
  },
  input: {
    margin: 10,
    padding: 10,
    borderColor: "grey",
    backgroundColor: "white",
    borderWidth: 1,
  },
})
