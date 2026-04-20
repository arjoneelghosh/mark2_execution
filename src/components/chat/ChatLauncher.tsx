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
      className="theme-callout-surface fixed bottom-7 right-8 z-[70] h-14 w-14 rounded-full
        text-navy-100 backdrop-blur-xl shadow-[var(--shadow-accent)] transition-all duration-280
        hover:-translate-y-0.5 hover:text-accent-blue
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40"
      aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
    >
      <span className="theme-divider-soft absolute inset-[5px] rounded-full border" />
      <span className="relative flex items-center justify-center">
        {isOpen ? <X size={18} /> : <MessageSquare size={18} />}
      </span>
    </button>
  );
};

export default ChatLauncher;
