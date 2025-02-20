import React, { useEffect, useState } from 'react';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResults } from './components/QuizResults';
import { questions } from './data/questions';
import { useQuizStore } from './store/quizStore';
import { Brain } from 'lucide-react';

function App() {
  const {
    currentQuestion,
    answers,
    timeLeft,
    isComplete,
    attempts,
    addAttempt,
    resetQuiz,
    setAnswer,
    setTimeLeft,
    setComplete,
    goToNextQuestion
  } = useQuizStore();

  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!isComplete && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (timeLeft === 0 && !isComplete) {
      handleQuizComplete();
    }
  }, [timeLeft, isComplete]);

  const handleAnswerSelect = (answer: number | string) => {
    setAnswer(currentQuestion, answer);
  };

  const handleSubmit = () => {
    if (currentQuestion < questions.length - 1) {
      goToNextQuestion();
      setTimeLeft(30);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const score = answers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    addAttempt({
      id: Date.now().toString(),
      date: new Date(),
      score,
      timeSpent,
      answers
    });

    setComplete(true);
  };

  const handleRetry = () => {
    resetQuiz();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <Brain size={32} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interactive Quiz</h1>
          <p className="text-gray-600">Test your knowledge with our timed quiz!</p>
        </div>

        {!isComplete ? (
          <QuizQuestion
            question={questions[currentQuestion]}
            selectedAnswer={answers[currentQuestion]}
            onAnswerSelect={handleAnswerSelect}
            onSubmit={handleSubmit}
            timeLeft={timeLeft}
          />
        ) : (
          <QuizResults
            answers={answers}
            timeSpent={Math.round((Date.now() - startTime) / 1000)}
            onRetry={handleRetry}
            attempts={attempts}
          />
        )}
      </div>
    </div>
  );
}

export default App;