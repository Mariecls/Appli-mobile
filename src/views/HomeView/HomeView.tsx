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
    <View>
      <Text>The value of counter is: {counterPokedex}</Text>
      <Button title="Next" onPress={() => onNext()} />
      <Button title="Previous" onPress={onPrevious} />
      <PokemonInfo
        id={listPoke[counterPokedex]?.id}
        name={listPoke[counterPokedex]?.name}
        level={listPoke[counterPokedex]?.level}
        isMale={listPoke[counterPokedex]?.isMale}
        src={listPoke[counterPokedex]?.src}
        OnClickPokemon={modifyLevel}
      />
    </View>
  );
};

const PokemonInfo = ({ name, level, isMale, src, OnClickPokemon }: Pokemon) => {
  return (
    <View>
      <Text>This is a Pokemon</Text>
      <Text>His name is {name}, his level is {level}.</Text>
      {isMale ? <Text>This is a male</Text> : <Text>This is a female</Text>}
      <TouchableOpacity onPress={() => OnClickPokemon?.()}>
        <Image source={src} style={styles.imagePokemon} />
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  imagePokemon: {
    width: 200,
    height: 200,
  },
});

export default HomeView;