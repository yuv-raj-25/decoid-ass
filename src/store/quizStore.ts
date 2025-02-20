import { create } from 'zustand';
import { QuizState } from '../types';
import { openDB } from 'idb';

const QUIZ_DB = 'quiz-db';
const ATTEMPTS_STORE = 'attempts';

const dbPromise = openDB(QUIZ_DB, 1, {
  upgrade(db) {
    db.createObjectStore(ATTEMPTS_STORE, { keyPath: 'id', autoIncrement: true });
  },
});

export const useQuizStore = create<QuizState>((set) => ({
  currentQuestion: 0,
  answers: [],
  timeLeft: 30,
  isComplete: false,
  attempts: [],

  addAttempt: async (attempt) => {
    const db = await dbPromise;
    await db.add(ATTEMPTS_STORE, attempt);
    const attempts = await db.getAll(ATTEMPTS_STORE);
    set((state) => ({ ...state, attempts }));
  },

  resetQuiz: () => set({
    currentQuestion: 0,
    answers: [],
    timeLeft: 30,
    isComplete: false
  }),

  setAnswer: (questionIndex, answer) => 
    set((state) => ({
      ...state,
      answers: [
        ...state.answers.slice(0, questionIndex),
        answer,
        ...state.answers.slice(questionIndex + 1)
      ]
    })),

  setTimeLeft: (time) => set((state) => ({ ...state, timeLeft: time })),
  
  setComplete: (complete) => set((state) => ({ ...state, isComplete: complete })),

  goToNextQuestion: () => set((state) => ({
    ...state,
    currentQuestion: state.currentQuestion < 9 ? state.currentQuestion + 1 : state.currentQuestion,
  })),
}));