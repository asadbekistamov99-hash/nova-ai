import React, { useState } from 'react';
import { ClipboardList, Search, Pin, Star, Trash2, Sparkles, Shield, Copy, Check } from 'lucide-react';
import { useLanguage } from '../../stores/useLanguageStore';
import { useRobot } from '../../stores/useRobotStore';

interface ClipEntry {
  id: string;
  type: 'code' | 'url' | 'text';
  content: string;
  timestamp: string;
  isPinned: boolean;
  isFavorite: boolean;
}

export const ClipboardView: React.FC = () => {
  const { t } = useLanguage();
  const { setRobotState } = useRobot();
  const [monitoringEnabled, setMonitoringEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [items, setItems] = useState<ClipEntry[]>([
    {
      id: '1',
      type: 'code',
      content: 'const electron = require("electron");\napp.whenReady().then(createWindow);',
      timestamp: '2 mins ago',
      isPinned: true,
      isFavorite: true,
    },
    {
      id: '2',
      type: 'url',
      content: 'https://docs.anthropic.com/en/api/getting-started',
      timestamp: '15 mins ago',
      isPinned: false,
      isFavorite: false,
    },
    {
      id: '3',
      type: 'text',
      content: 'Hurmatli hamkasblar, ertaga soat 10:00 da muhim loyiha yig\'ilishi bo\'lib o\'tadi.',
      timestamp: '1 hour ago',
      isPinned: false,
      isFavorite: false,
    },
  ]);

  const handleTogglePin = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, isPinned: !it.isPinned } : it))
    );
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleAiAction = (action: string, content: string) => {
    setRobotState('THINKING', `Applying AI ${action}...`);
    setTimeout(() => {
      setRobotState('SUCCESS', `AI ${action} completed`);
    }, 900);
  };

  const filteredItems = items.filter((it) =>
    it.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-8.5rem)] px-6 py-2 overflow-y-auto">
      <div className="flex items-center justify-between pb-3 border-b border-nova-border/50">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-nova-cyan" />
          <h2 className="text-base font-bold text-white tracking-wide">{t('modules.clipboard')}</h2>
        </div>

        {/* Privacy Guard Indicator */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={monitoringEnabled}
              onChange={(e) => setMonitoringEnabled(e.target.checked)}
              className="accent-nova-cyan"
            />
            <span>Active History</span>
          </label>
          <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
            <Shield className="w-3 h-3" /> Password Guard Active
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div className="my-3 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search clipboard history..."
          className="w-full bg-[#07132e] text-xs text-white pl-9 pr-4 py-2 rounded-xl border border-nova-border focus:outline-none focus:border-nova-cyan"
        />
      </div>

      {/* Clipboard Items List */}
      <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-xl glass-panel glass-panel-hover flex flex-col gap-2 relative group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#0e214d] text-nova-cyan border border-nova-border">
                  {item.type}
                </span>
                <span className="text-[10px] text-slate-400">{item.timestamp}</span>
              </div>

              {/* Pin, Copy, Delete Actions */}
              <div className="flex items-center gap-1.5 opacity-90">
                <button
                  onClick={() => handleTogglePin(item.id)}
                  className={`p-1 rounded hover:bg-white/10 ${item.isPinned ? 'text-nova-cyan' : 'text-slate-400'}`}
                >
                  <Pin className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(item.content);
                    setCopiedId(item.id);
                    setTimeout(() => setCopiedId(null), 2000);
                  }}
                  className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-200 font-mono line-clamp-3 select-text bg-[#040816]/60 p-2 rounded-lg border border-nova-border/30">
              {item.content}
            </p>

            {/* Quick AI Actions for this clip */}
            <div className="flex items-center gap-2 pt-1 border-t border-nova-border/30">
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-nova-cyan" /> AI Actions:
              </span>
              {['Summarize', 'Translate', 'Explain', 'Extract Data'].map((act) => (
                <button
                  key={act}
                  onClick={() => handleAiAction(act, item.content)}
                  className="text-[10px] px-2 py-0.5 rounded bg-[#0b1736] text-slate-300 hover:text-nova-cyan hover:border-nova-cyan border border-nova-border transition-colors"
                >
                  {act}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
