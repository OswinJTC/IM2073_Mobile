import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground  } from 'react-native';

const LevelScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://media.istockphoto.com/id/609077324/vector/seamless-question-mark-background.jpg?s=612x612&w=0&k=20&c=WY5eo1mwbGFv0rhKr6JoHRDVjm1r3JZSXXqbpxUMaUg=' }}
      style={[styles.background, { opacity: 0.8 }]}
    >
    <View style={styles.container}>
      <Text style={styles.title}>¿ How Confident Are You ?</Text>
      <TouchableOpacity
        style={[styles.button, styles.easy]}
        onPress={() => navigation.navigate('EMcq')}>
        <Text style={styles.buttonText}>Easy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.medium]}
        onPress={() => navigation.navigate('MMcq')}>
        <Text style={styles.buttonText}>Medium</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.hard]}
        onPress={() => navigation.navigate('HMcq')}>
        <Text style={styles.buttonText}>Hard</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>Back to Welcome</Text>
            </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#011627', 
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#011627',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  backButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: '#011627',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  easy: {
    backgroundColor: '#78C850', // Light green
  },
  medium: {
    backgroundColor: '#F7D02C', // Amber
  },
  hard: {
    backgroundColor: '#C22E28', // Red
  },
});

export default LevelScreen;
