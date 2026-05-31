"use client";


import { OverlayCardWrapper } from "../payments/overlay-card-wrapper";
import { ChatMessage } from "@/types/chat";
import { Pin } from "lucide-react";

interface PinnedMessageCardProps {
    pinnedMessage: ChatMessage;
}

export default function PinnedMessageCard({
    pinnedMessage
}: PinnedMessageCardProps): React.ReactElement {
    return (
        <OverlayCardWrapper className="bg-[linear-gradient(90deg,#FEFFFF_0%,#EEF8F6_52.4%,#FDFEFF_94.23%)] border-primary p-2 px-5 justify-between rounded-xl shadow">
            <div className="flex gap-3 align-start">
                <Pin size={12} className="text-primary fill-primary mt-1" />
                <div className="text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-primary mb-0.5 text-xs">
                        Saurabh
                    </div>
                    <p className="text-foreground break-words">
                        {pinnedMessage.messageText}
                    </p>
                </div>
            </div>
        </OverlayCardWrapper>
    );
}
