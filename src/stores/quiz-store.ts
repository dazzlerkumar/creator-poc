import { create } from 'zustand';
import { QuizQuestion, QuizStatus } from '@/types/quiz';

interface QuizState {
  isActive: boolean;
  question: QuizQuestion | null;
  status: QuizStatus;
  selectedOptionId: string | null;
  correctOptionId: string | null;

  startQuiz: (question: QuizQuestion) => void;
  submitAnswer: (optionId: string) => void;
  endQuiz: (correctOptionId?: string) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  isActive: true,
  question: {
    questionId: "q-123",
    text: "What is the primary benefit of morning yoga?",
    options: [
      { id: "opt-1", text: "Improves Flexibility" },
      { id: "opt-2", text: "Builds Core Strength" },
      { id: "opt-3", text: "Mental Clarity" },
      { id: "opt-4", text: "All of the above" }
    ],
    durationSeconds: 30
  },
  status: QuizStatus.ACTIVE,
  selectedOptionId: null,
  correctOptionId: null,

  startQuiz: (question) => {
    set({
      isActive: true,
      question,
      status: QuizStatus.ACTIVE,
      selectedOptionId: null,
      correctOptionId: null,
    });
  },

  submitAnswer: (optionId) => {
    // Prevent multiple submissions
    if (get().status !== QuizStatus.ACTIVE) return;

    set({ selectedOptionId: optionId, status: QuizStatus.SUBMITTED });

    // TODO: In a real implementation, make API call here
    // e.g. await submitQuizAnswer({ questionId: get().question?.questionId, optionId })
  },

  endQuiz: (correctOptionId) => {
    set({ status: QuizStatus.RESULTS, correctOptionId: correctOptionId || null });

    // Hide quiz after a delay to clear the screen
    setTimeout(() => {
      get().resetQuiz();
    }, 5000);
  },

  resetQuiz: () => {
    set({
      isActive: false,
      question: null,
      status: QuizStatus.IDLE,
      selectedOptionId: null,
      correctOptionId: null,
    });
  },
}));
