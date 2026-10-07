import React from 'react';
import { Globe, Minus, Square, X, ShieldAlert } from 'lucide-react';
import { useLanguage, Language } from '../../stores/useLanguageStore';
import { useSettings } from '../../stores/useSettingsStore';

export const CustomTitlebar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { settings } = useSettings();

  const handleMinimize = () => {
    if ((window as any).electronAPI?.minimize) {
      (window as any).electronAPI.minimize();
    }
  };

  const handleMaximize = () => {
    if ((window as any).electronAPI?.maximize) {
      (window as any).electronAPI.maximize();
    }
  };

  const handleClose = () => {
    if ((window as any).electronAPI?.close) {
      (window as any).electronAPI.close();
    }
  };

  return (
    <header className="h-11 w-full bg-nova-bg-deep/90 border-b border-nova-border flex items-center justify-between px-4 select-none app-drag z-50">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-3 app-no-drag">
        {/* Glowing concentric ring icon matching mockup */}
        <div className="relative flex items-center justify-center w-7 h-7">
          <div className="absolute inset-0 rounded-full border-2 border-nova-cyan/40 animate-ping opacity-25"></div>
          <div className="w-6 h-6 rounded-full border-2 border-nova-cyan flex items-center justify-center shadow-glow-cyan-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-nova-cyan"></div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-wider text-white font-sans">
              NOVA AI
            </span>
            {settings.privacyMode && (
              <span className="flex items-center gap-1 text-[10px] bg-emerald-950/80 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                <ShieldAlert className="w-2.5 h-2.5" />
                Private
              </span>
            )}
          </div>
          <span className="text-[10px] text-nova-muted font-normal leading-none">
            {t('app.tagline')}
          </span>
        </div>
      </div>

      {/* Right: Language Pill Selector & Window Controls */}
      <div className="flex items-center gap-4 app-no-drag">
        {/* Language selector: Globe + UZB | ENG | RUS */}
        <div className="flex items-center bg-[#07132b]/80 border border-nova-border/50 hover:border-nova-border rounded-full p-0.5 shadow-inner transition-all duration-200 backdrop-blur-sm">
          <div className="pl-2 pr-1.5 text-nova-cyan/80">
            <Globe className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold">
            {(['uz', 'en', 'ru'] as Language[]).map((lang) => {
              const isActive = language === lang;
              const labels: Record<Language, string> = {
                uz: 'UZB',
                en: 'ENG',
                ru: 'RUS',
              };
              return (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-nova-blue to-nova-cyan text-white shadow-glow-pill font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {labels[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Window controls */}
        <div className="flex items-center gap-0.5 text-slate-400">
          <button
            onClick={handleMinimize}
            className="w-8 h-8 flex items-center justify-center hover:bg-slate-700/60 hover:text-white rounded-md transition-all duration-200"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleMaximize}
            className="w-8 h-8 flex items-center justify-center hover:bg-slate-700/60 hover:text-white rounded-md transition-all duration-200"
            title="Maximize"
          >
            <Square className="w-3 h-3" />
          </button>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-red-600/80 hover:text-white rounded-md transition-all duration-200"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
