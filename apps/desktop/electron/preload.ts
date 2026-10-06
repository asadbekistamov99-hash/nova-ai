import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  sendVoiceCommand: (cmd: string) => ipcRenderer.invoke('voice-command', cmd),
  onGlobalShortcut: (callback: (shortcut: string) => void) => {
    ipcRenderer.on('shortcut-triggered', (_event, sc) => callback(sc));
  },
});
