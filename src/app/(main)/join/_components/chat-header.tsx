"use client";

import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";
import { useRealtimeStore } from "@/stores/realtime-store";
import { ConnectionStatus } from "@/types/realtime";

export function ChatHeader() {
  const { showQuiz, setShowQuiz } = useUIStore();
  const connectionStatus = useRealtimeStore((state) => state.connectionStatus);

  return (
    <div className="px-5 py-2 border-b border-border flex justify-between items-center bg-white select-none">
      <div className="flex items-center gap-2.5">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h2 className="text-sm font-bold text-foreground tracking-tight uppercase">
          Live Chat
        </h2>
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shadow-[0_0_6px_rgba(34,197,94,0.5)] transition-all duration-200",
            connectionStatus === ConnectionStatus.CONNECTED
              ? "bg-green-500"
              : connectionStatus === ConnectionStatus.CONNECTING
                ? "bg-yellow-500 animate-pulse"
                : "bg-red-500"
          )}
        ></span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          className="w-10 h-7 flex items-center justify-center rounded-xl text-xs hover:bg-muted transition-colors text-muted-foreground border border-dashed border-primary"
        >
          Quiz
        </button>
      </div>
    </div>
  );
}
