import React, { useState, useEffect, useRef } from 'react';
import { Crop, Monitor, Scan, Sparkles, Languages, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../stores/useLanguageStore';
import { useRobot } from '../../stores/useRobotStore';

export const ScreenshotAiView: React.FC = () => {
  const { t } = useLanguage();
  const { setRobotState } = useRobot();
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCapture = (type: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setRobotState('PROCESSING', `Capturing ${type}...`);
    timeoutRef.current = setTimeout(() => {
      setCapturedPreview('dummy-screenshot');
      setRobotState('SUCCESS', 'Screenshot Captured');
      setAnalysisResult('Detected UI elements: Windows Application Window, 4 buttons, 2 text fields. No sensitive passwords detected.');
    }, 1200);
  };

  const handleAction = (actionName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveAction(actionName);
    setRobotState('THINKING', `Running ${actionName}...`);
    timeoutRef.current = setTimeout(() => {
      setRobotState('SUCCESS', 'Analysis Complete');
      setAnalysisResult(`Action "${actionName}" executed on screenshot: Extracted high-fidelity semantic comprehension and localized components.`);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-8.5rem)] px-6 py-2 overflow-y-auto">
      <div className="flex items-center justify-between pb-3 border-b border-nova-border/50">
        <div className="flex items-center gap-2">
          <Crop className="w-5 h-5 text-nova-cyan" />
          <h2 className="text-base font-bold text-white tracking-wide">{t('modules.screenshot_ai')}</h2>
        </div>
        <div className="text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-nova-border">
          Shortcut: <span className="text-nova-cyan font-mono font-bold">Ctrl + Shift + S</span>
        </div>
      </div>

      {/* Capture Options Grid */}
      <div className="grid grid-cols-3 gap-3 my-4">
        <button
          onClick={() => handleCapture('Entire Screen')}
          className="p-3 rounded-xl glass-panel glass-panel-hover flex flex-col items-center justify-center gap-2 text-center group"
        >
          <Monitor className="w-6 h-6 text-nova-cyan group-hover:scale-110 transition-transform" />
          <span className="text-xs font-semibold text-white">Entire Screen</span>
          <span className="text-[10px] text-slate-400">Capture all active monitors</span>
        </button>

        <button
          onClick={() => handleCapture('Active Window')}
          className="p-3 rounded-xl glass-panel glass-panel-hover flex flex-col items-center justify-center gap-2 text-center group"
        >
          <Scan className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-semibold text-white">Active Window</span>
          <span className="text-[10px] text-slate-400">Target foreground process</span>
        </button>

        <button
          onClick={() => handleCapture('Selected Region')}
          className="p-3 rounded-xl glass-panel glass-panel-hover flex flex-col items-center justify-center gap-2 text-center group"
        >
          <Crop className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-semibold text-white">Selected Region</span>
          <span className="text-[10px] text-slate-400">Drag to crop specific area</span>
        </button>
      </div>

      {/* Screenshot Preview & Vision Actions Area */}
      <div className="flex-1 rounded-2xl border border-dashed border-nova-border/60 bg-[#060e22]/50 p-4 flex flex-col justify-between">
        {capturedPreview ? (
          <div className="flex flex-col gap-3 h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Screenshot Ready (1920x1080)
              </span>
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {['Explain', 'Translate', 'Extract Text', 'Solve', 'Summarize', 'Ask AI'].map((act) => (
                  <button
                    key={act}
                    onClick={() => handleAction(act)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                      activeAction === act
                        ? 'bg-nova-cyan text-slate-950 border-nova-cyan font-bold shadow-glow-cyan-sm'
                        : 'bg-[#091738] text-slate-300 border-nova-border hover:border-nova-cyan'
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

            {/* Analysis Output Pane */}
            <div className="flex-1 p-3.5 rounded-xl bg-[#091530] border border-nova-border text-xs text-slate-200 font-mono leading-relaxed overflow-y-auto">
              <p className="text-nova-cyan font-semibold mb-1">// Vision AI Analysis Output:</p>
              {analysisResult}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2">
            <Crop className="w-8 h-8 text-slate-600" />
            <p className="text-xs">Select a capture mode above or press Ctrl+Shift+S</p>
          </div>
        )}
      </div>
    </div>
  );
};
