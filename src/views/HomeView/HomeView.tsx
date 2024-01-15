/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  Button,
  FlatList,
    Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

 
import { Pokemon } from '../../models/Pokemon';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { listPoke } from '../../data/Pokemon.List';




function HomeView(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [counterPokedex, setCounterPokedex] = useState(0);

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
  };
  return (
    <View>
      <Text>
        The value of counter is : {counterPokedex}
      </Text>
      <Button
        title="Next"
        onPress={() => onNext()}
      />
      <Button
        title="Previous"
        onPress={() => onPrevious()}
      />
      <PokemonInfo
        id={listPoke[counterPokedex].id}
        name={listPoke[counterPokedex].name}
        level={listPoke[counterPokedex].level}
        isMale={listPoke[counterPokedex].isMale}
        src={listPoke[counterPokedex].src}
      />
    </View>
  );
  
  }


const PokemonInfo = ({name,level,isMale,src}:Pokemon) => {
    return(
        <View>

            <Text>This is a pokemon</Text>
            <Text>his name is {name}</Text>
            <Text>his level is {level}</Text>
            {isMale ? 
            <Text>his sex is a male</Text>
            : <Text>his sex is a female</Text>}
            <Image  source={src} style={styles.ImagePokemon}/>
        </View>
    )
}


const styles = StyleSheet.create({
    ImagePokemon: {
      width: 200,
      height:200,
    },
    })
export default HomeView;
function setCounterPokedex(arg0: number) {
  throw new Error('Function not implemented.');
}

