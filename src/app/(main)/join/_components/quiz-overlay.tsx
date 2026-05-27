"use client";

import { useQuizStore } from "@/stores/quiz-store";
import { QuizQuestion, QuizPayload, QuizEvent, QuizStatus } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { useChannel } from "@/hooks/use-channel";
import { PublicationContext } from "centrifuge/build/protobuf";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuizOverlay({ sid }: { sid: string }) {
  const { isActive, question, status, selectedOptionId, correctOptionId, startQuiz, submitAnswer, endQuiz } = useQuizStore();
  useChannel(`video_broadcast:${sid}:quiz`, {
    onPublication: (ctx: PublicationContext) => {
      try {
        let payload: QuizPayload;

        if (typeof ctx.data === 'string') {
          payload = JSON.parse(ctx.data) as QuizPayload;
        } else if (ctx.data instanceof Uint8Array || ArrayBuffer.isView(ctx.data)) {
          const textDecoder = new TextDecoder('utf-8');
          const bytes = ctx.data instanceof Uint8Array
            ? ctx.data
            : new Uint8Array((ctx.data as ArrayBufferView).buffer, (ctx.data as ArrayBufferView).byteOffset, (ctx.data as ArrayBufferView).byteLength);
          payload = JSON.parse(textDecoder.decode(bytes)) as QuizPayload;
        } else {
          payload = ctx.data as QuizPayload;
        }

        if (payload.event === QuizEvent.QUIZ_START) {
          startQuiz(payload.data as QuizQuestion);
        } else if (payload.event === QuizEvent.QUIZ_END) {
          const endData = payload.data as { correctOptionId?: string };
          endQuiz(endData?.correctOptionId);
        }
      } catch (err) {
        console.error("Failed to parse quiz publication", err);
      }
    }
  });

  if (!isActive || !question) return null;
  return (
    <div className="h-max shrink-0 p-4 relative z-20">
      <div className="bg-[linear-gradient(135deg,#E8F5F3_0%,#E9F5F5_14.29%,#EAF6F6_28.57%,#EBF6F8_42.86%,#EDF7FA_57.14%,#EEF7FC_71.43%,#EFF8FD_85.71%,#F0F8FF_00%)] rounded-3xl border border-white p-5 h-full flex flex-col justify-between relative overflow-hidden w-full">
        <div className="mb-4">
          <h3 className="text-slate-900 text-base font-semibold leading-tight">
            {question.text}
          </h3>
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
