import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Question } from "../data/questions";
import { shuffleArray } from "../utils/shuffle";

interface QuestionCardProps {
  question: Question;
  onAnswerSelect: (isCorrect: boolean) => void;
  resetTrigger: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswerSelect,
  resetTrigger,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [resetTrigger]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === question.correctAnswer;
    onAnswerSelect(isCorrect);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textQuestion}>{question.question}</Text>
      {shuffleArray(question.answers).map((answer, index) => (
        <Button
          key={index}
          title={answer}
          onPress={() => handleAnswerSelect(answer)}
          disabled={selectedAnswer !== null}
        />
      ))}
      {selectedAnswer && (
        <Text
          style={[
            styles.textFeedback,
            selectedAnswer === question.correctAnswer
              ? styles.correct
              : styles.incorrect,
          ]}
        >
          {selectedAnswer === question.correctAnswer
            ? "Correct!"
            : `Incorrect! Correct answer: ${question.correctAnswer}`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  textQuestion: {
    color: "blue",
    fontSize: 20,
    marginBottom: 10,
  },
  textFeedback: {
    marginTop: 10,
    fontSize: 18,
  },
  correct: {
    color: "green",
  },
  incorrect: {
    color: "red",
  },
});

export default QuestionCard;
