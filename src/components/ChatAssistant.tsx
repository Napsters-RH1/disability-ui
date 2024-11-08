"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
// import { Alert } from '@/components/ui/alert';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; // Changed from Date to string
}

const ChatAssistant = () => {
  // Add hydration handling
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm here to help you with your VA disability claim. How can I assist you today?",
      timestamp: new Date().toISOString() // Store as ISO string
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: getContextualResponse(message),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getContextualResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('evidence') || lowerMessage.includes('documents')) {
      return "For VA disability claims, you'll typically need: medical records, service records, and a current diagnosis. You can upload these in the 'Upload Evidence' section.";
    }
    if (lowerMessage.includes('ptsd') || lowerMessage.includes('trauma')) {
      return "For PTSD claims, you'll need: a current diagnosis, evidence of the in-service stressor, and medical evidence linking your PTSD to service. Would you like more specific information?";
    }
    if (lowerMessage.includes('status') || lowerMessage.includes('track')) {
      return "Once you submit your claim, you can track its status on VA.gov. Would you like me to show you how to do that?";
    }
    
    return "I'm here to help guide you through the claims process. What specific information do you need about VA disability claims?";
  };

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 bg-blue-900 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-all ${isOpen ? 'hidden' : ''}`}
        aria-label="Open chat assistant"
      >
        <MessageSquare size={24} />
      </button>

      <div 
        className={`fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl transition-all transform ${
          isOpen ? 'scale-100' : 'scale-0'
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="bg-blue-900 text-white p-4 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} />
            <h2 className="font-semibold">VA Claims Assistant</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <span className="text-xs opacity-70 block mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true
                  })}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-600"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={isTyping || !message.trim()}
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This is an AI assistant to help guide you through the claims process.
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatAssistant;