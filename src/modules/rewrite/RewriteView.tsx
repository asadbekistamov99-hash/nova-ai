import React, { useState, useEffect, useRef } from 'react';
import { PenTool, Sparkles, Copy, Check } from 'lucide-react';
import { useLanguage } from '../../stores/useLanguageStore';
import { useRobot } from '../../stores/useRobotStore';

const PREDEFINED_MODES = [
  'Professional',
  'Academic',
  'Shorter',
  'Longer',
  'Friendly',
  'Formal',
  'Simple',
  'Correct grammar',
  'Improve clarity',
];

export const RewriteView: React.FC = () => {
  const { t } = useLanguage();
  const { setRobotState } = useRobot();
  const [inputText, setInputText] = useState('We need to talk about the project delay ASAP because the client is mad.');
  const [outputText, setOutputText] = useState('I would like to urgently discuss the timeline adjustments regarding our ongoing milestone to ensure stakeholder satisfaction.');
  const [selectedMode, setSelectedMode] = useState('Professional');
  const [customInstruction, setCustomInstruction] = useState('');
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleRewrite = () => {
    if (!inputText.trim()) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setRobotState('THINKING', `Polishing text (${selectedMode})...`);
    timeoutRef.current = setTimeout(() => {
      setRobotState('SUCCESS', 'Text refined successfully');
      if (customInstruction.toLowerCase().includes('rector') || customInstruction.toLowerCase().includes('rektor')) {
        setOutputText('Hurmatli rektor janoblari, Sizga joriy ta\'lim loyihasining hisoboti va istiqbolli rejalarini ko\'rib chiqishingiz uchun ehtirom bilan taqdim etamiz.');
      } else if (customInstruction.toLowerCase().includes('telegram')) {
        setOutputText('⚡️ Diqqat hamkasblar! Loyiha bo\'yicha yangilangan muddatlar e\'lon qilindi. Tafsilotlar quyidagi havolada! 🚀');
      } else {
        setOutputText(`[${selectedMode} Edition]: ${inputText.replace('mad', 'demanding resolution').replace('ASAP', 'at your earliest convenience')}`);
      }
    }, 750);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-8.5rem)] px-6 py-2 overflow-y-auto">
      <div className="flex items-center justify-between pb-3 border-b border-nova-border/50">
        <div className="flex items-center gap-2">
          <PenTool className="w-5 h-5 text-nova-cyan" />
          <h2 className="text-base font-bold text-white tracking-wide">{t('modules.rewrite')}</h2>
        </div>
      </div>

      {/* Preset Modes Badges */}
      <div className="my-3 flex flex-wrap gap-1.5">
        {PREDEFINED_MODES.map((mode) => (
          <button
            key={mode}
            onClick={() => setSelectedMode(mode)}
            className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${
              selectedMode === mode
                ? 'bg-nova-cyan text-slate-950 font-bold border-nova-cyan shadow-glow-cyan-sm'
                : 'glass-panel text-slate-300 border-nova-border hover:border-nova-cyan/50'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Custom Instruction Bar */}
      <div className="mb-3">
        <input
          type="text"
          value={customInstruction}
          onChange={(e) => setCustomInstruction(e.target.value)}
          placeholder="Custom directive (e.g., 'Rewrite this for a rector' or 'Make this suitable for Telegram')"
          className="w-full bg-[#07132e] text-xs text-white px-3.5 py-2 rounded-xl border border-nova-border focus:outline-none focus:border-nova-cyan placeholder-slate-400"
        />
      </div>

      {/* Input / Output Grid */}
      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Source Text Input */}
        <div className="flex flex-col rounded-xl glass-panel p-3.5">
          <span className="text-xs font-semibold text-slate-400 mb-2">Original Text</span>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-100 resize-none focus:outline-none placeholder-slate-500 leading-relaxed font-sans"
            placeholder="Enter draft text here..."
          />
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleRewrite}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-nova-cyan text-slate-950 text-xs font-bold shadow-glow-cyan-sm hover:opacity-95"
            >
              <Sparkles className="w-3.5 h-3.5" /> Rewrite
            </button>
          </div>
        </div>

        {/* Polished Result Output */}
        <div className="flex flex-col rounded-xl glass-panel p-3.5 bg-[#081533]/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-nova-cyan">Refined Output</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(outputText);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-slate-400 hover:text-white transition-colors"
              title="Copy"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="flex-1 text-sm text-slate-100 font-sans leading-relaxed whitespace-pre-wrap select-text">
            {outputText}
          </div>
        </div>
      </div>
    </div>
  );
};
