import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Minimize2, Sparkles, Copy } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { streamChat } from "../../api/ai";
import ReactMarkdown from "react-markdown";

const ChatPanel: React.FC = () => {
  const { chatOpen, toggleChat, chatMessages, addChatMessage, updateLastStreamingMessage } = useAppStore();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
      timestamp: new Date(),
    };

    addChatMessage(userMessage);
    setInput("");
    setIsTyping(true);

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant" as const,
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    };

    addChatMessage(assistantMessage);

    try {
      await streamChat(input, chatMessages, (chunk) => {
        updateLastStreamingMessage(chunk);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  if (!chatOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed bottom-24 right-6 w-96 h-[600px] z-50 glass rounded-l shadow-2xl flex flex-col overflow-hidden border-primary/20"
    >
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-color)] bg-primary text-white flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles size={18} />
          <h3 className="font-serif font-bold">Archival Assistant</h3>
        </div>
        <div className="flex items-center space-x-1">
          <button onClick={toggleChat} className="p-1 hover:bg-white/10 rounded transition-colors">
            <Minimize2 size={16} />
          </button>
          <button onClick={toggleChat} className="p-1 hover:bg-white/10 rounded transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fcfcf9] dark:bg-background-dark">
        {chatMessages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
             <Sparkles size={48} className="mb-4 text-primary" />
             <p className="text-sm italic">"How may I assist your research today, Scholar?"</p>
          </div>
        )}
        {chatMessages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[85%] rounded-m p-3 text-sm shadow-sm",
              msg.role === "user" 
                ? "bg-primary text-white" 
                : "bg-white dark:bg-surface-dark border border-[var(--border-color)]"
            )}>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>
                {msg.content}
              </ReactMarkdown>
            </div>
              {msg.role === "assistant" && !msg.isStreaming && (
                <div className="mt-2 pt-2 border-t border-gray-100 dark:border-white/5 flex justify-end space-x-2">
                   <button className="text-[10px] uppercase tracking-widest text-text-muted hover:text-primary transition-colors flex items-center">
                      <Copy size={10} className="mr-1" /> Copy
                   </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--border-color)] bg-white dark:bg-surface-dark">
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-white/5 rounded-s px-3 py-2 border border-transparent focus-within:border-primary/30 transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Inquire of the archive..." 
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder:italic"
          />
          <button 
            disabled={!input.trim() || isTyping}
            onClick={handleSend}
            className="text-primary hover:scale-110 transition-transform disabled:opacity-30 disabled:scale-100"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Helper for cn in ChatPanel
import { cn } from "../../lib/utils";

export default ChatPanel;
