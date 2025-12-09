import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User as UserIcon, Sparkles, Loader2, Minimize2 } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";
import { CodeBlock } from './UI';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm your M365 Admin Assistant. How can I help you with Exchange, Teams, Intune, or PowerShell today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const initChat = () => {
    if (!process.env.API_KEY) {
      console.error("API_KEY is missing");
      return null;
    }
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      return ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: "You are an expert Microsoft 365 Administrator assistant. You help users with M365 suite questions, troubleshooting, best practices, and administration tasks for Exchange Online, Teams, Intune, Entra ID, and SharePoint. You can provide PowerShell scripts when asked. Keep answers concise, professional, and technically accurate. Format code blocks with the language name (e.g., ```powershell).",
        },
      });
    } catch (error) {
      console.error("Failed to initialize chat", error);
      return null;
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
        chatSessionRef.current = initChat();
      }

      if (!chatSessionRef.current) {
         throw new Error("Chat not initialized. Check API Key.");
      }

      const result = await chatSessionRef.current.sendMessageStream({ message: userMessage.text });
      
      let fullResponse = "";
      const botMessageId = (Date.now() + 1).toString();
      
      // Add placeholder for streaming
      setMessages(prev => [...prev, {
        id: botMessageId,
        role: 'model',
        text: "",
        timestamp: new Date()
      }]);

      for await (const chunk of result) {
        const chunkText = chunk.text; // Access text directly from the chunk
        if (chunkText) {
            fullResponse += chunkText;
            setMessages(prev => prev.map(msg => 
                msg.id === botMessageId ? { ...msg, text: fullResponse } : msg
            ));
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I apologize, but I encountered an error connecting to the AI service. Please ensure the API key is configured correctly.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple Markdown Renderer similar to ArticleDetail
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        const lang = match ? match[1] : 'text';
        const code = match ? match[2] : part.slice(3, -3);
        return <CodeBlock key={index} language={lang || 'text'} code={code.trim()} />;
      }
      
      // Render bold text and newlines
      return (
        <div key={index} className="whitespace-pre-wrap">
          {part.split(/(\*\*.*?\*\*)/g).map((subPart, i) => {
            if (subPart.startsWith('**') && subPart.endsWith('**')) {
              return <strong key={i}>{subPart.slice(2, -2)}</strong>;
            }
            return subPart;
          })}
        </div>
      );
    });
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 btn-press flex items-center justify-center ${
          isOpen 
            ? 'bg-navy-800 text-white rotate-90' 
            : 'bg-neon-dark dark:bg-neon-green text-white dark:text-navy-900 hover:scale-110 hover:shadow-[0_0_30px_rgba(94,247,166,0.5)]'
        }`}
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X size={24} /> : (
            <>
                <MessageCircle size={24} />
                {isHovered && !isOpen && (
                    <span className="absolute right-full mr-3 bg-white dark:bg-navy-800 text-navy-900 dark:text-white text-xs font-bold py-1 px-3 rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
                        Ask AI Assistant
                    </span>
                )}
            </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] glass-panel rounded-2xl flex flex-col shadow-2xl z-50 border border-gray-200 dark:border-white/10 animate-scale-in overflow-hidden">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 backdrop-blur-md flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neon-dark/10 dark:bg-neon-green/20 rounded-lg">
                <Bot size={20} className="text-neon-dark dark:text-neon-green" />
              </div>
              <div>
                <h3 className="font-bold text-navy-900 dark:text-white text-sm">M365 Assistant</h3>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Powered by Gemini 3.0 Pro</span>
                </div>
              </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)} 
                className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors text-gray-500"
            >
                <Minimize2 size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50 dark:bg-[#0a0f1c]/50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' 
                    ? 'bg-gray-200 dark:bg-white/10' 
                    : 'bg-neon-dark/10 dark:bg-neon-green/10 text-neon-dark dark:text-neon-green'
                }`}>
                  {msg.role === 'user' ? <UserIcon size={14} className="text-gray-600 dark:text-gray-300" /> : <Sparkles size={14} />}
                </div>
                
                <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-neon-dark dark:bg-neon-green text-white dark:text-navy-900 rounded-tr-none'
                      : 'bg-white dark:bg-navy-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-white/5 rounded-tl-none'
                  }`}>
                    {renderMessageContent(msg.text)}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-neon-dark/10 dark:bg-neon-green/10 flex items-center justify-center flex-shrink-0 text-neon-dark dark:text-neon-green">
                    <Sparkles size={14} />
                 </div>
                 <div className="bg-white dark:bg-navy-800 p-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-white/5 flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-neon-dark dark:text-neon-green" />
                    <span className="text-xs text-gray-500">Thinking...</span>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-navy-900 border-t border-gray-200 dark:border-white/10">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Exchange, Teams, or Scripts..."
                className="w-full bg-gray-100 dark:bg-navy-800 border border-transparent focus:border-neon-dark dark:focus:border-neon-green rounded-xl py-3 pl-4 pr-12 text-sm text-navy-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-neon-dark/50 dark:focus:ring-neon-green/50 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-1.5 bg-neon-dark dark:bg-neon-green text-white dark:text-navy-900 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-[10px] text-center text-gray-400 mt-2">
               AI can make mistakes. Verify important scripts and commands.
            </div>
          </form>
        </div>
      )}
    </>
  );
};