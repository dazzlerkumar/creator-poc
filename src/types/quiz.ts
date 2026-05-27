export enum QuizStatus {
  IDLE = 'IDLE',
  ACTIVE = 'ACTIVE',
  SUBMITTED = 'SUBMITTED',
  RESULTS = 'RESULTS'
}

export enum QuizEvent {
  QUIZ_START = 'QUIZ_START',
  QUIZ_END = 'QUIZ_END'
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  questionId: string;
  text: string;
  options: QuizOption[];
  durationSeconds: number;
}

export interface QuizPayload {
  event: QuizEvent;
  data: unknown;
}
