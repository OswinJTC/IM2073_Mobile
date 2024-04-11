import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LevelScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Quiz Difficulty</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
    color: '#fff',
  },
  backButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 18,
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
