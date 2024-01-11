import { View, Text, Image, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const pokeUrl = 'https://pokeapi.co/api/v2/pokemon/';
import { backgroundColors } from "../colors";

// Import all the type images
import BugImage from '../Icons/bug.png';
import DarkImage from '../Icons/dark.png';
import DragonImage from '../Icons/dragon.png';
import ElectricImage from '../Icons/electric.png';
import FairyImage from '../Icons/fairy.png';
import FightingImage from '../Icons/fighting.png';
import FireImage from '../Icons/fire.png';
import FlyingImage from '../Icons/flying.png';
import GhostImage from '../Icons/ghost.png';
import GrassImage from '../Icons/grass.png';
import GroundImage from '../Icons/ground.png';
import IceImage from '../Icons/ice.png';
import NormalImage from '../Icons/normal.png';
import PoisonImage from '../Icons/poison.png';
import PsychicImage from '../Icons/psychic.png';
import RockImage from '../Icons/rock.png';
import SteelImage from '../Icons/steel.png';
import WaterImage from '../Icons/water.png';

const typeImages = {
  bug: BugImage,
  dark: DarkImage,
  dragon: DragonImage,
  electric: ElectricImage,
  fairy: FairyImage,
  fighting: FightingImage,
  fire: FireImage,
  flying: FlyingImage,
  ghost: GhostImage,
  grass: GrassImage,
  ground: GroundImage,
  ice: IceImage,
  normal: NormalImage,
  poison: PoisonImage,
  psychic: PsychicImage,
  rock: RockImage,
  steel: SteelImage,
  water: WaterImage,
  // Add other types here...
};

const Card = ({ item }) => {
  const navigator = useNavigation();
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`${pokeUrl}${item.name}`);
        setTypes(response.data.types);
        setImageUrl(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setError(error);
      }
    };

    fetchPokemonData();
  }, [item.name]);

  if (error) {
    return null;
  }

  const bg = types[0]?.type?.name;
  const fly = backgroundColors[bg];
  
  return (
    <Pressable onPress={() => { navigator.navigate('Detail', { data: data,bg:bg}) }}>
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: fly, width: 350, height: 150, borderRadius: 10, justifyContent: "space-between", margin: 20,paddingLeft:10 }}>

        <View style={styles.DetailStyle}>
          <Text>#00{data?.id}</Text>

          <Text style={styles.textStyle}>{item.name}</Text>
          <View style={{flexDirection:"row"}}>
                {
            types.map((pok) => {
              const typePok = pok.type.name.toLowerCase();
              return <Image key={pok.slot} source={typeImages[typePok]} style={{ width: 60 ,margin:5}} />;
            })
          }
          </View>
      
      
        </View>

        <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200, top: -20, right: -20 }} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    backgroundColor: "grey",
    color: "white",
    margin: 10,
    height: 300,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  DetailStyle: {
    marginRight: 10
  },
  textStyle: {
    fontSize: 20,
    color: "white"
  }
});

export default Card;
