import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if(isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  useEffect(() => {
    if (isOpen) {
      // Use a short timeout to ensure the input is visible after the transition before focusing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Focus input after each message, so user can keep typing
  useEffect(() => {
    if (isOpen) {
        inputRef.current?.focus();
    }
    }, [messages, isOpen]);


  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = { sender: 'user', text: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    // Add a placeholder for the bot's streaming response
    setMessages(prev => [...prev, { sender: 'bot', text: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Network response was not ok or body is missing.');
      }
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: !done });

        // Try to parse if it's JSON
        let parsedText = chunk;
        try {
        const json = JSON.parse(chunk);
        if (json.text) parsedText = json.text;
        } catch {
        // ignore if it's not valid JSON (some APIs send plain text chunks)
        }
        
        setMessages(currentMessages => {
          const lastMessage = currentMessages[currentMessages.length - 1];
          const updatedLastMessage = { ...lastMessage, text: lastMessage.text + parsedText };
          return [...currentMessages.slice(0, -1), updatedLastMessage];
        });
      }

    } catch (error) {
      console.error('Error fetching chat response:', error);
       setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage.sender === 'bot' && lastMessage.text === '') {
            const errorResponse: Message = { sender: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
            return [...prev.slice(0, -1), errorResponse];
        }
        return prev;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center animate-pulse-strong z-50 transition-transform hover:scale-110"
        aria-label="Open chat"
      >
        {!isOpen ? <MessageCircle size={32} /> : <X size={32} />}
      </button>

      <div
        className={`fixed bottom-4 right-4 sm:bottom-28 sm:right-8 w-[calc(100%-2rem)] sm:w-full max-w-sm bg-slate-800 rounded-lg shadow-2xl border border-slate-700 z-50 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center p-4 bg-slate-700 rounded-t-lg">
          <h3 className="text-white font-bold text-lg">Portfolio Assistant</h3>
          <button onClick={toggleChat} className="text-slate-400 hover:text-white" aria-label="Close chat">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 max-h-[60vh] sm:h-80 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-600 text-slate-200 rounded-bl-none'
                }`}
              >
                <ReactMarkdown className="text-sm whitespace-pre-wrap">{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.text === '' && (
             <div className="flex justify-start">
                <div className="max-w-xs px-4 py-2 rounded-lg bg-slate-600 text-slate-200 rounded-bl-none">
                    <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></span>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700">
          <div className="flex items-center bg-slate-700 rounded-lg">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow bg-transparent p-3 text-white placeholder-slate-400 focus:outline-none"
              aria-label="Chat input"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="p-3 text-slate-400 hover:text-cyan-400 transition-colors disabled:opacity-50"
              aria-label="Send message"
              disabled={!inputValue.trim() || isLoading}
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