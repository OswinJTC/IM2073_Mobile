// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://media.istockphoto.com/id/609077324/vector/seamless-question-mark-background.jpg?s=612x612&w=0&k=20&c=WY5eo1mwbGFv0rhKr6JoHRDVjm1r3JZSXXqbpxUMaUg=' }}
      style={styles.background}
      imageStyle={{ opacity: 0.80 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Are you ready for a QUIZ?!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Level')}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#011627', 
    fontFamily: 'serif',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#E71D36',
    padding: 10,
    borderRadius: 5,
  },
  bottomButton: {
    backgroundColor: '#E71D36',
    padding: 10,
    borderRadius: 5,
    margin: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonText: {
    color: '#fdfffc',
    fontSize: 16,
    fontFamily: 'serif',
  },
});

//System Arial Helvetica Georgia TimesNewRoman CourierNew

export default WelcomeScreen;

