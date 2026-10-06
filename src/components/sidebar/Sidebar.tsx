import React from 'react';
import {
  MessageSquare,
  Crop,
  Languages,
  PenTool,
  ScanText,
  ClipboardList,
  Mic,
  FileText,
  GraduationCap,
  Users,
  ChevronRight,
  LayoutDashboard,
} from 'lucide-react';
import { useLanguage } from '../../stores/useLanguageStore';
import { useNavigation, NavModule } from '../../stores/useNavigationStore';

interface ModuleItem {
  id: NavModule;
  labelKey: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MODULE_LIST: ModuleItem[] = [
  { id: 'ask_ai', labelKey: 'modules.ask_ai', icon: MessageSquare },
  { id: 'screenshot_ai', labelKey: 'modules.screenshot_ai', icon: Crop },
  { id: 'translate', labelKey: 'modules.translate', icon: Languages },
  { id: 'rewrite', labelKey: 'modules.rewrite', icon: PenTool },
  { id: 'ocr', labelKey: 'modules.ocr', icon: ScanText },
  { id: 'clipboard', labelKey: 'modules.clipboard', icon: ClipboardList },
  { id: 'voice_typing', labelKey: 'modules.voice_typing', icon: Mic },
  { id: 'file_ai', labelKey: 'modules.file_ai', icon: FileText },
  { id: 'study_mode', labelKey: 'modules.study_mode', icon: GraduationCap },
  { id: 'meeting_notes', labelKey: 'modules.meeting_notes', icon: Users },
];

export const Sidebar: React.FC = () => {
  const { t } = useLanguage();
  const { activeModule, navigateTo } = useNavigation();

  return (
    <aside className="w-64 h-[calc(100vh-2.75rem)] bg-nova-sidebar/95 border-r border-nova-border flex flex-col justify-between py-3 px-3 select-none z-40 backdrop-blur-xl">
      <div className="flex flex-col gap-1.5">
        {/* Dashboard / Home shortcut button */}
        <button
          onClick={() => navigateTo('dashboard')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
            activeModule === 'dashboard'
              ? 'sidebar-item-active text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/40 border border-transparent'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 text-nova-cyan" />
          <span className="flex-1 text-left tracking-wide">Overview</span>
          {activeModule === 'dashboard' && <ChevronRight className="w-4 h-4 text-nova-cyan" />}
        </button>

        <div className="h-[1px] bg-nova-border/60 my-1"></div>

        {/* 10 Primary Functional Modules */}
        <div className="flex flex-col gap-1">
          {MODULE_LIST.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium group relative ${
                  isActive
                    ? 'sidebar-item-active text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                {/* Active left indicator glow */}
                {isActive && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-nova-cyan rounded-r shadow-glow-cyan-sm"></div>
                )}

                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-nova-cyan' : 'text-slate-400 group-hover:text-nova-cyan'
                  }`}
                />

                <span className="flex-1 text-left tracking-wide truncate">
                  {t(item.labelKey)}
                </span>

                {isActive && (
                  <ChevronRight className="w-4 h-4 text-nova-cyan transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer system status indicator */}
      <div className="px-3 py-2 rounded-xl bg-[#091530]/60 border border-nova-border/40 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
          <span className="text-[11px] text-slate-300 font-mono">v1.0.0-PROD</span>
        </div>
        <span className="text-[10px] text-nova-cyan font-semibold uppercase tracking-wider">ONLINE</span>
      </div>
    </aside>
  );
};
