export interface Question {
  id: number;
  question: string;
  type: 'multiple-choice' | 'integer';
  options?: string[];
  correctAnswer: number | string;
}

export interface QuizAttempt {
  id: string;
  date: Date;
  score: number;
  timeSpent: number;
  answers: (number | string)[];
}

export interface QuizState {
  currentQuestion: number;
  answers: (number | string)[];
  timeLeft: number;
  isComplete: boolean;
  attempts: QuizAttempt[];
  addAttempt: (attempt: QuizAttempt) => void;
  resetQuiz: () => void;
  setAnswer: (questionIndex: number, answer: number | string) => void;
  setTimeLeft: (time: number) => void;
  setComplete: (complete: boolean) => void;
  goToNextQuestion: () => void;
}