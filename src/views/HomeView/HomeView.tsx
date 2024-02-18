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
import { getRandomInt, shuffle } from '../../utils/utils';
import * as commonStyle from '../../utils/commonStyle';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//@ts-ignore
import { connect, useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from '../../store/configureStore';
import { addPokemonToList, selectPokemonList } from '../../store/reducers/PokemonListSlice';


const HomeView = (props :any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [counterPokedex, setCounterPokedex] = useState(0);
  const [isDataReceived, setIsDataReceived] = useState(false);
    // const [arrayPokemonCaptured, setArrayPokemonCaptured] = useState<Pokemon[]>([]);
    const [listPoke, setListPoke] = useState<Pokemon[]>([]);
    const arrayPokemonCaptured = useSelector(selectPokemonList)
  const dispatch = useDispatch()

    const onCapturePokemon = () => {
      const currentPokemon = listPoke[counterPokedex];
      // setArrayPokemonCaptured(prevArray => [...prevArray, currentPokemon]);
      // console.log('Pokemon Captured: ', arrayPokemonCaptured);
      // const action = { type: 'ADD_TO_LIST_POKEMON', value: currentPokemon};
      // props.dispatch(action);
      dispatch(addPokemonToList(currentPokemon))
    }
    

    useEffect(() => {
      console.log('Pokemon Captured', arrayPokemonCaptured);
    }, [arrayPokemonCaptured]);
  console.log('Props: ', props);

  const getNamePokemon = (namePokemon: string) => {
    console.log('View details for', namePokemon);
    console.log('My neighbour is', listPoke[counterPokedex + 1]?.name || 'No neighbour');
  };


  const onViewPokemonDetails = (idPokemon: number, namePokemon: string, srcPokemon: string) => {
    props.navigation.navigate('Details', {
      id: idPokemon,
      name: namePokemon,
      src: srcPokemon,
      isReleasePossible : false 
    });
  }

  // const modifyLevel = () => {
  //   if (listPoke) {
  //     let newArr = [...listPoke];
  //     newArr[counterPokedex].level = listPoke[counterPokedex].level + 5;
  //     setListPoke(newArr);
  //   }
  // };

  const onNext = () => {
    if (listPoke && counterPokedex === listPoke.length - 1) {
      setCounterPokedex(0);
    } else if (listPoke) {
      setCounterPokedex(counterPokedex + 1);
    }
  };

  const onPrevious = () => {
    if (listPoke && counterPokedex === 0) {
      setCounterPokedex(listPoke.length - 1);
    } else if (listPoke) {
      setCounterPokedex(counterPokedex - 1);
    }
  };

  const fetchPokemon = () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    fetch(url)
      .then(response => response.json())
      .then(async (json) => {
        let res = []
        for (const [index, pokemonData] of json.results.entries()) {
          try {

            let indexPokedex = index + 1;
            let pokemonDetailsResponse = await fetch(pokemonData.url);
            let pokemonDetails = await pokemonDetailsResponse.json();
            let isMale = true; // Default to true if information about gender is not available
    
            // Check if gender information is available
            if (pokemonDetails.gender_rate !== -1) {
              isMale = Math.random() > 0.5; // Randomly set the gender based on the gender rate
            }
    
            let pokemon = {
              id: indexPokedex,
              level: getRandomInt(40, 80),
              isMale: isMale,
              src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${indexPokedex}.png`,
              ...pokemonData,
            };
    
            console.log('URL de l\'image pour', pokemon.name, ':', pokemon.src);
            console.log('Est un mâle ?', pokemon.isMale);
            res.push(pokemon)
          }
          catch {
            console.log('Error: ', {index, pokemonData});

          }
        }
        return res
      })
      .then((array: any[]) => {
        console.log(array, "hello end" )
        setListPoke(shuffle(array));
        setIsDataReceived(true);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };
  

console.log(isDataReceived, "you hou rtgrethe")
  useEffect(() => {
      fetchPokemon();
  }, [])

  return (
    <View style={styles.main_container}>
      <View style={styles.title_container}>
        <Text style={styles.text_title}>Pokédex Application</Text>
      </View>
      <View style={styles.pokemon_container}>
        {isDataReceived ? (
          <PokemonInfo
            id={listPoke[counterPokedex].id}
            name={listPoke[counterPokedex].name}
            level={listPoke[counterPokedex].level}
            isMale={listPoke[counterPokedex].isMale}
            src={listPoke[counterPokedex].src}
            onClickPokemon={onViewPokemonDetails}
          />
        ) : (
          <Text>This is loading</Text>
        )}
      </View>
      <View style={styles.button_container}>
        <TouchableOpacity style={styles.buttonNextPrevious} onPress={() => onPrevious()}>
          <Image source={require('../../assets/images/left-arrow.png')} style={styles.iconButton} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNextPrevious}   onPress={() => onCapturePokemon()}>
        <Image source={require('../../assets/images/pokeball.png')} style={styles.iconButton} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNextPrevious} onPress={() => onNext()}>
          <Image source={require('../../assets/images/right-arrow.png')} style={styles.iconButton} />
        </TouchableOpacity>
      </View>
      <Text>Length: {arrayPokemonCaptured.length}</Text>
    </View>
  ); 
};


const PokemonInfo = ({ id, name, level, isMale, src, onClickPokemon }: Pokemon) => {

  return (
    <>
      <Text style={styles.text_appeared}>A new Pokemon appeared !</Text>
      <TouchableOpacity
        onPress={() => onClickPokemon(id, name, src)}
      >
        <Image source={{uri: src}} style={styles.imagePokemon} />
      </TouchableOpacity>
      <Text>His name is {name}, his level is {level}.</Text>
      {isMale ? <Text>This is a male</Text> : <Text>This is a female</Text>}
    </>
  );
};



const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },

  title_container: {
    flex: 1,
    alignItems: 'center',
  },

  pokemon_container: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  text_title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'rgb(200, 0, 0)',
    marginTop: 30,
  },
  imagePokemon: {
    width: 200,
    height: 200,
  },

  iconButton: {
    width: 40,
    height: 40,
  },

  text_appeared: {
    marginBottom: 20,
    fontStyle: 'italic',
    fontSize: 18,
  },

  buttonNextPrevious: {
    ...commonStyle.elevationButton,
    ...commonStyle.roundedButton,
  },
});


export default HomeView;
