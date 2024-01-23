import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PokemonDetailsView = ({ route }) => {
  const { id, name, src } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Details</Text>
      <Text>ID: {id}</Text>
      <Text>Name: {name}</Text>
      <Image source={{ uri: src }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default PokemonDetailsView;
