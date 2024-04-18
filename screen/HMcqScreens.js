import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import api from '../api/axiosConfig';
import ProgressBar from 'react-native-progress/Bar';

const HMcqScreens = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [historyData, setHistoryData] = useState({});   

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get(`/questionApi/questionsByLevel/Hard`);
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

  const updateHistoryData = async (question, optionText) => {
    try {
        // Fetch the current history for the question
        const currentHistoryResponse = await api.get(`/historyApi/getHistory/${question.id}`);
        const currentHistory = currentHistoryResponse.data;

        // Construct the payload with updated counts
        const payload = {
            questionId: question.id,
            countA: optionText === "1" ? currentHistory.countA + 1 : currentHistory.countA,
            countB: optionText === "2" ? currentHistory.countB + 1 : currentHistory.countB,
            countC: optionText === "3" ? currentHistory.countC + 1 : currentHistory.countC,
            countD: optionText === "4" ? currentHistory.countD + 1 : currentHistory.countD
        };

        // Send the PUT request to update the history
        await api.put('/historyApi/updateHistory', payload);

        // Optionally refetch all history to keep the UI up to date
        fetchHistory(question.id); // Ensure fetchHistory properly updates your local state or UI
    } catch (error) {
        console.error('Error updating history:', error);
    }
};



  const fetchHistory = async () => {
    try {
      const response = await api.get('/historyApi/allHistories');
      const histories = response.data;
      const questionHistory = histories.find(h => h.questionId === currentQuestion.id);
      setHistoryData(questionHistory || {});
      return !!questionHistory;
    } catch (error) {
      console.error('Failed to fetch history', error);
      return false;
    }
  };

  const handleOptionPress = (optionText) => {
    setSelectedOption(optionText);
    setIsCorrect(currentQuestion?.answer === optionText);
    updateHistoryData(currentQuestion, optionText);
  };

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading questions...</Text>
      </SafeAreaView>
    );
  }

const totalResponses = historyData.countA + historyData.countB + historyData.countC + historyData.countD;
const percentageA = totalResponses > 0 ? (historyData.countA || 0) / totalResponses : 0;
const percentageB = totalResponses > 0 ? (historyData.countB || 0) / totalResponses : 0;
const percentageC = totalResponses > 0 ? (historyData.countC || 0) / totalResponses : 0;
const percentageD = totalResponses > 0 ? (historyData.countD || 0) / totalResponses : 0;


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Text style={styles.question}>{currentQuestion?.description}</Text>
        </View>
        
        {[1, 2, 3, 4].map((option, index) => (
          <View key={option} style={styles.optionContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionPress(String(option))}>
              <Text style={styles.optionText}>{currentQuestion[`option${option}`]}</Text>
            </TouchableOpacity>
            {selectedOption && (
              <>
                <ProgressBar
                  progress={index === 0 ? percentageA : index === 1 ? percentageB : index === 2 ? percentageC : percentageD}
                  color="#007AFF"
                  height={20}
                />
                <Text style={styles.percentageText}>
                  {`${Math.round((index === 0 ? percentageA : index === 1 ? percentageB : index === 2 ? percentageC : percentageD) * 100)}%`}
                </Text>
              </>
            )}
          </View>
        ))}

        {selectedOption && (
          <View style={styles.feedback}>
            <Text style={[styles.feedbackText, {color: isCorrect ? '#4CAF50' : '#F44336'}]}>
              {isCorrect ? "Correct Answer!" : "Wrong Answer. Try Again!"}
            </Text>
            <Text style={styles.historyText}>
  Correct Answer Rate: {Math.round((selectedOption === "1" ? percentageA : selectedOption === "2" ? percentageB : selectedOption === "3" ? percentageC : percentageD) * 100)}%
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
    backgroundColor: '#FC8795',
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
  historyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginBottom: 10
  }
});

export default HMcqScreens;
