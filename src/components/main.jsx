import { View, StyleSheet } from "react-native"
import RepositoryList from "./repositoryList"
import AppBar from "./appBar"
import theme from "../themes/theme"

import { useContext, useEffect, useState } from "react"
import AuthStorageContext from "../contexts/authStorageContext"
import Text from "./text"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background.mainBackgroundColor,
  },
})

const Main = () => {
  const authStorage = useContext(AuthStorageContext)
  const [userToken, setUserToken] = useState(null)

  useEffect(() => {
    const getTokenAsync = async () => {
      const token = await authStorage.getToken("token")
      return token
    }
    getTokenAsync().then((response) => {
      setUserToken(response)
    })
  }, [userToken])

  return (
    <View>
      <AppBar token={userToken} />
      {userToken ? (
        <RepositoryList />
      ) : (
        <Text>Sign In to watch repositories</Text>
      )}
    </View>
  )
}

export default Main
