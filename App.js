import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from "expo-font";
import { FavoritesProvider } from './components/FavoritesContext'; // Import FavoritesProvider
import DrillScreen from './components/drills';
import Description from './components/description';
import Description2 from './components/description2';
import Description3 from './components/description3';
import Description4 from './components/description4';
import Description5 from './components/description5';
import Description6 from './components/description6';
import Description7 from './components/description7';
import Description8 from './components/description8';
import Description9 from './components/description9';
import Description10 from './components/description10';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    // You can return a loading indicator here if you want
    return null;
  }

  return (
    <FavoritesProvider> 
      <NavigationContainer> 
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Drills" component={DrillScreen} />
          <Stack.Screen name="Description" component={Description} />
          <Stack.Screen name="Description2" component={Description2} />
          <Stack.Screen name="Description3" component={Description3} />
          <Stack.Screen name="Description4" component={Description4} />
          <Stack.Screen name="Description5" component={Description5} />
          <Stack.Screen name="Description6" component={Description6} />
          <Stack.Screen name="Description7" component={Description7} />
          <Stack.Screen name="Description8" component={Description8} />
          <Stack.Screen name="Description9" component={Description9} />
          <Stack.Screen name="Description10" component={Description10} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}

function HomeScreen({ navigation }) {
  const [fadeAnim] = useState(new Animated.Value(0));

  const handlePress = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }
    ).start(() => {
      navigation.navigate('Drills');
    });
  };

  return (
    <ImageBackground 
      source={require('./assets/home.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity 
          style={[styles.button, { opacity: fadeAnim }]}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFD31D'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: windowHeight * 0.1, 
    marginLeft: 40,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.8, 
    height: windowHeight * 0.07, 
  },
  buttonText: {
    fontFamily: "Poppins-Bold", 
    fontSize: 22,
    fontWeight: '400',
    color: 'white',
  },
});
