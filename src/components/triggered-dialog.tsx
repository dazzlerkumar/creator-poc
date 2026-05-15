'use client';

import { Sparkles, X } from 'lucide-react';

interface TriggeredDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
}

export function TriggeredDialog({
  isOpen,
  onClose,
  title = "Exclusive Bonus!",
  description = "This interaction was triggered by a simulated API event. Custom overlays stay interactive on iOS!",
  buttonText = "I'm Impressed"
}: TriggeredDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-80 p-6 bg-zinc-900/80 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl animate-in fade-in zoom-in slide-in-from-bottom-10 duration-700">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 text-zinc-500 hover:text-white transition-colors"
        aria-label="Close dialog"
      >
        <X size={16} />
      </button>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-yoga-blue/20 rounded-full text-yoga-blue">
          <Sparkles size={24} />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
        {description}
      </p>
      <button
        onClick={onClose}
        className="w-full py-4 bg-linear-to-r from-yoga-blue to-yoga-green hover:brightness-110 rounded-2xl font-bold text-white transition-all active:scale-95 shadow-lg shadow-yoga-blue/20"
      >
        {buttonText}
      </button>
    </div>
  );
}
