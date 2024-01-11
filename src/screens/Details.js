import React, { useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { backgroundColors, colors } from "../colors";
import { ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Details = ({ route }) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const { data, bg } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColors[bg] }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Pokémon Details</Text>
      </View>

      {/* Content */}
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            }}
            style={{ width: 200, height: 200 }}
          />
          <Text style={styles.textStyle}>Name: {data.name}</Text>

          <View style={styles.boxContainer}>
            <Text style={styles.textStyle}>Ability</Text>
            {data.abilities.map((poke) => (
              <View key={poke.ability.name}>
                <Text style={{ color: colors[bg], fontSize: 25 }}>{poke.ability.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.boxContainer}>
            <Text style={styles.textStyle}>Stats</Text>
            {data.stats.map((poke) => (
              <View key={poke.stat.name} style={{ marginBottom: 10 }}>
                <Text style={{ color: colors[bg], fontSize: 25 }}>
                  {poke.stat.name}: {poke.base_stat}
                </Text>
                <ProgressBar
                  progress={poke.base_stat / 200} // Assuming a max value of 100
                  color={colors[bg]}
                  style={{ height: 10, width: "80%", marginTop: 5 }}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#EF5350",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#B71C1C",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    padding: 20,
    color: "white",
    margin: 10,
    height: "100%", // Set height to 100% to take the whole screen
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#1B1212",
  },
  boxContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});

export default Details;
