import { useState, useEffect } from 'react';

export interface SettingsState {
  privacyMode: boolean;
  activeProvider: 'openai' | 'gemini' | 'claude' | 'ollama';
  globalShortcut: string;
  autoStart: boolean;
  localOllamaUrl: string;
}

const DEFAULT_SETTINGS: SettingsState = {
  privacyMode: false,
  activeProvider: 'gemini',
  globalShortcut: 'Ctrl+Space',
  autoStart: false,
  localOllamaUrl: 'http://127.0.0.1:11434',
};

let currentSettings: SettingsState = { ...DEFAULT_SETTINGS };

// Load from localStorage if present
try {
  const saved = localStorage.getItem('nova_settings');
  if (saved) {
    currentSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  }
} catch {
  // Use default
}

const listeners = new Set<(settings: SettingsState) => void>();

export const updateSettings = (partial: Partial<SettingsState>) => {
  currentSettings = { ...currentSettings, ...partial };
  localStorage.setItem('nova_settings', JSON.stringify(currentSettings));
  listeners.forEach((fn) => fn(currentSettings));
};

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsState>(currentSettings);

  useEffect(() => {
    const listener = (newVal: SettingsState) => setSettings(newVal);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    settings,
    updateSettings,
  };
};
