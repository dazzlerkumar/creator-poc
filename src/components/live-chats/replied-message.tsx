"use client";

import { useState } from "react";
import { BadgeCheck, X } from "lucide-react";
import { ChatMessage } from "@/types/chat";

export function RepliedMessage({ message }: { message: ChatMessage }) {
    const [isVisible, setIsVisible] = useState(true);

    // TODO: Remove this hardcoded message
    // Hardcoded original message per user request
    const originalMessage = {
        authorName: "Dev",
        text: "Can I pause my habuild subscription for sometime?",
    };

    if (!isVisible) return null;

    return (
        <div className="bg-white rounded-xl shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] border border-border p-3.5 w-full relative mb-4">
            {/* Close Button Placeholder */}
            <button
                onClick={() => setIsVisible(false)}
                className="absolute top-2.5 right-2.5 text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer"
            >
                <X size={18} />
            </button>
            {/* Original Message */}
            <div className="flex items-start gap-3">

                <div className="flex-1 min-w-0 pr-6">
                    {/* <div className="text-[11px] font-bold text-[#0070F3] tracking-wide uppercase mb-1">
                            PINNED
                        </div> */}
                    <div className="font-bold text-[14px] text-foreground">
                        {originalMessage.authorName}
                    </div>
                    <p className="text-[13.5px] text-muted-foreground mt-1 leading-snug">
                        {originalMessage.text}
                    </p>
                    <div className="text-[13px] text-muted-foreground mt-2 font-medium">
                        1 reply
                    </div>
                </div>
            </div>
            {/* Reply */}
            <div className="mt-2 flex items-start gap-3 ml-8">

                <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-1 mb-1">
                        <span className="font-bold text-[14px] text-foreground tracking-tight">
                            Saurabh
                        </span>
                        <BadgeCheck size={16} className="text-white fill-[#0070F3]" />
                    </div>
                    <p className="text-[14px] text-foreground leading-relaxed">
                        {message.messageText}
                    </p>
                </div>
            </div>
        </div>

    );
}
