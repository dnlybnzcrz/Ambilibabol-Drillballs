import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, FlatList, SafeAreaView, TextInput, Animated, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { FontFamily, Bold } from "../GlobalStyles";
import { useFavorites } from '../components/FavoritesContext';


const Tab = createBottomTabNavigator();

const drillsData = [
  { id: '1', name: 'One hand Dribbling', image: require('../assets/1.jpg') },
  { id: '2', name: 'Between the Legs', image: require('../assets/2.jpg') },
  { id: '3', name: 'Behind the Back', image: require('../assets/3.jpg') },
  { id: '4', name: 'Crossover', image: require('../assets/4.jpg') },
  { id: '5', name: 'Shooting', image: require('../assets/chief.jpg') },
  { id: '6', name: 'Lay-up', image: require('../assets/6.jpg') },
  { id: '7', name: 'Floater', image: require('../assets/7.jpg') },
  { id: '8', name: 'Overhead Pass', image: require('../assets/8.jpg') },
  { id: '9', name: 'Chest Pass', image: require('../assets/chestpass.jpg') },
  { id: '10', name: 'Bounce Pass', image: require('../assets/10.jpg') },
];

const DrillsScreen = ({ navigation }) => {

  useEffect(() => {
    navigation.setOptions({ 
      headerTitle: 'LIST OF DRILLS',
      headerStyle: {
        backgroundColor: '#FFD31D', 
        borderBottomWidth: 2, 
        borderBottomColor: '#ccc', 
        elevation: 0, 
        height: 101,
      },
      headerTintColor: 'black', 
      headerTitleStyle: {
        fontFamily: FontFamily.poppinsBold, 
        fontSize: 24, 
      },
      headerTitleAlign: 'center', 
    });
  }, []);
  
  const animation = useRef(new Animated.Value(0)).current;

  const handleTabPress = (index) => {
    Animated.spring(animation, {
      toValue: index,
      useNativeDriver: true,
    }).start();
  };

  const handlePressIn = (scaleAnimation) => {
    Animated.spring(scaleAnimation, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scaleAnimation) => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getNavigationTarget = (drillName) => {
    switch (drillName) {
      case "One hand Dribbling":
        return 'Description';
      case "Between the Legs":
        return 'Description2';
      case "Behind the Back":
        return 'Description3';
      case "Crossover":
        return 'Description4';
      case "Shooting":
        return 'Description5';
      case "Lay-up":
        return 'Description6';
      case "Floater":
        return 'Description7';
      case "Overhead Pass":
        return 'Description8';
      case "Chest Pass":
        return 'Description9';
      case "Bounce Pass":
        return 'Description10';
      default:
        return 'Description'; 
    }
  };

  const renderDrill = ({ item }) => {
    const scaleAnimation = new Animated.Value(1);

    return (
      <TouchableOpacity
        style={styles.drillCard}
        onPress={() => {
          console.log(`Pressed ${item.name}`);
          navigation.navigate(getNavigationTarget(item.name), { drill: item });
        }}
        onPressIn={() => handlePressIn(scaleAnimation)}
        onPressOut={() => handlePressOut(scaleAnimation)}
      >
        <Animated.Image
          source={item.image}
          style={[styles.image, { transform: [{ scale: scaleAnimation }] }]}
        />
        <Text style={[styles.text, { fontFamily: FontFamily.poppinsBold }]}>
  {item.name}
</Text>

      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={drillsData}
        renderItem={renderDrill}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(drillsData);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ 
      headerTitle: 'SEARCH',
      headerStyle: {
        backgroundColor: '#FFD31D', 
        borderBottomWidth: 2, 
        borderBottomColor: '#ccc', 
        elevation: 0, 
        height: 101,
      },
      headerTintColor: 'black', 
      headerTitleStyle: {
        fontFamily: FontFamily.poppinsBold, 
        fontSize: 24, 
      },
      headerTitleAlign: 'center', 
    });
  }, []);

  const getNavigationTarget = (drillName) => {
    switch (drillName) {
      case "One hand Dribbling":
        return 'Description';
      case "Between the Legs":
        return 'Description2';
      case "Behind the Back":
        return 'Description3';
      case "Crossover":
        return 'Description4';
      case "Shooting":
        return 'Description5';
      case "Lay-up":
        return 'Description6';
      case "Floater":
        return 'Description7';
      case "Overhead Pass":
        return 'Description8';
      case "Chest Pass":
        return 'Description9';
      case "Bounce Pass":
        return 'Description10';
      default:
        return 'Description'; 
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setResults(drillsData);
      return;
    }
    const filteredResults = drillsData.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filteredResults);
  };

    return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.inputContainer}>
        <Icon name="search-outline" size={30} color="black" style={styles.iconStyle} />
        <TextInput
          style={[styles.input, { fontFamily: FontFamily.poppinsBold, fontSize: 18 }]}
          onChangeText={handleSearch}
          value={searchQuery}
          placeholder="Search drills..."
          clearButtonMode="always"
          placeholderTextColor="black"
        />
      </View>
      {results.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No drills found</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate(getNavigationTarget(item.name), { drill: item });
              }}
            >
              <Image source={item.image} style={styles.thumbnail} />
              <Text style={[styles.text2, { fontFamily: FontFamily.poppinsBold, fontSize: 20 }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

const FavoritesScreen = ({ navigation }) => {
  const { favorites, removeFavorite } = useFavorites();
  const scaleValue = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    navigation.setOptions({ 
      headerTitle: 'LIST OF FAVORITES',
      headerStyle: {
        backgroundColor: '#FFD31D', 
        borderBottomWidth: 2, 
        borderBottomColor: '#ccc', 
        elevation: 0, 
        height: 101,
      },
      headerTintColor: 'black', 
      headerTitleStyle: {
        fontFamily: FontFamily.poppinsBold, 
        fontSize: 24, 
      },
      headerTitleAlign: 'center', 
    });
  }, []);

  const handleRemoveFavorite = (id) => {
    removeFavorite(id);
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const getNavigationTarget = (drillName) => {
    // Mapping drill names to screen names
    const drillScreenMap = {
      "One hand Dribbling": 'Description',
      "Between the Legs": 'Description2',
      "Behind the Back": 'Description3',
      "Crossover": 'Description4',
      "Shooting": 'Description5',
      "Lay-up": 'Description6',
      "Floater": 'Description7',
      "Overhead Pass": 'Description8',
      "Chest Pass": 'Description9',
      "Bounce Pass": 'Description10',
    };
    // Return the screen name based on the drill name
    return drillScreenMap[drillName] || 'Description'; // Default to 'Description' if not found
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        const targetScreen = getNavigationTarget(item.name);
        navigation.navigate(targetScreen, { drill: item });
      }}
      style={styles.itemContainer}
    >
      <Image source={item.image} style={styles.thumbnail2} />
      <View style={styles.textContainer}>
        <Text style={[styles.text3, { fontFamily: FontFamily.poppinsBold }]}>
          {item.name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveFavorite(item.id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.heartButton}
      >
        <Animated.View style={[styles.heartIcon, { transform: [{ scale: scaleValue }] }]}>
          <Icon name="heart" size={30} color="red" />
        </Animated.View>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Render message component if favorites array is empty
  const renderEmptyFavorites = () => (
    <View style={styles.emptyFavoritesContainer}>
      <Text style={styles.emptyFavoritesText}>No favorites found</Text>
    </View>
  );
  
  

  return (
    <SafeAreaView style={styles.container}>
      {favorites.length === 0 ? (
        renderEmptyFavorites()
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavoriteItem}
        />
      )}
    </SafeAreaView>
  );
};


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: [{ display: 'flex', paddingTop: 5, backgroundColor: '#FFD31D', borderTopWidth: 2, borderBottomColor: 'black', elevation: Platform.OS === 'android' ? 0 : 0, shadowOpacity: Platform.OS === 'ios' ? 0 : 0, height: Platform.OS === 'android' ? 60 : 90 }, null], // Apply tabBarOptions style with increased height and platform-specific elevation and shadowOpacity
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Drills') {
            iconName = focused ? 'basketball' : 'basketball-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black', // Apply tabBarOptions activeTintColor
        tabBarInactiveTintColor: 'black', // Apply tabBarOptions inactiveTintColor
        tabBarLabelStyle: { fontSize: 15, marginBottom: 1, fontFamily: FontFamily.poppinsBold, color: 'black'}, // Apply tabBarOptions labelStyle
      })}
    >
      <Tab.Screen name="Drills" component={DrillsScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  contentContainer: {
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  drillCard: {
    margin: 18,
    elevation: 15,
    borderRadius: 10,
    overflow: 'hidden',
    width: 170,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 150,
    height: 140,
    borderRadius: 10,
  },
  text: {
    padding: 10,
    fontSize: 15,
    color: 'black',
  },
  text2: {
    paddingTop: 30,
    paddingLeft: 50,
    fontSize: 15,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    padding: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    padding: 5,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },

  item2: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  text3: {
    marginLeft: 10,
    fontSize: 20,
    color: 'black',
  },
  textContainer: {
    width: 210,
  },
  heartButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  heartIcon: {
    padding: 10,
    borderRadius: 20,
  },
  thumbnail2: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  emptyFavoritesText: {
    fontFamily: FontFamily.poppinsBold,
    fontSize: 24,
    color: 'black',
    textAlign: 'center',

  },
  emptyFavoritesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontFamily: FontFamily.poppinsBold,
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
});

export default BottomTabNavigator;

