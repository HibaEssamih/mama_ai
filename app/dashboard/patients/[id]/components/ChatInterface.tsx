"use client";

import { useRef, useEffect } from "react";
import type { MessageRow } from "../PatientDetailClient";

interface ChatInterfaceProps {
  messages: MessageRow[];
  conversationId: string | null;
  inputValue: string;
  sending: boolean;
  displayName: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  formatMessageTime: (time: string) => string;
}

export function ChatInterface({
  messages,
  conversationId,
  inputValue,
  sending,
  displayName,
  onInputChange,
  onSendMessage,
  formatMessageTime,
}: ChatInterfaceProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-lg flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-600 text-xl">chat</span>
          <h2 className="text-sm font-bold text-slate-900">WhatsApp Communication</h2>
        </div>
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Connected
        </span>
      </div>
      
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center mb-4 shadow-lg">
              <span className="material-symbols-outlined text-teal-600 text-4xl">chat_bubble</span>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Start a Conversation</h3>
            <p className="text-sm text-slate-600 max-w-sm">
              Send a message to communicate with {displayName} via WhatsApp. 
              Messages are delivered instantly and securely.
            </p>
          </div>
        )}
        
        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";
          const showTime = idx === 0 || 
            (new Date(msg.created_at).getTime() - new Date(messages[idx - 1].created_at).getTime()) > 300000; // 5 mins
          
          return (
            <div key={msg.id}>
              {showTime && (
                <div className="flex justify-center mb-4">
                  <span className="text-xs text-slate-400 bg-white px-3 py-1 rounded-full shadow-sm">
                    {new Date(msg.created_at).toLocaleString("en-US", { 
                      month: "short", 
                      day: "numeric", 
                      hour: "2-digit", 
                      minute: "2-digit" 
                    })}
                  </span>
                </div>
              )}
              <div className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
                  isUser
                    ? "bg-white text-slate-900 rounded-tl-sm" 
                    : "bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-br-sm shadow-teal-200"
                }`}>
                  <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{msg.content}</p>
                  <p className={`text-xs mt-1.5 ${isUser ? "text-slate-400" : "text-teal-100"}`}>
                    {formatMessageTime(msg.created_at)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      {conversationId && (
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSendMessage()}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
              disabled={sending}
            />
            <button
              type="button"
              onClick={onSendMessage}
              disabled={sending || !inputValue.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold text-sm hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:shadow-md"
            >
              {sending ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                  Sending
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">send</span>
                  Send
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
