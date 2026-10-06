import React, { useState, useEffect, useRef } from 'react';
import { FileText, Upload, Sparkles, Table, FileSearch, CheckCircle2, Bot } from 'lucide-react';
import { useLanguage } from '../../stores/useLanguageStore';
import { useRobot } from '../../stores/useRobotStore';

export const FileAiView: React.FC = () => {
  const { t } = useLanguage();
  const { setRobotState } = useRobot();
  const [selectedFileName, setSelectedFileName] = useState<string | null>('Annual_Financial_Report_2025.pdf');
  const [fileAnalysis, setFileAnalysis] = useState<string>(
    '### Executive Summary\n- Total Annual Revenue: $4.2M (+18% YoY)\n- Primary Growth Vector: AI Software Solutions\n- Risk Assessment: Supply chain lead time mitigated\n\n### Key Metrics Table\n| Metric | Q1 | Q2 | Q3 | Q4 |\n|---|---|---|---|---|\n| Gross Margin | 72% | 74% | 75% | 76% |'
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAction = (actionName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setRobotState('PROCESSING', `Executing ${actionName} on document...`);
    timeoutRef.current = setTimeout(() => {
      setRobotState('SUCCESS', `${actionName} finished`);
      setFileAnalysis(`[${actionName} Mode]: Generated comprehensive results for "${selectedFileName}". Preprocessed safely using local PyMuPDF parser.`);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-8.5rem)] px-6 py-2 overflow-y-auto">
      <div className="flex items-center justify-between pb-3 border-b border-nova-border/50">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-nova-cyan" />
          <h2 className="text-base font-bold text-white tracking-wide">{t('modules.file_ai')}</h2>
        </div>

        <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-nova-border">
          Supported: PDF, DOCX, XLSX, PPTX, TXT, CSV
        </span>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div className="my-3 p-4 rounded-xl border-2 border-dashed border-nova-border hover:border-nova-cyan/80 bg-[#060e22]/50 flex items-center justify-between cursor-pointer transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-nova-cyan/10 border border-nova-cyan/30 text-nova-cyan">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">
              {selectedFileName || 'Drop document or click to browse'}
            </h4>
            <span className="text-[10px] text-slate-400">Local preprocessing enabled</span>
          </div>
        </div>

        {selectedFileName && (
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> Loaded
          </span>
        )}
      </div>

      {/* Action Chips */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {[
          'Summarize',
          'Ask Questions',
          'Translate Doc',
          'Extract Tables',
          'Explain Document',
          'Generate Notes',
          'Rename Intelligently',
        ].map((act) => (
          <button
            key={act}
            onClick={() => handleAction(act)}
            className="px-2.5 py-1 text-xs rounded-lg glass-panel hover:bg-nova-cyan hover:text-slate-950 font-medium text-slate-300 transition-colors border border-nova-border hover:border-nova-cyan"
          >
            {act}
          </button>
        ))}
      </div>

      {/* Analysis Preview Area */}
      <div className="flex-1 rounded-xl glass-panel p-4 bg-[#081533]/80 flex flex-col">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-nova-border/50">
          <span className="text-xs font-semibold text-nova-cyan flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Document Insights
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(fileAnalysis)}
            className="text-xs text-slate-400 hover:text-white"
          >
            Copy Markdown
          </button>
        </div>
        <div className="flex-1 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed select-text overflow-y-auto">
          {fileAnalysis}
        </div>
      </div>
    </div>
  );
};
