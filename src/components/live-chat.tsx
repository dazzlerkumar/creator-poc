'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { Send, Shield, Crown, ChevronDown, MessageSquare, Pin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLiveChat } from '@/hooks/use-live-chat';

export interface ChatMessage {
  id: string;
  authorName: string;
  authorAvatarColor: string;
  messageText: string;
  timestamp: string;
  role: 'viewer' | 'moderator' | 'owner';
  isPinned?: boolean;
}

const QUICK_EMOJIS = ['👍', '❤️', '😂', '🧘‍♀️', '🧘‍♂️', '🙌', '✨'];

export function LiveChat({ sid }: { sid: string }) {
  const { messages, pinnedMessage, isLoading, sendMessage } = useLiveChat(sid);
  const [inputText, setInputText] = useState('');
  const [showScrollBanner, setShowScrollBanner] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      if (typeof scrollContainerRef.current.scrollTo === 'function') {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      } else {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
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
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
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
    setInputText('');
    shouldAutoScrollRef.current = true;
  };

  const appendEmoji = (emoji: string) => {
    if (inputText.length + emoji.length <= 200) {
      setInputText(prev => prev + emoji);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card text-foreground overflow-hidden relative">
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border select-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-bold text-sm text-foreground tracking-wide">Live Chat</span>
        </div>
      </div>

      {pinnedMessage && (
        <div className="flex items-start justify-between gap-3 px-4 py-3 bg-primary/10 border-b border-primary/20 animate-in slide-in-from-top duration-300 select-none">
          <div className="flex gap-3">
            <div>
              <div className="bg-primary/20 p-1 rounded-lg text-primary">
                <Pin size={16} className="rotate-45" />
              </div>
            </div>
            <div className="text-xs leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-primary mb-0.5">
                {pinnedMessage.authorName}
                {pinnedMessage.role === 'owner' && <Crown size={11} className="text-amber-600 fill-amber-600" />}
                {pinnedMessage.role === 'moderator' && <Shield size={11} className="text-emerald-700 fill-emerald-700" />}
              </div>
              <p className="text-foreground/90 font-medium break-words max-w-[210px]">
                {pinnedMessage.messageText}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 bg-background relative min-h-0" ref={scrollContainerRef} onScroll={handleScroll}>
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p className="text-sm italic">Loading chat...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
            <MessageSquare size={32} className="opacity-40 animate-bounce duration-1000" />
            <p className="text-sm italic">Welcome to the stream. Say something!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="group flex gap-3 hover:bg-muted/40 p-1.5 -mx-1.5 rounded-xl transition-all relative text-sm items-start"
            >
              <div className={cn(
                "w-7 aspect-square rounded-full shrink-0 flex items-center justify-center font-bold text-xs bg-gradient-to-tr text-white tracking-wider shadow-inner select-none",
                msg.authorAvatarColor
              )}>
                {msg.authorName.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap mb-0.5 select-none">
                  <span className={cn(
                    "font-bold hover:underline cursor-pointer transition-colors text-xs tracking-wide",
                    msg.role === 'owner' && "text-amber-600 font-extrabold",
                    msg.role === 'moderator' && "text-emerald-700 font-semibold",
                    msg.role === 'viewer' && "text-foreground/90"
                  )}>
                    {msg.authorName}
                  </span>

                  {msg.role === 'owner' && (
                    <span className="flex items-center gap-0.5 bg-amber-100 border border-amber-200 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full text-amber-700 uppercase tracking-widest leading-none">
                      <Crown size={9} className="fill-amber-600 shrink-0" />
                      Host
                    </span>
                  )}
                  {msg.role === 'moderator' && (
                    <span className="flex items-center gap-0.5 bg-emerald-100 border border-emerald-200 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full text-emerald-700 uppercase tracking-widest leading-none">
                      <Shield size={9} className="fill-emerald-700 shrink-0" />
                      Mod
                    </span>
                  )}

                  <span className="text-[10px] text-muted-foreground font-medium">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-foreground/80 leading-relaxed break-words pr-8">
                  {msg.messageText}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {showScrollBanner && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-[110px] left-1/2 -translate-x-1/2 px-4 py-2 bg-primary hover:bg-primary/90 border border-border rounded-full text-xs font-bold text-primary-foreground shadow-lg flex items-center gap-2 select-none active:scale-95 transition-all animate-bounce"
        >
          <ChevronDown size={14} />
          New messages below
        </button>
      )}

      <div className="p-3 bg-card border-t border-border shrink-0">
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none select-none">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => appendEmoji(emoji)}
              className="px-2.5 py-1.5 rounded-lg bg-muted hover:bg-muted/80 border border-border text-foreground text-base leading-none transition-all active:scale-90 duration-150"
            >
              {emoji}
            </button>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2 items-center relative">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value.substring(0, 200))}
              placeholder="Chat privately..."
              maxLength={200}
              className="w-full bg-background border border-border rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground placeholder-muted-foreground transition-all font-medium"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-bold select-none">
              {inputText.length}/200
            </span>
          </div>
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3.5 rounded-xl bg-primary hover:brightness-95 disabled:opacity-50 text-primary-foreground shadow-md transition-all active:scale-95 shrink-0 flex items-center justify-center cursor-pointer"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}

