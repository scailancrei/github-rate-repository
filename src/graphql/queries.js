import { gql } from "@apollo/client"

export const GET_REPOSITORIES = gql`
  query {
    allRepositories {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
    }
  }
`
