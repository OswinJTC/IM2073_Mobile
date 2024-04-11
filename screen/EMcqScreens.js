import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet } from 'react-native'; // Import StyleSheet
import api from '../api/axiosConfig';

const EMcqScreens = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get(`/questionApi/questionsByLevel/Easy`);
        const fetchedQuestions = response.data;
        setQuestions(fetchedQuestions);
        if (fetchedQuestions.length > 0) {
          const randomQuestion = fetchedQuestions[Math.floor(Math.random() * fetchedQuestions.length)];
          setCurrentQuestion(randomQuestion);
        }
      } catch (error) {
        console.error("Failed to fetch questions", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionPress = (optionText) => {
    setSelectedOption(optionText);
    setIsCorrect(currentQuestion?.answer === optionText);
  };

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading questions...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Text style={styles.question}>{currentQuestion?.description}</Text>
        </View>
  
        {[1, 2, 3, 4].map(option => (
          <TouchableOpacity key={option} style={styles.optionButton} onPress={() => handleOptionPress(String(option))}>
            <Text style={styles.optionText}>{currentQuestion[`option${option}`]}</Text>
          </TouchableOpacity>
        ))}

        {selectedOption && (
          <View style={styles.feedback}>
            <Text style={[styles.feedbackText, {color: isCorrect ? '#4CAF50' : '#F44336'}]}>
              {isCorrect ? "Correct Answer!" : "Wrong Answer. Try Again!"}
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>Back to Welcome</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  content: {
    padding: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  optionButton: {
    backgroundColor: '#FFF',
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    color: '#555',
  },
  feedback: {
    marginTop: 20,
  },
  feedbackText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
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
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default EMcqScreens;
