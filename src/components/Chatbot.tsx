import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
//import type { Message } from '../../types';

export interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hello! I'm a portfolio assistant. Ask me anything about Safkat's skills, projects, or experience." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if(isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage: Message = { sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Placeholder for backend response
    setTimeout(() => {
      const botResponse: Message = { sender: 'bot', text: "Thanks for your message! The AI functionality is under development. I'll be able to answer your questions soon." };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center animate-pulse-strong z-50 transition-transform hover:scale-110"
        aria-label="Open chat"
      >
        {!isOpen && <MessageCircle size={32} />}
        {isOpen && <X size={32} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-28 right-8 w-full max-w-sm bg-slate-800 rounded-lg shadow-2xl border border-slate-700 z-50 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-slate-700 rounded-t-lg">
          <h3 className="text-white font-bold text-lg">Portfolio Assistant</h3>
          <button onClick={toggleChat} className="text-slate-400 hover:text-white" aria-label="Close chat">
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="p-4 h-80 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-600 text-slate-200 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700">
          <div className="flex items-center bg-slate-700 rounded-lg">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow bg-transparent p-3 text-white placeholder-slate-400 focus:outline-none"
              aria-label="Chat input"
            />
            <button
              type="submit"
              className="p-3 text-slate-400 hover:text-cyan-400 transition-colors disabled:opacity-50"
              aria-label="Send message"
              disabled={!inputValue.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;