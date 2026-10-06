import React, { useState } from 'react';
import { Languages, ArrowRightLeft, Copy, Check, Clipboard } from 'lucide-react';
import { useLanguage } from '../../stores/useLanguageStore';
import { useRobot } from '../../stores/useRobotStore';

export const TranslateView: React.FC = () => {
  const { t } = useLanguage();
  const { setRobotState } = useRobot();
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('uz');
  const [mode, setMode] = useState('Professional');
  const [sourceText, setSourceText] = useState('Artificial intelligence is transforming desktop productivity.');
  const [translatedText, setTranslatedText] = useState('Sun\'iy intellekt ish stoli samaradorligini tubdan o\'zgartirmoqda.');
  const [copied, setCopied] = useState(false);

  const handleTranslate = () => {
    if (!sourceText.trim()) return;
    setRobotState('THINKING', 'Translating with stylistic precision...');
    setTimeout(() => {
      setRobotState('SUCCESS', 'Translation ready');
      if (targetLang === 'ru') {
        setTranslatedText('Искусственный интеллект трансформирует производительность на рабочем столе.');
      } else if (targetLang === 'en') {
        setTranslatedText('Artificial intelligence is transforming desktop productivity.');
      } else {
        setTranslatedText('Sun\'iy intellekt ish stoli samaradorligini tubdan o\'zgartirmoqda.');
      }
    }, 800);
  };

  const handleSwap = () => {
    if (sourceLang === 'auto') return;
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    const tempTxt = sourceText;
    setSourceText(translatedText);
    setTranslatedText(tempTxt);
  };

  const handleConvertScript = (direction: 'latin-to-cyrillic' | 'cyrillic-to-latin') => {
    setRobotState('PROCESSING', 'Converting script...');
    setTimeout(() => {
      setRobotState('SUCCESS', 'Script converted');
      if (direction === 'latin-to-cyrillic') {
        setTranslatedText('Сунъий интеллект иш столи самарадорлигини тубдан ўзгартирмоқда.');
      } else {
        setTranslatedText('Sun\'iy intellekt ish stoli samaradorligini tubdan o\'zgartirmoqda.');
      }
    }, 500);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-8.5rem)] px-6 py-2">
      <div className="flex items-center justify-between pb-3 border-b border-nova-border/50">
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-nova-cyan" />
          <h2 className="text-base font-bold text-white tracking-wide">{t('modules.translate')}</h2>
        </div>

        {/* Script & Clipboard Utilities */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleConvertScript('latin-to-cyrillic')}
            className="text-[11px] px-2 py-1 bg-[#091530] text-slate-300 hover:text-nova-cyan rounded border border-nova-border transition-colors"
          >
            Latin → Kirill
          </button>
          <button
            onClick={() => handleConvertScript('cyrillic-to-latin')}
            className="text-[11px] px-2 py-1 bg-[#091530] text-slate-300 hover:text-nova-cyan rounded border border-nova-border transition-colors"
          >
            Кирилл → Lotin
          </button>
        </div>
      </div>

      {/* Language selectors & Tone row */}
      <div className="flex items-center justify-between my-3 bg-[#08132e]/60 p-2 rounded-xl border border-nova-border/60">
        <div className="flex items-center gap-3">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="bg-[#050b1a] text-xs text-white border border-nova-border rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="auto">Auto Detect Language</option>
            <option value="en">English</option>
            <option value="uz">Uzbek (O'zbek)</option>
            <option value="ru">Russian (Русский)</option>
          </select>

          <button
            onClick={handleSwap}
            disabled={sourceLang === 'auto'}
            className="p-1.5 rounded-lg hover:bg-white/10 text-nova-cyan transition-colors disabled:opacity-30"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="bg-[#050b1a] text-xs text-nova-cyan border border-nova-border rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="uz">Uzbek (O'zbek)</option>
            <option value="en">English</option>
            <option value="ru">Russian (Русский)</option>
          </select>
        </div>

        {/* Translation Mode */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400">Tone:</span>
          {['Normal', 'Professional', 'Academic', 'Simple'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-2 py-1 text-[11px] rounded-md transition-colors ${
                mode === m ? 'bg-nova-cyan text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Split Translation Panes */}
      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Source Box */}
        <div className="flex flex-col rounded-xl glass-panel p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Source Text</span>
            <button
              onClick={async () => {
                const clip = await navigator.clipboard.readText();
                if (clip) setSourceText(clip);
              }}
              className="flex items-center gap-1 text-[10px] text-nova-cyan hover:underline"
            >
              <Clipboard className="w-3 h-3" /> Paste Clipboard
            </button>
          </div>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-100 resize-none focus:outline-none placeholder-slate-500 font-sans leading-relaxed"
            placeholder="Type or paste text to translate..."
          />
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleTranslate}
              className="px-4 py-1.5 rounded-lg bg-nova-cyan text-slate-950 text-xs font-bold shadow-glow-cyan-sm hover:opacity-95"
            >
              Translate
            </button>
          </div>
        </div>

        {/* Output Box */}
        <div className="flex flex-col rounded-xl glass-panel p-3 bg-[#081533]/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-nova-cyan">Translated Output</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(translatedText);
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
            {translatedText}
          </div>
        </div>
      </div>
    </div>
  );
};
