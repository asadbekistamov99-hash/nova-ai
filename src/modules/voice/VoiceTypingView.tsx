import React, { useState } from 'react';
import { Mic, MicOff, Sparkles, Check, Copy, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../stores/useLanguageStore';
import { useRobot } from '../../stores/useRobotStore';

export const VoiceTypingView: React.FC = () => {
  const { t } = useLanguage();
  const { setRobotState } = useRobot();
  const [isRecording, setIsRecording] = useState(false);
  const [lang, setLang] = useState('uz');
  const [autoPunctuation, setAutoPunctuation] = useState(true);
  const [rawText, setRawText] = useState('hurmatli rektor vergul yangi qator talabalar ilmiy anjumani haqida hisobot taqdim etiladi');
  const [polishedText, setPolishedText] = useState('Hurmatli rektor,\n\nTalabalar ilmiy anjumani haqida hisobot taqdim etiladi.');
  const [copied, setCopied] = useState(false);

  const toggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setRobotState('PROCESSING', 'Refining spoken text with AI grammar...');
      setTimeout(() => {
        setRobotState('SUCCESS', 'Transcription ready');
      }, 1000);
    } else {
      setIsRecording(true);
      setRobotState('LISTENING', 'Listening to microphone...');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-8.5rem)] px-6 py-2 overflow-y-auto">
      <div className="flex items-center justify-between pb-3 border-b border-nova-border/50">
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-nova-cyan" />
          <h2 className="text-base font-bold text-white tracking-wide">{t('modules.voice_typing')}</h2>
        </div>

        {/* Language & Auto-punctuation toggle */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={autoPunctuation}
              onChange={(e) => setAutoPunctuation(e.target.checked)}
              className="accent-nova-cyan"
            />
            <span>Auto Punctuation</span>
          </label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-[#091530] text-xs text-nova-cyan border border-nova-border rounded-lg px-2.5 py-1 focus:outline-none"
          >
            <option value="uz">Uzbek (O'zbek tili)</option>
            <option value="en">English (US/UK)</option>
            <option value="ru">Russian (Русский)</option>
          </select>
        </div>
      </div>

      {/* Center Recording Trigger */}
      <div className="my-5 flex flex-col items-center justify-center gap-3">
        <button
          onClick={toggleRecord}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            isRecording
              ? 'bg-red-500 text-white shadow-[0_0_35px_rgba(239,68,68,0.7)] animate-pulse'
              : 'bg-gradient-to-r from-nova-blue to-nova-cyan text-white shadow-glow-ring hover:scale-105'
          }`}
        >
          {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </button>

        <span className="text-xs font-medium text-slate-300">
          {isRecording ? 'Listening... Speak naturally' : 'Click to start voice dictation'}
        </span>
      </div>

      {/* Dual Results: Raw Dictation vs Polished AI Output */}
      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Raw Voice Transcription */}
        <div className="flex flex-col rounded-xl glass-panel p-3.5">
          <span className="text-xs font-semibold text-slate-400 mb-2">Raw Speech Stream</span>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-300 resize-none focus:outline-none font-mono leading-relaxed"
            placeholder="Spoken words appear here..."
          />
        </div>

        {/* AI Polished Final Text */}
        <div className="flex flex-col rounded-xl glass-panel p-3.5 bg-[#081533]/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-nova-cyan flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Formatted & Polished
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(polishedText);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="text-slate-400 hover:text-white"
                title="Copy"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          <div className="flex-1 text-sm text-slate-100 font-sans leading-relaxed whitespace-pre-wrap select-text">
            {polishedText}
          </div>
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => alert('Text transmitted to active foreground window via Windows SendInput API.')}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-nova-cyan text-slate-950 font-bold shadow-glow-cyan-sm"
            >
              <ArrowUpRight className="w-3.5 h-3.5" /> Insert into Active App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
