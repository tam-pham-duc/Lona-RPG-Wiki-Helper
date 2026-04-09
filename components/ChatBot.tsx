'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Minimize2, Maximize2, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY as string });

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!auth.currentUser || !isOpen) return;

    const q = query(
      collection(db, `users/${auth.currentUser.uid}/chats/default/messages`),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        role: doc.data().role,
        content: doc.data().content
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !auth.currentUser) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      // Save user message to Firestore
      await addDoc(collection(db, `users/${auth.currentUser.uid}/chats/default/messages`), {
        uid: auth.currentUser.uid,
        role: 'user',
        content: userMessage,
        timestamp: serverTimestamp()
      });

      // Prepare contents for Gemini (including system instruction and history)
      const contents = [
        {
          role: 'user',
          parts: [{ text: "SYSTEM INSTRUCTION: You are a LonaRPG survival expert. You help players with game mechanics, builds, and survival tips. You are knowledgeable about the game's dark and challenging world. Keep responses helpful and thematic. If asked about specific items or quests, refer to the wiki data if possible." }]
        },
        ...messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })),
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ];

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents
      });
      
      const responseText = result.text || "I'm sorry, I couldn't generate a response.";

      // Save model response to Firestore
      await addDoc(collection(db, `users/${auth.currentUser.uid}/chats/default/messages`), {
        uid: auth.currentUser.uid,
        role: 'model',
        content: responseText,
        timestamp: serverTimestamp()
      });

    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl transition-all group"
          >
            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className={`bg-gray-900 border border-gray-700 shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all ${
              isMinimized ? 'h-14 w-64' : 'h-[600px] w-[400px]'
            }`}
          >
            {/* Header */}
            <div className="bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700 shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-white text-sm">Lona Survival AI</span>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0f1115] custom-scrollbar"
                >
                  {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <Bot className="w-12 h-12 text-gray-700 mb-4" />
                      <p className="text-gray-500 text-sm italic">
                        &quot;Welcome, traveler. I am your guide in the world of LonaRPG. How can I assist you today?&quot;
                      </p>
                    </div>
                  )}
                  {messages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                      }`}>
                        <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] uppercase font-bold tracking-wider">
                          {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                          {msg.role === 'user' ? 'You' : 'Lona AI'}
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800 text-gray-200 p-3 rounded-2xl rounded-tl-none border border-gray-700 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                        <span className="text-xs italic">Thinking...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 bg-gray-800 border-t border-gray-700 shrink-0">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="relative"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about builds, items, or quests..."
                      className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-xl pl-4 pr-12 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 disabled:text-gray-600 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
