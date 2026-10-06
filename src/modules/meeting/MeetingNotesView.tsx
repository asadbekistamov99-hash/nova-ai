import React, { useState } from 'react';
import { Users, Mic, Radio, CheckSquare, Calendar, Download, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../stores/useLanguageStore';
import { useRobot } from '../../stores/useRobotStore';

export const MeetingNotesView: React.FC = () => {
  const { t } = useLanguage();
  const { setRobotState } = useRobot();
  const [isRecording, setIsRecording] = useState(false);
  const [hasUserConsent, setHasUserConsent] = useState(true);

  const toggleRecording = () => {
    if (!hasUserConsent) {
      alert('Explicit user recording consent is required under privacy protocol.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      setRobotState('PROCESSING', 'Synthesizing meeting notes and action items...');
      setTimeout(() => {
        setRobotState('SUCCESS', 'Meeting notes generated!');
      }, 1200);
    } else {
      setIsRecording(true);
      setRobotState('LISTENING', 'Live meeting recording in progress...');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-8.5rem)] px-6 py-2 overflow-y-auto">
      <div className="flex items-center justify-between pb-3 border-b border-nova-border/50">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-nova-cyan" />
          <h2 className="text-base font-bold text-white tracking-wide">{t('modules.meeting_notes')}</h2>
        </div>

        {/* Live Recording Warning Status (Privacy Mandate) */}
        <div className="flex items-center gap-2">
          {isRecording ? (
            <span className="flex items-center gap-1.5 text-xs text-red-400 bg-red-950/70 border border-red-500/50 px-2.5 py-1 rounded-full animate-pulse">
              <Radio className="w-3.5 h-3.5" /> REC: Live Meeting Audio
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-nova-border">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Microphone Standby
            </span>
          )}
        </div>
      </div>

      {/* Recording Control & Consent Banner */}
      <div className="my-3 flex items-center justify-between bg-[#081533]/80 p-3 rounded-xl border border-nova-border">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleRecording}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
              isRecording
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-nova-blue to-nova-cyan text-white shadow-glow-pill'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>{isRecording ? 'Stop Recording' : 'Start Meeting Recording'}</span>
          </button>
          <span className="text-[11px] text-slate-400">
            {isRecording ? 'Session duration: 18:42' : 'Zoom, Google Meet, Teams audio compatible'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting meeting summary in DOCX & PDF...')}
            className="flex items-center gap-1 text-xs px-3 py-1.5 bg-[#0a193c] text-slate-300 hover:text-white rounded-lg border border-nova-border"
          >
            <Download className="w-3.5 h-3.5" /> Export DOCX / PDF
          </button>
        </div>
      </div>

      {/* Dual Workspace: Live Transcript & Structured Synthesis */}
      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Real-time Speaker Transcript */}
        <div className="flex flex-col rounded-xl glass-panel p-3.5">
          <span className="text-xs font-semibold text-slate-400 mb-2">Live Speaker Segmentation</span>
          <div className="flex-1 space-y-2.5 overflow-y-auto pr-1 text-xs font-mono">
            <div className="p-2 rounded bg-[#060d21] border border-nova-border/30">
              <span className="text-nova-cyan font-bold block mb-1">Speaker 1 (Team Lead):</span>
              <p className="text-slate-300">"Let's review the final delivery timeline for the Windows desktop client."</p>
            </div>
            <div className="p-2 rounded bg-[#060d21] border border-nova-border/30">
              <span className="text-blue-400 font-bold block mb-1">Speaker 2 (Architect):</span>
              <p className="text-slate-300">"All 10 modules and local intent routing are built. Security verification is complete."</p>
            </div>
          </div>
        </div>

        {/* Action Items & Synthesis */}
        <div className="flex flex-col rounded-xl glass-panel p-3.5 bg-[#081533]/80">
          <span className="text-xs font-semibold text-nova-cyan mb-2">Meeting Synthesis & Action Items</span>
          <div className="flex-1 space-y-3 overflow-y-auto text-xs text-slate-200">
            <div className="p-2.5 rounded-lg bg-[#050c20] border border-nova-border/40">
              <h5 className="font-bold text-white flex items-center gap-1.5 mb-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-nova-cyan" /> Action Items
              </h5>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>Deploy Windows desktop installer package by Friday (Lead Architect).</li>
                <li>Verify Uzbek Cyrillic transliteration edge cases (QA Team).</li>
              </ul>
            </div>

            <div className="p-2.5 rounded-lg bg-[#050c20] border border-nova-border/40">
              <h5 className="font-bold text-white flex items-center gap-1.5 mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Key Decisions & Deadlines
              </h5>
              <p className="text-slate-300">
                Decision: Default to local OCR to optimize API overhead and maintain customer data privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
