import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PokemonDetailsView = ({ route }) => {
  const { id, name, src } = route.params;
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchPokemonDetails();
  }, [id]);

  const fetchPokemonDetails = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      
      setHeight(data.height);
      setWeight(data.weight);
      setTypes(data.types.map(type => type.type.name));
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Details</Text>
      <Image source={{ uri: src }} style={styles.image} />
      <Text>ID: {id}</Text>
      <Text>Name: {name}</Text>
      {height !== null && <Text>Height: {height}</Text>}
      {weight !== null && <Text>Weight: {weight}</Text>}
      {types.length > 0 && (
        <Text>Types: {types.join(', ')}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 16,
  },
});

export default PokemonDetailsView;
