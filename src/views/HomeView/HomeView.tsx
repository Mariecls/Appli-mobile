/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

import { Pokemon } from '../../models/Pokemon';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { listPokeOriginal } from '../../data/Pokemon.List';
import * as commonStyle from '../../utils/commonStyle';
function HomeView(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [counterPokedex, setCounterPokedex] = useState(0);
  const [listPoke, setListPoke] = useState([...listPokeOriginal]);

  const getNamePokemon = (namePokemon: string) => {
    console.log('View details for', namePokemon);
    console.log('My neighbour is', listPoke[counterPokedex + 1]?.name || 'No neighbour');
  };

  const modifyLevel = () => {
    let newArr = [...listPoke]; // copying the old datas array
    newArr[counterPokedex].level = listPoke[counterPokedex].level + 5;
    setListPoke(newArr);
  }
  const onNext = () => {
    if (counterPokedex === listPoke.length - 1) {
      setCounterPokedex(0);
    } else {
      setCounterPokedex(counterPokedex + 1);
    }
  };

  const onPrevious = () => {
    if (counterPokedex === 0) {
      setCounterPokedex(listPoke.length - 1);
    } else {
      setCounterPokedex(counterPokedex - 1);
    }
  }; return (
    <View  style = {styles.main_container}>
      <View style = {styles.title_container} >
     <Text style={styles.text_title}>Pokédex Application</Text>
     </View>
     <View style = {styles.pokemon_container}>

     
      <PokemonInfo
        id={listPoke[counterPokedex]?.id}
        name={listPoke[counterPokedex]?.name}
        level={listPoke[counterPokedex]?.level}
        isMale={listPoke[counterPokedex]?.isMale}
        src={listPoke[counterPokedex]?.src}
        OnClickPokemon={modifyLevel}
      />
      </View>
       <View style = {styles.button_container}>

       <TouchableOpacity
            style={styles.buttonNextPrevious}
            onPress={() => onPrevious()}
            >
              <Image source={require('../../assets/images/left-arrow.png')} style={styles.iconButton} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonNextPrevious}
            onPress={() => onNext()}
            >
              <Image source={require('../../assets/images/right-arrow.png')} style={styles.iconButton} />
          </TouchableOpacity>
      </View>
    </View>
  );
};

const PokemonInfo = ({ name, level, isMale, src, OnClickPokemon }: Pokemon) => {
  return (
    <>
      <Text style={styles.text_appeared}> A new Pokemon appared !</Text>
      <TouchableOpacity onPress={() => OnClickPokemon?.()}>
        <Image source={src} style={styles.imagePokemon} />
      </TouchableOpacity>
      <Text>His name is {name}, his level is {level}.</Text>
      {isMale ? <Text>This is a male</Text> : <Text>This is a female</Text>}
    </>
  );
};


const styles = StyleSheet.create({
  main_container: {
      flex: 1
  },

  title_container: {
    flex: 1,
    alignItems: 'center'
  },

  pokemon_container: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center'
  },

  button_container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around'
  },

  text_title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'rgb(200, 0, 0)',
    marginTop:  30
  },
  imagePokemon: {
    width: 200,
    height: 200,
  },

  iconButton: {
    width: 40,
    height: 40
  },

  text_appeared: {
    marginBottom: 20,
    fontStyle: 'italic',
    fontSize: 18
  },

 // @ts-ignore
 buttonNextPrevious: {
  ...commonStyle.elevationButton,
  ...commonStyle.roundedButton
}
});

export default HomeView;