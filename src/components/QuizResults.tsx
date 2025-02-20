import React from 'react';
import { questions } from '../data/questions';
import { QuizAttempt } from '../types';
import { Trophy, Clock, RotateCcw } from 'lucide-react';

interface QuizResultsProps {
  answers: (number | string)[];
  timeSpent: number;
  onRetry: () => void;
  attempts: QuizAttempt[];
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  answers,
  timeSpent,
  onRetry,
  attempts,
}) => {
  const score = answers.reduce((acc, answer, index) => {
    return acc + (answer === questions[index].correctAnswer ? 1 : 0);
  }, 0);

  const percentage = (score / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
          <Trophy size={40} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-gray-600">Here's how you did</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-600 mb-1">Score</p>
          <p className="text-2xl font-bold text-blue-600">{percentage.toFixed(0)}%</p>
          <p className="text-sm text-gray-500">{score} of {questions.length} correct</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-600 mb-1">Time Spent</p>
          <div className="flex items-center justify-center gap-2">
            <Clock size={20} className="text-gray-600" />
            <p className="text-2xl font-bold">{timeSpent}s</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Your Answers</h3>
        <div className="space-y-3">
          {questions.map((question, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium mb-2">Question {question.id}</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Your answer: {question.type === 'multiple-choice' 
                    ? `${String.fromCharCode(65 + (answers[index] as number))}. ${question.options![answers[index] as number]}`
                    : answers[index]}
                </p>
                <p className={answers[index] === question.correctAnswer 
                  ? "text-green-600 font-medium"
                  : "text-red-600 font-medium"}>
                  {answers[index] === question.correctAnswer ? "Correct" : "Incorrect"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {attempts.length > 1 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Previous Attempts</h3>
          <div className="space-y-3">
            {attempts.slice(-5).reverse().map((attempt, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">Attempt {attempts.length - index}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(attempt.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">
                    {(attempt.score / questions.length * 100).toFixed(0)}%
                  </p>
                  <p className="text-sm text-gray-600">{attempt.timeSpent}s</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onRetry}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <RotateCcw size={20} />
        Try Again
      </button>
    </div>
  );
};