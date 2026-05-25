"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { MessageSquare, Pin, Send, Smile, ArrowDown, Mail, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLiveChat } from "@/hooks/use-live-chat";

export interface ChatMessage {
  id: string;
  authorName: string;
  messageText: string;
  timestamp: string;
  role: "viewer" | "moderator" | "owner";
  isPinned?: boolean;
  isDm?: boolean;
}

const QUICK_EMOJIS = ["👍", "❤️", "😂", "🧘‍♀️", "🧘‍♂️", "🙌", "✨"];

export function LiveChat({ sid }: { sid: string }) {
  const { messages, pinnedMessage, isLoading, sendMessage } = useLiveChat(sid);
  const [inputText, setInputText] = useState("");
  const [showScrollBanner, setShowScrollBanner] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      if (typeof scrollContainerRef.current.scrollTo === "function") {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      } else {
        scrollContainerRef.current.scrollTop =
          scrollContainerRef.current.scrollHeight;
      }
      setShowScrollBanner(false);
      shouldAutoScrollRef.current = true;
    }
  };

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 60;

    if (isAtBottom) {
      shouldAutoScrollRef.current = true;
      setShowScrollBanner(false);
    } else {
      shouldAutoScrollRef.current = false;
      setShowScrollBanner(true);
    }
  };

  const handleSendMessage = (e?: FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(inputText.trim().substring(0, 200));
    setInputText("");
    shouldAutoScrollRef.current = true;
  };

  const appendEmoji = (emoji: string) => {
    if (inputText.length + emoji.length <= 200) {
      setInputText((prev) => prev + emoji);
    }
  };

  return (
    <section
      className="flex-grow flex flex-col bg-background overflow-hidden relative h-full min-h-0"
      id="chat-section"
    >
      {pinnedMessage && (
        <div className="flex items-start justify-between gap-3 px-5 py-3 bg-primary/10 border-b border-border animate-in slide-in-from-top duration-300 select-none">
          <div className="flex gap-3">
            <div className="bg-primary/20 p-1 rounded-lg text-primary shrink-0 self-start">
              <Pin size={16} className="rotate-45" />
            </div>
            <div className="text-xs leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-primary mb-0.5">
                {pinnedMessage.authorName}
              </div>
              <p className="text-foreground font-medium break-words">
                {pinnedMessage.messageText}
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "flex-grow p-4 space-y-5 overflow-y-auto relative min-h-0",
          showEmojis ? "pb-34" : "pb-26",
        )}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-muted-foreground/60">
            <p className="text-sm italic">Loading chat...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground/40 gap-2">
            <MessageSquare
              size={32}
              className="opacity-40 animate-bounce duration-1000"
            />
            <p className="text-sm italic">
              Welcome to the stream. Say something!
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-start gap-3 text-sm",
                msg.isDm &&
                "pl-3 border-l-2 border-primary bg-primary/5 rounded-r-lg py-1.5 -mx-1 px-2",
              )}
            >
              <div className="text-[11px] text-muted-foreground/60 font-medium pt-1 w-8 select-none shrink-0">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className={cn(
                    "text-xs font-bold mr-1.5 transition-colors",
                    msg.role === "owner"
                      ? "text-secondary"
                      : "text-foreground",
                  )}
                >
                  {msg.role === "owner" ? <><span className="text-md">Saurabh</span> <Crown size={10} fill="text-yellow-500" /></> : msg.authorName}:
                </span>
                <span className="text-sm text-muted-foreground break-words">
                  {msg.messageText}
                </span>
                {msg.isDm && (
                  <span className="inline-flex items-center gap-0.5 ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-primary/15 text-primary select-none align-middle">
                    <Mail size={9} />
                    DM
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showScrollBanner && (
        <button
          onClick={scrollToBottom}
          className={cn(
            "absolute left-1/2 -translate-x-1/2 px-4 py-2 bg-primary hover:brightness-95 border border-border rounded-full text-xs font-bold text-primary-foreground shadow-lg flex items-center gap-2 select-none active:scale-95 transition-all animate-bounce",
            showEmojis ? "bottom-[130px]" : "bottom-[90px]",
          )}
        >
          <ArrowDown size={14} />
          New messages below
        </button>
      )}

      <div className="p-4 bg-card border-t border-border bottom-0 left-0 right-0 z-30 fixed z-50 shrink-0">
        {showEmojis && (
          <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none select-none max-w-2xl mx-auto mb-2 transition-all duration-200 animate-in slide-in-from-bottom duration-200">
            {QUICK_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => appendEmoji(emoji)}
                className="px-2.5 py-1.5 rounded-lg bg-muted hover:bg-card dark:hover:bg-zinc-800 border border-border text-foreground text-base leading-none transition-all active:scale-90 duration-150 cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={handleSendMessage}
          className="bg-muted rounded-2xl flex items-center px-4 py-3 gap-3 border border-transparent focus-within:border-primary/30 transition-all shadow-sm max-w-2xl mx-auto"
        >
          <button
            type="button"
            onClick={() => setShowEmojis((prev) => !prev)}
            aria-label="Toggle emoji picker"
            className={cn(
              "hover:text-primary transition-colors shrink-0 flex items-center justify-center cursor-pointer",
              showEmojis ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Smile className="w-5.5 h-5.5" />
          </button>

          <input
            className="bg-transparent border-none focus:ring-0 text-foreground flex-1 text-base md:text-xs placeholder:text-muted-foreground/40 p-0 outline-none"
            placeholder="Send a message..."
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value.substring(0, 200))}
            maxLength={200}
          />

          {inputText.length > 150 && (
            <span
              className={cn(
                "text-sm font-mono select-none shrink-0 transition-colors",
                inputText.length >= 180
                  ? "text-destructive font-bold"
                  : "text-muted-foreground/60",
              )}
            >
              {200 - inputText.length}
            </span>
          )}

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="flex items-center justify-center text-primary active:scale-95 disabled:opacity-40 transition-transform shrink-0 cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </section>
  );
}
