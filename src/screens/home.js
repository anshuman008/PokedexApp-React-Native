import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import Card from "./Card";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const pokePath = "https://pokeapi.co/api/v2/";




export default function Home() {
  const navigator = useNavigation();

  const [offset,setOffset] = useState(0);

  let limit = `pokemon?limit=10&offset=${offset}`;

  let firstGenPokemon = pokePath + limit;

  useLayoutEffect(() => {
    navigator.setOptions({
      headerShown: false,
    });
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(firstGenPokemon).then((res) => {
      setData(res.data.results);
    });
  }, [offset]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Pokédex</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {data.map((item, index) => (
          <Card key={index} item={item} />
        ))}

<View style={{flexDirection:"row"}}>
  <Pressable style={styles.buttonStyle} onPress={()=>{
     
     if(offset>=10) setOffset(offset-10);

  }}><Text>Prev</Text></Pressable>
  <Pressable style={styles.buttonStyle} onPress={()=>{setOffset(offset+10)}}><Text>Next</Text></Pressable>
</View>
       

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#EF5350", // You can use any color you like
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
  scrollViewContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  buttonStyle:{
    backgroundColor:"#03C03C",
    height:30,
    width:70,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
    marginBottom:15,
    marginLeft:20
  }
});
