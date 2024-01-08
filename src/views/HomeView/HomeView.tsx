/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
    Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




function HomeView(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <View>
        <PokemonInfo name={'Pickachu'} level={17} isMale={true} src={require('../../assets/images/25.png')}/>
        <PokemonInfo name={'dracaufeu'} level={78} isMale={false} src={require('../../assets/images/6.png')}/>
    </View>
    
  );
}

type PokemonInfoType ={
    name :string;
    level : number;
    isMale : boolean;
    src : any;
}
const PokemonInfo = ({name,level,isMale,src}:PokemonInfoType) => {
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
