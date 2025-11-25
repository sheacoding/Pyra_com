import React, { useState } from 'react';
import { Sparkles, Send, X, MessageSquare } from 'lucide-react';
import { askPyraAssistant } from '../services/geminiService';
import { GeminiStatus } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<GeminiStatus>(GeminiStatus.IDLE);
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStatus(GeminiStatus.LOADING);
    setResponse(null);

    try {
      const result = await askPyraAssistant(query, language);
      setResponse(result);
      setStatus(GeminiStatus.SUCCESS);
    } catch (err) {
      setResponse(language === 'zh' ? "抱歉，连接失败，请稍后再试。" : "Sorry, I encountered a connection error. Please try again later.");
      setStatus(GeminiStatus.ERROR);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-105 ${
          isOpen ? 'bg-gray-800 text-gray-400 rotate-90 opacity-0 pointer-events-none' : 'bg-gradient-to-r from-orange-500 to-red-600 text-white opacity-100'
        }`}
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {/* Modal / Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-80 sm:w-96 glass-panel rounded-2xl shadow-2xl border border-orange-500/20 z-50 transition-all duration-300 transform origin-bottom-right flex flex-col overflow-hidden ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8 pointer-events-none'
        }`}
        style={{ maxHeight: '600px' }}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-orange-900/40 to-red-900/40 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <h3 className="font-semibold text-white">Pyra AI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 flex-1 overflow-y-auto min-h-[300px] bg-black/20">
            {status === GeminiStatus.IDLE && !response && (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
                    <MessageSquare className="w-8 h-8 opacity-20" />
                    <p className="text-sm">
                      {language === 'zh' 
                        ? '向我询问关于 Pyra 的语法、配置或性能提示。' 
                        : 'Ask me anything about Pyra syntax, configuration, or performance tips.'}
                    </p>
                </div>
            )}
            
            {status === GeminiStatus.LOADING && (
                <div className="flex flex-col items-center justify-center h-full space-y-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></div>
                    <p className="text-xs text-orange-400 font-mono">Consulting Gemini 2.5...</p>
                </div>
            )}

            {response && (
                <div className="prose prose-invert prose-sm max-w-none">
                    <div className="bg-white/5 rounded-lg p-3 text-sm leading-relaxed border border-white/5">
                        {response}
                    </div>
                </div>
            )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-black/40">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={language === 'zh' ? "如何新建项目？" : "How do I init a project?"}
              className="w-full bg-gray-900/50 border border-gray-700 text-white text-sm rounded-lg pl-3 pr-10 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-gray-600"
            />
            <button
              type="submit"
              disabled={status === GeminiStatus.LOADING || !query.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 disabled:opacity-50 disabled:hover:text-gray-400"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-[10px] text-gray-600 mt-2 text-center">
            Powered by Google Gemini
          </div>
        </form>
      </div>
    </>
  );
};