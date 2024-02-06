import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { listPokeOriginal } from '../../data/Pokemon.List';

const MyPokemonView = ({ navigation }: any) => {

  const onViewPokemonDetails = (idPokemon: number, namePokemon: string, srcPokemon: string) => {
    navigation.navigate('Details', {
      id: idPokemon,
      name: namePokemon,
      src: srcPokemon
    });
  };

  return (
    <View> 
      <Text style={styles.listTitle}>This is my list of Pokemon</Text>
      <FlatList
        data={listPokeOriginal}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonItem pokemon={item} onViewPokemonDetails={onViewPokemonDetails} />
        )}
      />
    </View>
  );
};

const PokemonItem = ({ pokemon, onViewPokemonDetails }: any) => {
  return (
    <TouchableOpacity onPress={() => onViewPokemonDetails(pokemon.id, pokemon.name, pokemon.src)}>
      <View style={styles.main_container}>
        <Image style={styles.image} source={{ uri: pokemon.src }} />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{pokemon.name}</Text>
          </View>
          <View>
            <Text style={styles.level_text}>Level: {pokemon.level}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  main_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 30,
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  level_text: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 12,
    color: '#666666',
  },
});

export default MyPokemonView;
