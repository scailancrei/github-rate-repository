import * as SecureStore from "expo-secure-store"

export const getToken = async (key) => {
  try {
    let token = await SecureStore.getItemAsync(key)

    if (!token) {
      return null
    } else {
      return token
    }
  } catch (error) {
    console.log("Error getting token", error)
  }
}

export const setToken = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value)
    console.log("Token saved")
  } catch (error) {
    console.log("Error saving token", error)
  }
}

export const removeToken = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key)
    console.log("Token removed")
  } catch (error) {
    console.log("Error removing token", error)
  }
}

export default { getToken, setToken, removeToken }
