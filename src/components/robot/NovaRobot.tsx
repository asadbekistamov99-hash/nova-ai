import React, { useMemo } from 'react';
import { useRobot, RobotState } from '../../stores/useRobotStore';
import { useLanguage } from '../../stores/useLanguageStore';
import { Sparkles, AlertCircle, CheckCircle2, Loader2, Volume2, Mic } from 'lucide-react';

export const NovaRobot: React.FC = () => {
  const { robotState, customMessage, setRobotState } = useRobot();
  const { t } = useLanguage();

  // Waveform bars count and heights
  const leftWaveforms = useMemo(() => [14, 28, 42, 60, 36, 18], []);
  const rightWaveforms = useMemo(() => [18, 36, 60, 42, 28, 14], []);

  // Determine state-based color styling
  const stateTheme = useMemo(() => {
    switch (robotState) {
      case 'LISTENING':
        return {
          glow: 'rgba(0, 229, 255, 0.6)',
          border: 'border-nova-cyan',
          halo: 'from-cyan-500/25 via-blue-600/15 to-transparent',
          eyeColor: '#00e5ff',
          statusText: 'Listening...',
          badgeClass: 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300',
        };
      case 'THINKING':
        return {
          glow: 'rgba(147, 51, 234, 0.6)',
          border: 'border-purple-400',
          halo: 'from-purple-500/30 via-indigo-600/20 to-transparent',
          eyeColor: '#c084fc',
          statusText: 'Thinking...',
          badgeClass: 'bg-purple-950/70 border-purple-500/50 text-purple-300',
        };
      case 'SPEAKING':
        return {
          glow: 'rgba(56, 189, 248, 0.7)',
          border: 'border-sky-400',
          halo: 'from-sky-500/30 via-cyan-600/20 to-transparent',
          eyeColor: '#38bdf8',
          statusText: 'Speaking...',
          badgeClass: 'bg-sky-950/70 border-sky-500/50 text-sky-300',
        };
      case 'PROCESSING':
        return {
          glow: 'rgba(0, 162, 255, 0.6)',
          border: 'border-blue-400',
          halo: 'from-blue-500/25 via-indigo-600/15 to-transparent',
          eyeColor: '#60a5fa',
          statusText: 'Processing...',
          badgeClass: 'bg-blue-950/70 border-blue-500/50 text-blue-300',
        };
      case 'SUCCESS':
        return {
          glow: 'rgba(16, 185, 129, 0.6)',
          border: 'border-emerald-400',
          halo: 'from-emerald-500/30 via-teal-600/15 to-transparent',
          eyeColor: '#34d399',
          statusText: 'Completed',
          badgeClass: 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300',
        };
      case 'ERROR':
        return {
          glow: 'rgba(239, 68, 68, 0.6)',
          border: 'border-red-400',
          halo: 'from-red-500/30 via-rose-600/15 to-transparent',
          eyeColor: '#f87171',
          statusText: 'Error',
          badgeClass: 'bg-red-950/70 border-red-500/50 text-red-300',
        };
      case 'IDLE':
      default:
        return {
          glow: 'rgba(0, 180, 255, 0.35)',
          border: 'border-cyan-500/40',
          halo: 'from-blue-600/20 via-cyan-500/10 to-transparent',
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
        className={`absolute inset-0 rounded-full bg-gradient-to-b ${stateTheme.halo} blur-3xl pointer-events-none transition-all duration-700 opacity-80`}
      ></div>

      {/* Main Character Stage with Audio Waveforms */}
      <div className="relative flex items-center justify-center gap-6 w-full max-w-md">
        {/* Left Audio Waveform Bars (Active on LISTENING or SPEAKING) */}
        <div className="flex items-center gap-1.5 h-32 px-2">
          {leftWaveforms.map((h, idx) => {
            const isWaveActive = robotState === 'LISTENING' || robotState === 'SPEAKING';
            return (
              <div
                key={`left-wave-${idx}`}
                className="w-1.5 rounded-full bg-gradient-to-t from-nova-blue to-nova-cyan transition-all duration-300"
                style={{
                  height: isWaveActive ? `${Math.max(12, h * (idx % 2 === 0 ? 1.2 : 0.8))}px` : '10px',
                  opacity: isWaveActive ? 0.9 : 0.25,
                  animation: isWaveActive ? `soundwave 0.8s ease-in-out infinite ${idx * 0.15}s` : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Vector Robot Head & Bust */}
        <div className="relative flex flex-col items-center group cursor-pointer" onClick={() => {
          // Cycle through states on click for interactive testing
          const states: RobotState[] = ['IDLE', 'LISTENING', 'THINKING', 'SPEAKING', 'PROCESSING', 'SUCCESS', 'ERROR'];
          const nextIndex = (states.indexOf(robotState) + 1) % states.length;
          setRobotState(states[nextIndex]);
        }}>
          {/* Subtle floating animation wrapper */}
          <div className="relative animate-float flex flex-col items-center">
            {/* Holographic Ring / Particle effect above head */}
            <div
              className={`w-32 h-6 -mb-3 rounded-full border border-cyan-400/40 bg-cyan-400/10 blur-[1px] ${
                robotState === 'THINKING' ? 'animate-spin' : 'animate-pulse'
              }`}
            ></div>

            {/* Robot SVG Graphics */}
            <svg
              className="w-64 h-64 drop-shadow-[0_0_35px_rgba(0,229,255,0.4)] transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 240 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Defs for gradients & glows */}
              <defs>
                <linearGradient id="armorWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
                <linearGradient id="helmetVisor" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#080f24" />
                  <stop offset="70%" stopColor="#030712" />
                  <stop offset="100%" stopColor="#02040a" />
                </linearGradient>
                <linearGradient id="cyanCore" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00e5ff" />
                  <stop offset="100%" stopColor="#0077ff" />
                </linearGradient>
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Headphone Ears / Left & Right Audio Rings */}
              <g id="Headphones">
                {/* Left Headphone Ring */}
                <circle cx="50" cy="95" r="18" fill="url(#armorWhite)" stroke="#00e5ff" strokeWidth="2.5" />
                <circle cx="50" cy="95" r="11" fill="#0b1736" stroke="#00e5ff" strokeWidth="2" filter="url(#neonGlow)" />
                <circle cx="50" cy="95" r="5" fill="#00e5ff" />

                {/* Right Headphone Ring */}
                <circle cx="190" cy="95" r="18" fill="url(#armorWhite)" stroke="#00e5ff" strokeWidth="2.5" />
                <circle cx="190" cy="95" r="11" fill="#0b1736" stroke="#00e5ff" strokeWidth="2" filter="url(#neonGlow)" />
                <circle cx="190" cy="95" r="5" fill="#00e5ff" />

                {/* Headphone Arch Bridge */}
                <path
                  d="M52 82 C55 35, 185 35, 188 82"
                  stroke="url(#armorWhite)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M58 80 C60 42, 180 42, 182 80"
                  stroke="#00e5ff"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
              </g>

              {/* Head Shell */}
              <rect
                x="62"
                y="52"
                width="116"
                height="94"
                rx="47"
                fill="url(#armorWhite)"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />

              {/* Glossy Black Visor Face */}
              <rect
                x="72"
                y="62"
                width="96"
                height="74"
                rx="37"
                fill="url(#helmetVisor)"
                stroke="#1e293b"
                strokeWidth="2"
              />

              {/* Expressive Glowing Visor Eyes */}
              <g id="VisorEyes" filter="url(#neonGlow)">
                {robotState === 'SUCCESS' ? (
                  // Happy upward curved eyes (^ ^)
                  <>
                    <path
                      d="M88 95 Q98 83 108 95"
                      stroke={stateTheme.eyeColor}
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M132 95 Q142 83 152 95"
                      stroke={stateTheme.eyeColor}
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </>
                ) : robotState === 'ERROR' ? (
                  // Serious / alert eyes (> <)
                  <>
                    <path
                      d="M88 88 L106 98 L88 106"
                      stroke={stateTheme.eyeColor}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M152 88 L134 98 L152 106"
                      stroke={stateTheme.eyeColor}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </>
                ) : robotState === 'THINKING' ? (
                  // Rotating loading pupils
                  <>
                    <circle cx="98" cy="96" r="8" stroke={stateTheme.eyeColor} strokeWidth="3" strokeDasharray="12 6" />
                    <circle cx="142" cy="96" r="8" stroke={stateTheme.eyeColor} strokeWidth="3" strokeDasharray="12 6" />
                  </>
                ) : (
                  // Friendly default smiling arc eyes (mockup style)
                  <>
                    <path
                      d="M88 96 C92 86, 104 86, 108 96"
                      stroke={stateTheme.eyeColor}
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M132 96 C136 86, 148 86, 152 96"
                      stroke={stateTheme.eyeColor}
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </>
                )}

                {/* Mouth / Audio LED Bar */}
                {robotState === 'SPEAKING' ? (
                  <path
                    d="M112 118 Q120 126 128 118"
                    stroke={stateTheme.eyeColor}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                ) : (
                  <line
                    x1="115"
                    y1="118"
                    x2="125"
                    y2="118"
                    stroke={stateTheme.eyeColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                )}
              </g>

              {/* Neck & Armor Collar */}
              <path
                d="M102 144 L102 156 L138 156 L138 144"
                fill="#334155"
              />

              {/* Chestplate Armor */}
              <path
                d="M70 162 C70 156, 170 156, 170 162 L185 220 C185 228, 55 228, 55 220 Z"
                fill="url(#armorWhite)"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />

              {/* Center Glowing Arc Reactor / Energy Core */}
              <circle cx="120" cy="186" r="14" fill="#08142f" stroke="#00e5ff" strokeWidth="2.5" />
              <circle
                cx="120"
                cy="186"
                r="8"
                fill="url(#cyanCore)"
                filter="url(#neonGlow)"
                className={robotState === 'LISTENING' ? 'animate-ping' : ''}
              />
              <circle cx="120" cy="186" r="3" fill="#ffffff" />

              {/* NOVA AI Brand Text on Chestplate */}
              <text
                x="120"
                y="212"
                textAnchor="middle"
                fill="#475569"
                fontSize="8.5"
                fontWeight="700"
                letterSpacing="1.5"
                fontFamily="sans-serif"
              >
                NOVA AI
              </text>
            </svg>
          </div>
        </div>

        {/* Right Audio Waveform Bars */}
        <div className="flex items-center gap-1.5 h-32 px-2">
          {rightWaveforms.map((h, idx) => {
            const isWaveActive = robotState === 'LISTENING' || robotState === 'SPEAKING';
            return (
              <div
                key={`right-wave-${idx}`}
                className="w-1.5 rounded-full bg-gradient-to-t from-nova-cyan to-nova-blue transition-all duration-300"
                style={{
                  height: isWaveActive ? `${Math.max(12, h * (idx % 2 === 0 ? 0.9 : 1.3))}px` : '10px',
                  opacity: isWaveActive ? 0.9 : 0.25,
                  animation: isWaveActive ? `soundwave 0.9s ease-in-out infinite ${idx * 0.12}s` : 'none',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* State status badge & prompt helper */}
      <div className="mt-4 flex flex-col items-center gap-1.5">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium backdrop-blur-md transition-all duration-300 shadow-sm ${stateTheme.badgeClass}`}
        >
          {robotState === 'LISTENING' && <Mic className="w-3.5 h-3.5 animate-pulse text-cyan-400" />}
          {robotState === 'THINKING' && <Sparkles className="w-3.5 h-3.5 animate-spin text-purple-400" />}
          {robotState === 'PROCESSING' && <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />}
          {robotState === 'SPEAKING' && <Volume2 className="w-3.5 h-3.5 animate-bounce text-sky-400" />}
          {robotState === 'SUCCESS' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          {robotState === 'ERROR' && <AlertCircle className="w-3.5 h-3.5 text-red-400" />}
          <span>{customMessage || t(`robot.states.${robotState.toLowerCase()}`) || stateTheme.statusText}</span>
        </div>

        {/* Small hint on interactive state cycling */}
        <span className="text-[10px] text-slate-500 font-mono tracking-tight">
          Click robot to cycle states ({robotState})
        </span>
      </div>
    </div>
  );
};
