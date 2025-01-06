import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native"
import Text from "./text"
import { RepositoryAnimatedItem } from "./repositoryItem"
import { useQuery } from "@apollo/client"
import { GET_REPOSITORIES } from "../graphql/queries.js"

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES)
  const repositories = data?.allRepositories

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator /> ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={repositories}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={{ paddingBottom: 150 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <RepositoryAnimatedItem item={item} index={index} />
          )}
        />
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  separator: {
    marginTop: 3,
    margin: 4,
    backgroundColor: "gray",
    padding: 3,
  },
})
export default RepositoryList
