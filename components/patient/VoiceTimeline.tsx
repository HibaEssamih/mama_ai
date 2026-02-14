"use client";

import { useState } from "react";
import Image from "next/image";
import type { VoiceMessage } from "@/types";

interface VoiceTimelineProps {
  messages: VoiceMessage[];
  patientAvatar: string;
  patientName: string;
}

export default function VoiceTimeline({ messages, patientAvatar, patientName }: VoiceTimelineProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const handlePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
    // TODO: Implement actual audio playback
  };

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim()) {
      console.log("Adding note:", note);
      setNote("");
      // TODO: Implement note submission
    }
  };

  const getPriorityStyles = (priority: VoiceMessage["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-white border-red-300 shadow-sm";
      case "medium":
        return "bg-white border-slate-200 shadow-sm";
      default:
        return "bg-white border-slate-200";
    }
  };

  const getTagStyles = (tag: string) => {
    if (tag.includes("Risk") || tag.includes("Alert")) {
      return "bg-red-50 text-red-600 border-red-200";
    }
    return "bg-slate-100 text-slate-600 border-slate-200";
  };

  const highlightTerms = (text: string, terms?: string[]) => {
    if (!terms || terms.length === 0) return text;
    
    let result = text;
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      result = result.replace(regex, '<mark class="bg-red-50 text-red-600 px-1 rounded">$1</mark>');
    });
    
    return result;
  };

  return (
    <section 
      className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden"
      aria-labelledby="timeline-heading"
    >
      {/* Timeline Header */}
      <header className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sky-500" aria-hidden="true">
            graphic_eq
          </span>
          <h2 id="timeline-heading" className="font-semibold text-slate-800">
            Voice-to-Text Symptom Timeline
          </h2>
        </div>
        <span 
          className="text-xs px-2 py-1 bg-sky-50 text-sky-600 rounded font-medium border border-sky-100"
          role="status"
        >
          Live Updates
        </span>
      </header>

      {/* Timeline Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/30 timeline-scroll">
        {/* Day Separator */}
        <div className="flex items-center justify-center">
          <time className="bg-slate-200 text-slate-500 text-xs font-medium px-3 py-1 rounded-full">
            Today, Oct 12
          </time>
        </div>

        {/* Messages */}
        {messages.map((message, index) => (
          <div key={message.id}>
            {/* Show Yesterday separator after first message */}
            {index === 1 && (
              <div className="flex items-center justify-center pt-4 pb-8">
                <time className="bg-slate-200 text-slate-500 text-xs font-medium px-3 py-1 rounded-full">
                  Yesterday, Oct 11
                </time>
              </div>
            )}
            
            <article className="flex gap-4">
              <div className="shrink-0 mt-1">
                <Image
                  src={patientAvatar}
                  alt={`${patientName} avatar`}
                  width={40}
                  height={40}
                  className={`w-10 h-10 rounded-full object-cover ${
                    message.priority !== "high" ? "grayscale opacity-70" : ""
                  }`}
                />
              </div>
              
              <div className="flex-1 max-w-2xl">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-slate-900">
                    {patientName}
                  </span>
                  <time className="text-xs text-slate-400">
                    {message.timestamp}
                  </time>
                </div>
                
                <div className={`border rounded-2xl rounded-tl-none p-4 relative group ${getPriorityStyles(message.priority)}`}>
                  {/* Bookmark button */}
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="text-slate-400 hover:text-sky-500 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 rounded cursor-pointer"
                      type="button"
                      aria-label="Bookmark message"
                    >
                      <span className="material-symbols-outlined text-sm">
                        bookmark_border
                      </span>
                    </button>
                  </div>
                  
                  <p 
                    className="text-slate-700 text-base leading-relaxed mb-3"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightTerms(message.transcript, message.highlightedTerms) 
                    }}
                  />
                  
                  {/* Audio Player */}
                  <div className="bg-slate-100 rounded-lg p-2 flex items-center gap-3 mb-3 border border-slate-100">
                    <button
                      onClick={() => handlePlay(message.id)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        playingId === message.id
                          ? "bg-sky-500 text-white hover:bg-sky-600"
                          : "bg-slate-200 text-slate-500 hover:bg-slate-300"
                      }`}
                      type="button"
                      aria-label={playingId === message.id ? "Pause audio" : "Play audio"}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {playingId === message.id ? "pause" : "play_arrow"}
                      </span>
                    </button>
                    
                    <div className="flex-1">
                      <div className="h-6 flex items-center gap-[2px] opacity-40">
                        {/* Waveform bars */}
                        {[3, 5, 3, 4, 6, 3, 2, 4, 3, 5, 3, 4, 6, 3, 2, 4].map((height, i) => (
                          <div 
                            key={i}
                            className="w-[3px] bg-slate-400 rounded-full"
                            style={{ height: `${height * 2}px` }}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                    
                    <time className="text-xs text-slate-400 font-mono">
                      {message.duration}
                    </time>
                    <span className="material-symbols-outlined text-slate-300 text-sm" aria-hidden="true">
                      mic
                    </span>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {message.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getTagStyles(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* Timeline Footer / Input */}
      <footer className="p-4 border-t border-slate-200 bg-white">
        <form onSubmit={handleSubmitNote} className="relative">
          <label htmlFor="clinician-note" className="sr-only">
            Add a clinician note
          </label>
          <input
            id="clinician-note"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all text-sm cursor-text"
            placeholder="Add a clinician note..."
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 p-1 text-sky-500 hover:text-sky-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 rounded cursor-pointer disabled:opacity-50"
            disabled={!note.trim()}
            aria-label="Send note"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </footer>
    </section>
  );
}
