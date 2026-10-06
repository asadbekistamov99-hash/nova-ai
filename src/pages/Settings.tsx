import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Cpu, Mic, Globe, Keyboard, Info, Check } from 'lucide-react';
import { useLanguage } from '../stores/useLanguageStore';
import { useSettings } from '../stores/useSettingsStore';

export const Settings: React.FC = () => {
  const { t } = useLanguage();
  const { settings, updateSettings } = useSettings();
  const [activeTab, setActiveTab] = useState<'general' | 'models' | 'shortcuts' | 'privacy' | 'about'>('general');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-8.5rem)] px-8 py-2 overflow-y-auto">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-nova-border/50">
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-nova-cyan" />
          <h2 className="text-base font-bold text-white tracking-wide">{t('settings.title')}</h2>
        </div>

        {savedNotice && (
          <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40 animate-pulse">
            <Check className="w-3.5 h-3.5" /> Settings Saved Locally
          </span>
        )}
      </div>

      {/* Tabs Header */}
      <div className="my-3 flex items-center gap-2 border-b border-nova-border/30 pb-2">
        {[
          { id: 'general', label: t('settings.tabs.general'), icon: SettingsIcon },
          { id: 'models', label: t('settings.tabs.models'), icon: Cpu },
          { id: 'shortcuts', label: t('settings.tabs.shortcuts'), icon: Keyboard },
          { id: 'privacy', label: t('settings.tabs.privacy'), icon: Shield },
          { id: 'about', label: t('settings.tabs.about'), icon: Info },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-nova-cyan text-slate-950 font-bold shadow-glow-cyan-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="flex-1 rounded-2xl glass-panel p-5 bg-[#081533]/85 overflow-y-auto max-w-2xl">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1">
                Launch on Windows Startup
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.autoStart}
                  onChange={(e) => updateSettings({ autoStart: e.target.checked })}
                  className="accent-nova-cyan"
                />
                <span className="text-xs text-slate-400">Silently start in system tray at boot</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1">
                System Tray Minimization
              </label>
              <span className="text-xs text-slate-400 block mb-2">
                Closing window minimizes to the Windows system tray rather than terminating process.
              </span>
            </div>
          </div>
        )}

        {activeTab === 'models' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1">
                {t('settings.providerLabel')}
              </label>
              <select
                value={settings.activeProvider}
                onChange={(e) => updateSettings({ activeProvider: e.target.value as any })}
                className="w-full bg-[#050b1a] text-xs text-nova-cyan border border-nova-border rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="gemini">Google Gemini (Gemini 2.5 Pro / Flash)</option>
                <option value="openai">OpenAI (GPT-4o, o3-mini)</option>
                <option value="claude">Anthropic Claude (Claude 3.5 Sonnet)</option>
                <option value="ollama">Local Ollama (Llama 3 / Qwen 2.5 / Mistral)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1">
                Google Gemini API Key
              </label>
              <input
                type="password"
                value={settings.gemini_api_key}
                onChange={(e) => updateSettings({ gemini_api_key: e.target.value })}
                placeholder="Get from console.cloud.google.com"
                className="w-full bg-[#050b1a] text-xs text-white border border-nova-border rounded-xl px-3 py-2 focus:outline-none placeholder-slate-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">Get from: https://aistudio.google.com/apikey</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1">
                OpenAI API Key
              </label>
              <input
                type="password"
                value={settings.openai_api_key}
                onChange={(e) => updateSettings({ openai_api_key: e.target.value })}
                placeholder="Get from platform.openai.com/account/api-keys"
                className="w-full bg-[#050b1a] text-xs text-white border border-nova-border rounded-xl px-3 py-2 focus:outline-none placeholder-slate-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">Get from: https://platform.openai.com/account/api-keys</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1">
                Anthropic Claude API Key
              </label>
              <input
                type="password"
                value={settings.claude_api_key}
                onChange={(e) => updateSettings({ claude_api_key: e.target.value })}
                placeholder="Get from console.anthropic.com"
                className="w-full bg-[#050b1a] text-xs text-white border border-nova-border rounded-xl px-3 py-2 focus:outline-none placeholder-slate-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">Get from: https://console.anthropic.com/account/keys</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1">
                Local Ollama Endpoint URL
              </label>
              <input
                type="text"
                value={settings.localOllamaUrl}
                onChange={(e) => updateSettings({ localOllamaUrl: e.target.value })}
                className="w-full bg-[#050b1a] text-xs text-white border border-nova-border rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-nova-border text-xs text-slate-300">
              <span className="font-semibold text-nova-cyan block mb-1">Secret Storage Security</span>
              API Keys are stored in browser localStorage. Keep them private and never share publicly.
            </div>
          </div>
        )}

        {activeTab === 'shortcuts' && (
          <div className="space-y-3">
            {[
              { label: 'Open / Toggle NOVA AI', key: 'Ctrl + Space' },
              { label: 'Capture Screenshot AI', key: 'Ctrl + Shift + S' },
              { label: 'Smart Clipboard Manager', key: 'Ctrl + Shift + V' },
              { label: 'Voice Command Activation', key: 'Ctrl + Shift + M' },
            ].map((sc) => (
              <div key={sc.label} className="flex items-center justify-between p-2.5 rounded-xl bg-[#050c20] border border-nova-border/50">
                <span className="text-xs text-slate-200">{sc.label}</span>
                <span className="text-xs font-mono font-bold text-nova-cyan bg-[#0a183d] px-2.5 py-1 rounded border border-nova-cyan/30">
                  {sc.key}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-nova-border">
              <input
                type="checkbox"
                checked={settings.privacyMode}
                onChange={(e) => updateSettings({ privacyMode: e.target.checked })}
                className="accent-nova-cyan mt-0.5"
              />
              <div>
                <h4 className="text-xs font-bold text-white mb-1">
                  {t('settings.privacyToggle')}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('settings.privacyHint')}
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-1.5 p-3 rounded-xl bg-[#050c20]">
              <span className="font-bold text-emerald-400 block mb-1">Active Privacy Protections:</span>
              <p>• Zero telemetry logging of keystrokes or passwords.</p>
              <p>• Local OCR on-device execution first.</p>
              <p>• Microphone recording displays explicit live indicator.</p>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full border-2 border-nova-cyan flex items-center justify-center shadow-glow-cyan-sm">
                <div className="w-4 h-4 rounded-full bg-nova-cyan"></div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">NOVA AI Windows Assistant</h3>
                <span className="text-[11px] text-slate-400 font-mono">Version 1.0.0-PROD (Build 2026.10)</span>
              </div>
            </div>
            <p>Designed and built as a production-grade multilingual AI companion for Windows 10 and Windows 11.</p>
            <p className="text-slate-400">© 2026 NOVA AI. All rights reserved.</p>
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-nova-border/50 flex justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-nova-blue to-nova-cyan text-white text-xs font-bold shadow-glow-pill hover:opacity-95"
          >
            {t('settings.save')}
          </button>
        </div>
      </div>
    </div>
  );
};
