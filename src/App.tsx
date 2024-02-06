/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
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
import HomeView from './views/HomeView/HomeView';
import TestView from './views/TestView/TestView';
import { NavigationContainer } from '@react-navigation/native';
import PokemonDetailsView from './views/PokemonDetailsView/PokemonDetailsView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPokemonView from './views/MyPokemonView/MyPokemonView';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';




const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeView} options={{ title: '' }} />
      <HomeStack.Screen name="Details" component={PokemonDetailsView} options={{ title: 'Characteristics of the Pokemon' }} />
    </HomeStack.Navigator>
  );
}

const MyPokemonStack = createNativeStackNavigator();

function MyPokemonStackScreen() {
  return (
    <MyPokemonStack.Navigator>
      <MyPokemonStack.Screen name="MyPokemon" component={MyPokemonView}  options={{ title: 'My Pokemon Team' }} />
      <MyPokemonStack.Screen name="Details" component={PokemonDetailsView} options={{ title: 'Characteristics of the Pokemon' }} />
    </MyPokemonStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}


  function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                return <FontAwesomeIcon name="home" size={size} color={color} />;
              } else if (route.name === 'MyPokemon') {
                return <MaterialCommunityIcons name="pokeball" size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen} 
            options={{
              title: 'Home',
            }}
          />
          <Tab.Screen
            name="MyPokemon"
            component={MyPokemonStackScreen} 
            options={{
              title: 'My Pokemon',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;