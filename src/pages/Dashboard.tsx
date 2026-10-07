import React from 'react';
import { Globe, MessageSquare, Lightbulb, Zap } from 'lucide-react';
import { useLanguage } from '../stores/useLanguageStore';
import { useNavigation } from '../stores/useNavigationStore';

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { navigateTo } = useNavigation();

  return (
    <div className="flex-1 flex flex-col justify-center px-8 max-w-xl">
      {/* Hero Title and Subtitle matching the mockup */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          {t('dashboard.heroTitlePrefix')}
          <span className="bg-gradient-to-r from-nova-cyan to-nova-blue bg-clip-text text-transparent">
            {t('dashboard.heroTitleHighlight')}
          </span>
        </h1>
        <p className="text-sm text-slate-300 font-normal leading-relaxed">
          {t('dashboard.heroSubtitle')}
        </p>
      </div>

      {/* 4 Feature & Quick-Action Cards */}
      <div className="grid grid-cols-1 gap-3.5">
        {/* Card 1: Multilingual Capability */}
        <div className="p-4 rounded-2xl glass-panel glass-panel-hover flex items-start gap-3.5 group cursor-default transition-all duration-300 hover:shadow-elevation-2">
          <div className="p-2.5 rounded-xl bg-nova-cyan/15 border border-nova-cyan/40 text-nova-cyan group-hover:scale-110 group-hover:shadow-glow-cyan transition-all duration-200 flex-shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              {t('dashboard.cards.languages.title')}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-snug">
              {t('dashboard.cards.languages.description')}
            </p>
          </div>
        </div>

        {/* Card 2: Get Answers (Navigates to Ask AI) */}
        <div
          onClick={() => navigateTo('ask_ai')}
          className="p-4 rounded-2xl glass-panel glass-panel-hover flex items-start gap-3.5 group cursor-pointer transition-all duration-300 hover:shadow-elevation-2 active:scale-98"
        >
          <div className="p-2.5 rounded-xl bg-blue-500/15 border border-blue-400/40 text-blue-400 group-hover:scale-110 group-hover:shadow-glow-blue transition-all duration-200 flex-shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="text-sm font-semibold text-white tracking-wide group-hover:text-blue-300 transition-colors duration-200">
              {t('dashboard.cards.answers.title')}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-snug">
              {t('dashboard.cards.answers.description')}
            </p>
          </div>
        </div>

        {/* Card 3: Be More Productive (Navigates to Rewrite/File) */}
        <div
          onClick={() => navigateTo('rewrite')}
          className="p-4 rounded-2xl glass-panel glass-panel-hover flex items-start gap-3.5 group cursor-pointer transition-all duration-300 hover:shadow-elevation-2 active:scale-98"
        >
          <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 group-hover:scale-110 group-hover:shadow-glow-cyan-md transition-all duration-200 flex-shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="text-sm font-semibold text-white tracking-wide group-hover:text-cyan-300 transition-colors duration-200">
              {t('dashboard.cards.productive.title')}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-snug">
              {t('dashboard.cards.productive.description')}
            </p>
          </div>
        </div>

        {/* Card 4: Work Smarter (Navigates to Study Mode) */}
        <div
          onClick={() => navigateTo('study_mode')}
          className="p-4 rounded-2xl glass-panel glass-panel-hover flex items-start gap-3.5 group cursor-pointer transition-all duration-300 hover:shadow-elevation-2 active:scale-98"
        >
          <div className="p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-400/40 text-indigo-400 group-hover:scale-110 group-hover:shadow-glow-blue transition-all duration-200 flex-shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="text-sm font-semibold text-white tracking-wide group-hover:text-indigo-300 transition-colors duration-200">
              {t('dashboard.cards.smarter.title')}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-snug">
              {t('dashboard.cards.smarter.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
