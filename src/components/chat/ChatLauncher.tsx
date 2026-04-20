import React from 'react';
import { MessageSquare, X } from 'lucide-react';

interface ChatLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatLauncher: React.FC<ChatLauncherProps> = ({ isOpen, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed bottom-7 right-8 z-[70] h-14 w-14 rounded-full
        border border-accent-blue/20 bg-navy-950/85 text-navy-100 backdrop-blur-xl
        shadow-[0_0_24px_rgba(74,144,217,0.16)] transition-all duration-280
        hover:-translate-y-0.5 hover:border-accent-blue/35 hover:text-accent-blue
        hover:shadow-[0_0_32px_rgba(74,144,217,0.22)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40"
      aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
    >
      <span className="absolute inset-[5px] rounded-full border border-white/[0.05]" />
      <span className="relative flex items-center justify-center">
        {isOpen ? <X size={18} /> : <MessageSquare size={18} />}
      </span>
    </button>
  );
};

export default ChatLauncher;
