// screens/McqScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

const McqScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = "What is the capital of France?";
  const options = [
    { id: 1, text: "Paris", isCorrect: true },
    { id: 2, text: "London", isCorrect: false },
    { id: 3, text: "Berlin", isCorrect: false },
  ];

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setIsCorrect(option.isCorrect);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.option, selectedOption?.id === option.id && { backgroundColor: '#dedede' }]}
          onPress={() => handleOptionPress(option)}
        >
          <Text style={styles.optionText}>{option.text}</Text>
        </TouchableOpacity>
      ))}
      {selectedOption && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.answerText}>
            {isCorrect ? "Correct Answer!" : "Wrong Answer. Try Again!"}
          </Text>
          <Button
            title="Back to Welcome"
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
  },
  feedbackContainer: {
    marginTop: 20,
  },
  answerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default McqScreen;
