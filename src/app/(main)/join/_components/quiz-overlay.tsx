"use client";

import { useEffect, useState } from "react";
import { useQuizStore } from "@/stores/quiz-store";
import { QuizStatus } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuizOverlay() {
  const { isActive, question, status, selectedOptionId, correctOptionId, submitAnswer } = useQuizStore();
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);

  if (question?.questionId !== currentQuestionId) {
    setCurrentQuestionId(question?.questionId ?? null);
    setTimeLeft(question?.durationSeconds || 60);
  }

  useEffect(() => {
    if (isActive && question && status !== QuizStatus.RESULTS) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Time is up, we could submit automatically or just close
            if (status === QuizStatus.ACTIVE) {
              useQuizStore.getState().endQuiz();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isActive, question, status]);
  if (!isActive || !question) return null;
  return (
    <div className="h-max shrink-0 p-4 relative z-20">
      <div className="bg-[linear-gradient(135deg,#E8F5F3_0%,#E9F5F5_14.29%,#EAF6F6_28.57%,#EBF6F8_42.86%,#EDF7FA_57.14%,#EEF7FC_71.43%,#EFF8FD_85.71%,#F0F8FF_00%)] rounded-3xl border border-white p-5 h-full flex flex-col justify-between relative overflow-hidden w-full shadow-lg">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-slate-900 text-base font-semibold leading-tight">
            {question.text}
          </h3>
          {status !== QuizStatus.RESULTS && (
            <div className="flex-shrink-0 bg-[linear-gradient(90.54deg,#017AB9_0.47%,#02A88D_98.53%)] text-white  font-bold rounded-full w-10 h-10 flex items-center justify-center text-sm">
              {timeLeft}s
            </div>
          )}
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrect = correctOptionId === option.id;
            const isWrong = status === QuizStatus.RESULTS && isSelected && !isCorrect;

            let buttonClasses = "";

            if (status === QuizStatus.SUBMITTED) {
              buttonClasses = cn(
                buttonClasses,
                isSelected ? "text-white" : ""
              );
            } else if (status === QuizStatus.RESULTS) {
              if (isCorrect) {
                buttonClasses = cn(buttonClasses, "border-green-500 bg-green-50 text-green-700 shadow-md scale-[1.02]");
              } else if (isWrong) {
                buttonClasses = cn(buttonClasses, "border-red-500 bg-red-50 text-red-700 shadow-md scale-[1.02]");
              } else {
                buttonClasses = cn(buttonClasses, "border-slate-100 bg-slate-50 opacity-50 text-slate-400");
              }
            }
            return (
              <Button
                key={option.id}
                onClick={() => submitAnswer(option.id)}
                variant={isSelected ? 'quizSelected' : 'quiz'}
                size="xl"
                className={buttonClasses}
              >
                <span>{option.text}</span>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  );
}
