import { useMutation } from "@apollo/client"
import { LOGIN } from "../graphql/mutation"

const useLogin = () => {
  const [login, result] = useMutation(LOGIN)

  const getLogin = async ({ email, password }) => {
    return await login({
      variables: {
        email,
        password,
      },
    })
  }

  return [getLogin, result]
}

export default useLogin
