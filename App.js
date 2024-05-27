import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, Text, StyleSheet } from 'react-native';
import { shuffleArray } from './src/utils/shuffle';
import QuestionCard from './src/components/QuestionCard';
import { questions } from './src/data/questions';

export default function App() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled.slice(0, 20));
    setScore(0);
    setQuizCompleted(false);
    setResetTrigger((prev) => !prev);
  };

  const handleAnswerSelect = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.textHeader}>Questions</Text>
        {shuffledQuestions.length > 0 &&
          shuffledQuestions.map((question, index) => (
            <QuestionCard
              key={index}
              question={question}
              onAnswerSelect={handleAnswerSelect}
              resetTrigger={resetTrigger}
            />
          ))}
        <Text style={styles.textQuestion}>Current Score: {score}</Text>
        <Button color="#f194ff" title="Reload Questions" onPress={loadQuestions} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
  },
  textHeader: {
    color: 'blue',
    fontSize: 30,
    textAlign: 'center',
  },
  textQuestion: {
    color: 'blue',
    fontSize: 20,
    textAlign: 'center',
  },
});
