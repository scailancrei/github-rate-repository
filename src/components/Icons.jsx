import { AntDesign } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import { Entypo } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import theme from "../themes/theme"

export const LoginIcon = (props) => {
  return <Entypo name="login" size={24} color={theme.colors.links} {...props} />
}

export const HomeIcon = (props) => {
  return (
    <FontAwesome5 name="home" size={24} color={theme.colors.links} {...props} />
  )
}

export const RepositoryIcon = (props) => {
  return (
    <MaterialCommunityIcons
      name="source-repository"
      size={24}
      color={theme.colors.links}
      {...props}
    />
  )
}
