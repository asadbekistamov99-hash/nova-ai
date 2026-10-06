import React, { useState } from 'react';
import { Mic, Play, Settings as SettingsIcon, Sparkles } from 'lucide-react';
import { useLanguage } from '../../stores/useLanguageStore';
import { useRobot } from '../../stores/useRobotStore';
import { useNavigation } from '../../stores/useNavigationStore';
import { IntentRouter } from '../../services/intentRouter';

export const CommandBar: React.FC = () => {
  const { t } = useLanguage();
  const { robotState, setRobotState, triggerRobotPulse } = useRobot();
  const { navigateTo } = useNavigation();
  const [commandText, setCommandText] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [routedHint, setRoutedHint] = useState<string | null>(null);

  const handleToggleVoice = () => {
    if (isVoiceActive) {
      setIsVoiceActive(false);
      setRobotState('IDLE');
    } else {
      setIsVoiceActive(true);
      setRobotState('LISTENING');
      // Simulated voice input demo
      setTimeout(() => {
        setCommandText('Translate this text into Russian');
        setIsVoiceActive(false);
        setRobotState('THINKING');
      }, 2500);
    }
  };

  const handleExecuteCommand = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!commandText.trim()) return;

    const input = commandText.trim();
    setRobotState('THINKING');

    // Intent routing
    setTimeout(() => {
      const result = IntentRouter.routeCommand(input);
      setRobotState('PROCESSING');
      setRoutedHint(result.explanation);

      setTimeout(() => {
        setRobotState('SUCCESS');
        navigateTo(result.intent);

        setTimeout(() => {
          setRobotState('IDLE');
          setRoutedHint(null);
          setCommandText('');
        }, 1800);
      }, 800);
    }, 600);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4 select-none z-30">
      {/* Dynamic intent feedback bubble if available */}
      {routedHint && (
        <div className="mb-2 flex items-center justify-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-nova-cyan/40 text-xs text-nova-cyan shadow-glow-cyan-sm animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{routedHint}</span>
          </div>
        </div>
      )}

      {/* Floating Glassmorphic Command Bar Dock */}
      <div className="relative flex items-center gap-3 p-2 rounded-2xl bg-[#091530]/85 border border-nova-border/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Large Glowing Microphone Button */}
        <div className="relative flex flex-col items-center">
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
              isVoiceActive || robotState === 'LISTENING'
                ? 'bg-gradient-to-r from-nova-cyan to-nova-blue text-white shadow-glow-ring scale-105'
                : 'bg-[#0f214a] text-nova-cyan border border-nova-cyan/50 hover:border-nova-cyan hover:shadow-glow-cyan-sm'
            }`}
            title="Toggle Voice Command"
          >
            {/* Outer animated halo ring */}
            {(isVoiceActive || robotState === 'LISTENING') && (
              <span className="absolute -inset-1 rounded-full border-2 border-nova-cyan animate-ping opacity-40 pointer-events-none"></span>
            )}
            <Mic className="w-5 h-5" />
          </button>
        </div>

        {/* Text Input with embedded waveform indicator */}
        <form onSubmit={handleExecuteCommand} className="flex-1 flex flex-col justify-center">
          <div className="relative flex items-center">
            <input
              type="text"
              value={commandText}
              onChange={(e) => setCommandText(e.target.value)}
              placeholder={t('commandBar.placeholder')}
              className="w-full bg-[#050d20]/70 text-slate-100 placeholder-slate-400 text-sm px-4 py-2.5 rounded-xl border border-nova-border/50 focus:outline-none focus:border-nova-cyan/80 focus:shadow-glow-cyan-sm transition-all"
            />
          </div>

          {/* Sub-label showing "Listening..." or sample commands */}
          <div className="flex items-center gap-2 mt-1 px-1">
            {isVoiceActive || robotState === 'LISTENING' ? (
              <div className="flex items-center gap-1.5 text-[11px] text-nova-cyan font-medium">
                <span className="flex items-center gap-0.5">
                  <span className="w-1 h-3 bg-nova-cyan rounded-full animate-bounce"></span>
                  <span className="w-1 h-4 bg-nova-cyan rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-1 h-2 bg-nova-cyan rounded-full animate-bounce [animation-delay:0.3s]"></span>
                </span>
                <span>{t('commandBar.listening')}</span>
              </div>
            ) : (
              <span className="text-[10px] text-slate-500 truncate">
                {t('commandBar.examples')}
              </span>
            )}
          </div>
        </form>

        {/* "Run" Action Button */}
        <button
          type="button"
          onClick={() => handleExecuteCommand()}
          disabled={!commandText.trim()}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
            commandText.trim()
              ? 'bg-gradient-to-r from-nova-blue to-nova-cyan text-white shadow-glow-pill hover:opacity-95 cursor-pointer'
              : 'bg-slate-800/60 text-slate-500 border border-slate-700/40 cursor-not-allowed'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{t('commandBar.run')}</span>
        </button>

        {/* Settings Button */}
        <button
          type="button"
          onClick={() => navigateTo('settings')}
          className="p-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors border border-transparent hover:border-nova-border"
          title={t('modules.settings')}
        >
          <SettingsIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
