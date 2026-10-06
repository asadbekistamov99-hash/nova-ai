import { useState, useEffect } from 'react';

export type NavModule =
  | 'dashboard'
  | 'ask_ai'
  | 'screenshot_ai'
  | 'translate'
  | 'rewrite'
  | 'ocr'
  | 'clipboard'
  | 'voice_typing'
  | 'file_ai'
  | 'study_mode'
  | 'meeting_notes'
  | 'settings';

let currentModule: NavModule = 'dashboard';
const listeners = new Set<(mod: NavModule) => void>();

export const navigateTo = (mod: NavModule) => {
  currentModule = mod;
  listeners.forEach((fn) => fn(mod));
};

export const useNavigation = () => {
  const [activeModule, setActiveModule] = useState<NavModule>(currentModule);

  useEffect(() => {
    const listener = (mod: NavModule) => setActiveModule(mod);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    activeModule,
    navigateTo,
  };
};
