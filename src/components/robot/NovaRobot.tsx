import React, { useMemo } from 'react';
import { useRobot, RobotState } from '../../stores/useRobotStore';
import { useLanguage } from '../../stores/useLanguageStore';
import { Sparkles, AlertCircle, CheckCircle2, Loader2, Volume2, Mic } from 'lucide-react';

export const NovaRobot: React.FC = () => {
  const { robotState, customMessage, setRobotState } = useRobot();
  const { t } = useLanguage();

  // Waveform bars count and heights
  const leftWaveforms = useMemo(() => [16, 28, 40, 52, 64, 52, 40, 28, 16], []);
  const rightWaveforms = useMemo(() => [16, 28, 40, 52, 64, 52, 40, 28, 16], []);

  // Determine state-based color styling
  const stateTheme = useMemo(() => {
    switch (robotState) {
      case 'LISTENING':
        return {
          glow: 'rgba(0, 229, 255, 0.8)',
          border: 'border-nova-cyan',
          halo: 'from-cyan-500/40 via-blue-600/20 to-transparent',
          eyeColor: '#00e5ff',
          statusText: 'Listening...',
          badgeClass: 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300',
        };
      case 'THINKING':
        return {
          glow: 'rgba(147, 51, 234, 0.7)',
          border: 'border-purple-400',
          halo: 'from-purple-500/40 via-indigo-600/25 to-transparent',
          eyeColor: '#c084fc',
          statusText: 'Thinking...',
          badgeClass: 'bg-purple-950/70 border-purple-500/50 text-purple-300',
        };
      case 'SPEAKING':
        return {
          glow: 'rgba(56, 189, 248, 0.8)',
          border: 'border-sky-400',
          halo: 'from-sky-500/40 via-cyan-600/25 to-transparent',
          eyeColor: '#38bdf8',
          statusText: 'Speaking...',
          badgeClass: 'bg-sky-950/70 border-sky-500/50 text-sky-300',
        };
      case 'PROCESSING':
        return {
          glow: 'rgba(0, 162, 255, 0.7)',
          border: 'border-blue-400',
          halo: 'from-blue-500/35 via-indigo-600/20 to-transparent',
          eyeColor: '#60a5fa',
          statusText: 'Processing...',
          badgeClass: 'bg-blue-950/70 border-blue-500/50 text-blue-300',
        };
      case 'SUCCESS':
        return {
          glow: 'rgba(16, 185, 129, 0.7)',
          border: 'border-emerald-400',
          halo: 'from-emerald-500/40 via-teal-600/20 to-transparent',
          eyeColor: '#34d399',
          statusText: 'Completed',
          badgeClass: 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300',
        };
      case 'ERROR':
        return {
          glow: 'rgba(239, 68, 68, 0.7)',
          border: 'border-red-400',
          halo: 'from-red-500/40 via-rose-600/20 to-transparent',
          eyeColor: '#f87171',
          statusText: 'Error',
          badgeClass: 'bg-red-950/70 border-red-500/50 text-red-300',
        };
      case 'IDLE':
      default:
        return {
          glow: 'rgba(0, 180, 255, 0.5)',
          border: 'border-cyan-500/40',
          halo: 'from-blue-600/25 via-cyan-500/15 to-transparent',
          eyeColor: '#38bdf8',
          statusText: 'Standing by',
          badgeClass: 'bg-slate-900/60 border-slate-700/50 text-slate-300',
        };
    }
  }, [robotState]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 select-none">
      {/* Background radial ambient halo */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-b ${stateTheme.halo} blur-3xl pointer-events-none transition-all duration-700 opacity-90`}
      ></div>

      {/* Main Character Stage with Audio Waveforms */}
      <div className="relative flex items-center justify-center gap-8 w-full max-w-2xl">
        {/* Left Audio Waveform Bars */}
        <div className="flex items-end gap-1 h-40 px-3">
          {leftWaveforms.map((h, idx) => {
            const isWaveActive = robotState === 'LISTENING' || robotState === 'SPEAKING';
            return (
              <div
                key={`left-wave-${idx}`}
                className="w-2 rounded-full bg-gradient-to-t from-nova-blue via-nova-cyan to-cyan-300 transition-all duration-300 shadow-lg"
                style={{
                  height: isWaveActive ? `${Math.max(10, h * (0.7 + Math.sin(idx) * 0.3))}px` : '8px',
                  opacity: isWaveActive ? 0.95 : 0.3,
                  animation: isWaveActive ? `soundwave 0.6s ease-in-out infinite ${idx * 0.1}s` : 'none',
                  boxShadow: isWaveActive ? `0 0 8px rgba(0, 229, 255, 0.6)` : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Advanced Robot with Hands and Better Proportions */}
        <div className="relative flex flex-col items-center group cursor-pointer" onClick={() => {
          const states: RobotState[] = ['IDLE', 'LISTENING', 'THINKING', 'SPEAKING', 'PROCESSING', 'SUCCESS', 'ERROR'];
          const nextIndex = (states.indexOf(robotState) + 1) % states.length;
          setRobotState(states[nextIndex]);
        }}>
          {/* Subtle floating animation wrapper */}
          <div className="relative animate-float flex flex-col items-center">
            {/* Top Glow Ring */}
            <div
              className={`w-36 h-8 -mb-4 rounded-full border-2 border-cyan-400/50 bg-gradient-to-b from-cyan-400/20 to-transparent blur-sm ${
                robotState === 'THINKING' ? 'animate-spin' : 'animate-pulse'
              }`}
            ></div>

            {/* Advanced Robot SVG Graphics */}
            <svg
              className="w-72 h-80 drop-shadow-[0_0_50px_rgba(0,229,255,0.5)] transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 280 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gradients */}
                <linearGradient id="metalWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#f0f4f8" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
                <linearGradient id="darkVisor" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0a1929" />
                  <stop offset="70%" stopColor="#020409" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
                <linearGradient id="cyanNeon" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#0090ff" />
                </linearGradient>
                <filter id="superGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="innerGlow" x="-15%" y="-15%" width="130%" height="130%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                </filter>
              </defs>

              {/* Left Arm with Hand */}
              <g id="LeftArm">
                <rect x="20" y="140" width="24" height="70" rx="12" fill="url(#metalWhite)" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="32" cy="215" r="18" fill="url(#metalWhite)" stroke="#cbd5e1" strokeWidth="2" />
                {/* Hand fingers glow */}
                <circle cx="16" cy="220" r="6" fill="#00e5ff" opacity="0.8" />
                <circle cx="32" cy="235" r="6" fill="#00e5ff" opacity="0.8" />
                <circle cx="48" cy="220" r="6" fill="#00e5ff" opacity="0.8" />
              </g>

              {/* Right Arm with Hand */}
              <g id="RightArm">
                <rect x="236" y="140" width="24" height="70" rx="12" fill="url(#metalWhite)" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="248" cy="215" r="18" fill="url(#metalWhite)" stroke="#cbd5e1" strokeWidth="2" />
                {/* Hand fingers glow */}
                <circle cx="232" cy="220" r="6" fill="#00e5ff" opacity="0.8" />
                <circle cx="248" cy="235" r="6" fill="#00e5ff" opacity="0.8" />
                <circle cx="264" cy="220" r="6" fill="#00e5ff" opacity="0.8" />
              </g>

              {/* Upper Body / Torso */}
              <path
                d="M 60 180 L 50 260 C 50 270, 230 270, 230 260 L 220 180 Z"
                fill="url(#metalWhite)"
                stroke="#cbd5e1"
                strokeWidth="2"
              />

              {/* Neck */}
              <rect x="120" y="155" width="40" height="28" rx="8" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />

              {/* Left Earpiece / Headphone */}
              <g id="LeftEar">
                <circle cx="50" cy="100" r="22" fill="url(#metalWhite)" stroke="#00e5ff" strokeWidth="2.5" />
                <circle cx="50" cy="100" r="14" fill="#0b1736" stroke="#00e5ff" strokeWidth="2" filter="url(#superGlow)" />
                <circle cx="50" cy="100" r="7" fill="#00e5ff" opacity="0.9" />
              </g>

              {/* Right Earpiece / Headphone */}
              <g id="RightEar">
                <circle cx="230" cy="100" r="22" fill="url(#metalWhite)" stroke="#00e5ff" strokeWidth="2.5" />
                <circle cx="230" cy="100" r="14" fill="#0b1736" stroke="#00e5ff" strokeWidth="2" filter="url(#superGlow)" />
                <circle cx="230" cy="100" r="7" fill="#00e5ff" opacity="0.9" />
              </g>

              {/* Headphone Bridge */}
              <path
                d="M 65 85 C 70 35, 210 35, 215 85"
                stroke="url(#metalWhite)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 68 83 C 72 40, 208 40, 212 83"
                stroke="#00e5ff"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                opacity="0.8"
              />

              {/* Large Head */}
              <rect
                x="70"
                y="60"
                width="140"
                height="130"
                rx="50"
                fill="url(#metalWhite)"
                stroke="#cbd5e1"
                strokeWidth="2"
              />

              {/* Glossy Visor Face - Full Screen */}
              <rect
                x="82"
                y="75"
                width="116"
                height="100"
                rx="40"
                fill="url(#darkVisor)"
                stroke="#1e293b"
                strokeWidth="2.5"
              />

              {/* Visor Glass Shine */}
              <ellipse
                cx="100"
                cy="85"
                rx="30"
                ry="20"
                fill="#ffffff"
                opacity="0.15"
              />

              {/* Expressive LED Eyes - Larger */}
              <g id="Eyes" filter="url(#superGlow)">
                {robotState === 'SUCCESS' ? (
                  <>
                    {/* Happy smile eyes */}
                    <path d="M 95 110 Q 108 95 120 110" stroke={stateTheme.eyeColor} strokeWidth="5" strokeLinecap="round" fill="none" />
                    <path d="M 160 110 Q 173 95 185 110" stroke={stateTheme.eyeColor} strokeWidth="5" strokeLinecap="round" fill="none" />
                  </>
                ) : robotState === 'ERROR' ? (
                  <>
                    {/* Alert/angry eyes */}
                    <path d="M 95 105 L 120 120 L 95 130" stroke={stateTheme.eyeColor} strokeWidth="5" strokeLinecap="round" fill="none" />
                    <path d="M 185 105 L 160 120 L 185 130" stroke={stateTheme.eyeColor} strokeWidth="5" strokeLinecap="round" fill="none" />
                  </>
                ) : robotState === 'THINKING' ? (
                  <>
                    {/* Thinking - rotating pupils */}
                    <circle cx="108" cy="118" r="10" stroke={stateTheme.eyeColor} strokeWidth="3.5" strokeDasharray="14 8" fill="none" />
                    <circle cx="172" cy="118" r="10" stroke={stateTheme.eyeColor} strokeWidth="3.5" strokeDasharray="14 8" fill="none" />
                  </>
                ) : (
                  <>
                    {/* Default friendly eyes - Larger circles */}
                    <circle cx="108" cy="115" r="12" fill={stateTheme.eyeColor} opacity="0.95" />
                    <circle cx="172" cy="115" r="12" fill={stateTheme.eyeColor} opacity="0.95" />
                    {/* Pupils */}
                    <circle cx="108" cy="115" r="6" fill="#000000" />
                    <circle cx="172" cy="115" r="6" fill="#000000" />
                  </>
                )}

                {/* LED Mouth / Audio Indicator */}
                {robotState === 'SPEAKING' ? (
                  <path d="M 120 145 Q 140 160 160 145" stroke={stateTheme.eyeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
                ) : (
                  <line x1="125" y1="145" x2="155" y2="145" stroke={stateTheme.eyeColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
                )}
              </g>

              {/* Central Energy Core / Arc Reactor */}
              <circle cx="140" cy="265" r="18" fill="#08142f" stroke="#00e5ff" strokeWidth="3" />
              <circle
                cx="140"
                cy="265"
                r="11"
                fill="url(#cyanNeon)"
                filter="url(#superGlow)"
                className={robotState === 'LISTENING' || robotState === 'SPEAKING' ? 'animate-pulse' : 'animate-pulse'}
              />
              <circle cx="140" cy="265" r="4" fill="#ffffff" opacity="0.9" />

              {/* Side Power Lines */}
              <line x1="70" y1="200" x2="55" y2="200" stroke="#00e5ff" strokeWidth="2" opacity="0.6" />
              <line x1="210" y1="200" x2="225" y2="200" stroke="#00e5ff" strokeWidth="2" opacity="0.6" />

              {/* NOVA AI Branding */}
              <text
                x="140"
                y="310"
                textAnchor="middle"
                fill="#475569"
                fontSize="10"
                fontWeight="800"
                letterSpacing="2"
                fontFamily="sans-serif"
              >
                NOVA AI
              </text>
            </svg>
          </div>
        </div>

        {/* Right Audio Waveform Bars */}
        <div className="flex items-end gap-1 h-40 px-3">
          {rightWaveforms.map((h, idx) => {
            const isWaveActive = robotState === 'LISTENING' || robotState === 'SPEAKING';
            return (
              <div
                key={`right-wave-${idx}`}
                className="w-2 rounded-full bg-gradient-to-t from-nova-cyan via-nova-blue to-cyan-300 transition-all duration-300 shadow-lg"
                style={{
                  height: isWaveActive ? `${Math.max(10, h * (0.7 + Math.sin(idx) * 0.3))}px` : '8px',
                  opacity: isWaveActive ? 0.95 : 0.3,
                  animation: isWaveActive ? `soundwave 0.6s ease-in-out infinite ${idx * 0.1}s` : 'none',
                  boxShadow: isWaveActive ? `0 0 8px rgba(0, 229, 255, 0.6)` : 'none',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* State status badge */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium backdrop-blur-md transition-all duration-300 shadow-lg ${stateTheme.badgeClass}`}
        >
          {robotState === 'LISTENING' && <Mic className="w-4 h-4 animate-pulse text-cyan-400" />}
          {robotState === 'THINKING' && <Sparkles className="w-4 h-4 animate-spin text-purple-400" />}
          {robotState === 'PROCESSING' && <Loader2 className="w-4 h-4 animate-spin text-blue-400" />}
          {robotState === 'SPEAKING' && <Volume2 className="w-4 h-4 animate-bounce text-sky-400" />}
          {robotState === 'SUCCESS' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {robotState === 'ERROR' && <AlertCircle className="w-4 h-4 text-red-400" />}
          <span>{customMessage || stateTheme.statusText}</span>
        </div>

        <span className="text-xs text-slate-400 font-mono tracking-tight">
          Click robot to cycle states
        </span>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes soundwave {
          0%, 100% { transform: scaleY(1); opacity: 0.8; }
          50% { transform: scaleY(1.5); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
