import React, { useEffect, useRef } from "react"
import { View, Image, StyleSheet, Animated } from "react-native"
import Text from "./text"
import theme from "../themes/theme"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 1,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textSecondary,
    padding: 5,
    borderRadius: 5,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    textAlign: "center",
    width: 100,
  },
  main: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    padding: 5,
  },
  avatar: {
    margin: 5,
    flex: 0.5,
    flexGrow: 0.2,
    padding: 3,
  },
  text: {
    flex: 0.5,
    flexGrow: 0.8,
  },

  rate: {
    flex: 1,
    marginTop: 10,
    padding: 2,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  item: {
    flex: 1,
  },
})

export function RepositoryAnimatedItem({ item, index }) {
  const opacy = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(opacy, {
      toValue: 1,
      duration: 1000,
      delay: index * 300,
      useNativeDriver: true,
    }).start()
  }, [opacy, index])

  return (
    <Animated.View style={{ opacity: opacy }}>
      <RepositoryItem item={item} />
    </Animated.View>
  )
}

const RepositoryItem = ({ item }) => {
  return (
    <View key={item.id} style={styles.container}>
      <View style={styles.main}>
        <View style={styles.avatar}>
          <Image source={{ uri: item.ownerAvatarUrl, width: 50, height: 50 }} />
        </View>

        <View style={styles.text}>
          <Text color={"textPrimary"} fontSize={"subheading"}>
            {item.fullName}
          </Text>
          <Text
            color={"textSecondary"}
            fontSize={"body"}
            style={{ justifyContent: "space-between" }}
          >
            {item.description}
          </Text>

          <Text
            color={"primary"}
            fontSize={"subheading"}
            fontWeight={"bold"}
            style={styles.language}
          >
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.rate}>
        <View style={styles.row}>
          <Text style={styles.item}>{item.stargazersCount}</Text>
          <Text style={styles.item}>{item.forksCount}</Text>
          <Text style={styles.item}>{item.reviewCount}</Text>
          <Text style={styles.item}>{item.ratingAverage}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.item}>Stars</Text>
          <Text style={styles.item}>Forks</Text>
          <Text style={styles.item}>Reviews</Text>
          <Text style={styles.item}>Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem
