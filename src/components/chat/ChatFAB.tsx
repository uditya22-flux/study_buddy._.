import React from "react";
import { MessageSquareText, Sparkles } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { motion } from "framer-motion";

const ChatFAB: React.FC = () => {
  const { toggleChat, chatOpen } = useAppStore();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleChat}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 dark:bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        {chatOpen ? (
          <Sparkles className="animate-pulse" />
        ) : (
          <MessageSquareText />
        )}
      </div>
    </motion.button>
  );
};

export default ChatFAB;
