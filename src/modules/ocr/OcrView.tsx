import React, { useState, useEffect, useRef } from 'react';
import { ScanText, Upload, Table, FileText, Copy, Download, Bot } from 'lucide-react';
import { useLanguage } from '../../stores/useLanguageStore';
import { useRobot } from '../../stores/useRobotStore';
import { useNavigation } from '../../stores/useNavigationStore';

export const OcrView: React.FC = () => {
  const { t } = useLanguage();
  const { setRobotState } = useRobot();
  const { navigateTo } = useNavigation();
  const [outputFormat, setOutputFormat] = useState<'text' | 'table'>('table');
  const [targetOcrLang, setTargetOcrLang] = useState('uz+en+ru');
  const [ocrText, setOcrText] = useState(
    '| ID | Mahsulot Nomi | Miqdor | Narxi |\n|---|---|---|---|\n| 101 | AI Server GPU | 4 ta | $12,000 |\n| 102 | Workstation PC | 8 ta | $14,400 |'
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSimulateOcr = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setRobotState('PROCESSING', 'Processing image with Local OCR engine...');
    timeoutRef.current = setTimeout(() => {
      setRobotState('SUCCESS', 'OCR extraction finished');
    }, 1000);
  };

  const handleSaveTxt = () => {
    const blob = new Blob([ocrText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nova_ocr_export.txt';
    link.click();
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-8.5rem)] px-6 py-2 overflow-y-auto">
      <div className="flex items-center justify-between pb-3 border-b border-nova-border/50">
        <div className="flex items-center gap-2">
          <ScanText className="w-5 h-5 text-nova-cyan" />
          <h2 className="text-base font-bold text-white tracking-wide">{t('modules.ocr')}</h2>
        </div>

        {/* Local Engine Badge */}
        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Engine: Local Windows OCR</span>
        </div>
      </div>

      {/* Control bar */}
      <div className="my-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Format:</span>
          <button
            onClick={() => setOutputFormat('text')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border ${
              outputFormat === 'text'
                ? 'bg-nova-cyan text-slate-950 font-bold border-nova-cyan'
                : 'glass-panel text-slate-300 border-nova-border'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Plain Text
          </button>
          <button
            onClick={() => setOutputFormat('table')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border ${
              outputFormat === 'table'
                ? 'bg-nova-cyan text-slate-950 font-bold border-nova-cyan'
                : 'glass-panel text-slate-300 border-nova-border'
            }`}
          >
            <Table className="w-3.5 h-3.5" /> Table
          </button>
        </div>

        {/* OCR Language */}
        <select
          value={targetOcrLang}
          onChange={(e) => setTargetOcrLang(e.target.value)}
          className="bg-[#091530] text-xs text-slate-200 border border-nova-border rounded-lg px-2.5 py-1 focus:outline-none"
        >
          <option value="uz+en+ru">Uzbek + English + Russian</option>
          <option value="uz">Uzbek only</option>
          <option value="en">English only</option>
          <option value="ru">Russian only</option>
        </select>
      </div>

      {/* Upload Dropzone */}
      <div
        onClick={handleSimulateOcr}
        className="p-6 rounded-2xl border-2 border-dashed border-nova-border/70 hover:border-nova-cyan/80 bg-[#060e22]/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group mb-4"
      >
        <Upload className="w-8 h-8 text-nova-cyan group-hover:scale-110 transition-transform" />
        <span className="text-xs font-semibold text-white">Click or drag image / PDF page here</span>
        <span className="text-[10px] text-slate-400">PNG, JPG, BMP, PDF, Clipboard image supported</span>
      </div>

      {/* Output & Export Controls */}
      <div className="flex-1 flex flex-col rounded-xl glass-panel p-3.5 bg-[#081533]/80">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-nova-border/50">
          <span className="text-xs font-semibold text-nova-cyan">Extracted OCR Content</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(ocrText)}
              className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-[#0b1b3d] px-2 py-1 rounded border border-nova-border"
            >
              <Copy className="w-3 h-3" /> Copy
            </button>
            <button
              onClick={handleSaveTxt}
              className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-[#0b1b3d] px-2 py-1 rounded border border-nova-border"
            >
              <Download className="w-3 h-3" /> Save TXT
            </button>
            <button
              onClick={() => navigateTo('ask_ai')}
              className="flex items-center gap-1 text-[11px] text-nova-cyan hover:text-white bg-[#004488]/40 px-2 py-1 rounded border border-nova-cyan/40"
            >
              <Bot className="w-3 h-3" /> Send to AI
            </button>
          </div>
        </div>

        <textarea
          value={ocrText}
          onChange={(e) => setOcrText(e.target.value)}
          className="flex-1 bg-transparent text-xs font-mono text-slate-100 resize-none focus:outline-none"
        />
      </div>
    </div>
  );
};
