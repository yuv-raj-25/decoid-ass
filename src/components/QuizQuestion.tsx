import React from 'react';
import { Question } from '../types';
import { Clock, ArrowRight } from 'lucide-react';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer?: number | string;
  onAnswerSelect: (answer: number | string) => void;
  onSubmit: () => void;
  timeLeft: number;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  onSubmit,
  timeLeft,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Question {question.id}</h2>
        <div className="flex items-center gap-2 text-orange-600">
          <Clock size={20} />
          <span className="font-medium">{timeLeft}s</span>
        </div>
      </div>
      
      <p className="text-lg mb-6">{question.question}</p>
      
      {question.type === 'multiple-choice' ? (
        <div className="space-y-3">
          {question.options!.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg transition-colors ${
                selectedAnswer === index
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="number"
            value={selectedAnswer as string || ''}
            onChange={(e) => onAnswerSelect(e.target.value)}
            placeholder="Enter your answer..."
            className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
          />
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={selectedAnswer === undefined}
        className="mt-6 w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {question.id === 10 ? 'Finish Quiz' : 'Next Question'}
        <ArrowRight size={20} />
      </button>
    </div>
  );
};