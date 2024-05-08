import React, { useRef } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { FontFamily } from "../GlobalStyles";
import { useFavorites } from '../components/FavoritesContext'; // Ensure the path is correct

const Description4 = ({ route, navigation }) => {
  const { drill } = route.params; // Assuming drill data is passed correctly
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some(favorite => favorite.id === drill.id);
  const scaleAnimation = useRef(new Animated.Value(1)).current; // Correct usage of Animated.Value

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(drill.id);
    } else {
      addFavorite(drill);
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnimation, {
      toValue: 0.9,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, {backgroundColor: '#FFD31D'}]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Icon name={isFavorite ? "heart" : "heart-outline"} size={40} color={isFavorite ? "red" : "black"} />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <TouchableWithoutFeedback onPress={toggleFavorite} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <Animated.View style={[styles.imageBorder, { transform: [{ scale: scaleAnimation }] }]}>
            <Image
              source={require('../assets/4.jpg')}
              style={styles.image}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.title, { fontFamily: FontFamily.poppinsBold, fontSize: 30 }]}>CROSSOVER</Text>
        <Text style={styles.drillInfo}>
          It's used to evade defenders and create scoring opportunities.
          Effective crossovers require precise timing, agility, and ball control, often dazzling spectators with their speed and fluidity.
        </Text>
        <View style={styles.separator} />
        <Text style={styles.tipsTitle}>TIPS:</Text>
        <Text style={styles.tip}>• Quick Hand Transfer: Rapidly move the ball from one hand to the other close to the ground.</Text>
        <Text style={styles.tip}>• Deceptive Body Movement: Use body feints to sell the fake and create space for your drive.</Text>
        <Text style={[styles.tipsTitle, { fontFamily: 'Poppins-Bold', fontSize: 25 }]}>WORKOUT PLAN</Text>
        <Text style={[styles.tipsTitle, { fontFamily: 'Poppins-Bold' }]}>From Left Hand to Right Hand:</Text>
        <Text style={[styles.tip, { fontFamily: 'Poppins-Bold' }]}>• 2-3 reps</Text>
        <Text style={[styles.tip, { fontFamily: 'Poppins-Bold' }]}>• 1 Minute per reps.</Text>
        <Text style={[styles.tip, { fontFamily: 'Poppins-Bold' }]}>• First Rep: Slow</Text>
        <Text style={[styles.tip, { fontFamily: 'Poppins-Bold' }]}>• 2nd Rep: Mid Fast - with hard pounding dribble</Text>
        <Text style={[styles.tip, { fontFamily: 'Poppins-Bold' }]}>• 3rd Rep: Fast - with hard pounding dribble above the shoulder</Text>
        <Text style={[styles.tipsTitle, { fontFamily: 'Poppins-Bold' }]}>From Right Hand to Left Hand:</Text>
        <Text style={[styles.tip, { fontFamily: 'Poppins-Bold' }]}>• 2-3 reps</Text>
        <Text style={[styles.tip, { fontFamily: 'Poppins-Bold' }]}>• 1 Minute per reps.</Text>
        <Text style={[styles.tip, { fontFamily: 'Poppins-Bold' }]}>• First Rep: Slow</Text>
        <Text style={[styles.tip, { fontFamily: 'Poppins-Bold' }]}>• 2nd Rep: Mid Fast - with hard pounding dribble</Text>
        <Text style={[styles.tip, { fontFamily: 'Poppins-Bold' }]}>• 3rd Rep: Fast - with hard pounding dribble above the shoulder</Text>
        <View style={styles.gifContainer}>
          <View style={styles.gifBorder}>
            <Image
              source={require('../assets/crossover.gif')}
              style={styles.gif}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 3,
    backgroundColor: '#ffffff',
    borderBottomColor: '#eee',
    borderBottomWidth: 2, 
    borderBottomColor: '#ccc', 
    elevation: 0, 
  },
  backButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 16,
  },
  favoriteButton: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageBorder: {
    borderWidth: 4,
    borderColor: '#ddd',
    borderRadius: 100, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 175, 
    height: 175, 
    borderRadius: 100, 
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    
  },
  drillInfo: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: FontFamily.poppinsBold,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tip: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 15,
    fontFamily: FontFamily.poppinsBold,
    color: "#444",
  },
  gifContainer: {
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 50,
  },
  gifBorder: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  gif: {
    width: 300,
    height: 500,
    borderRadius: 8,
  },
});

export default Description4;
