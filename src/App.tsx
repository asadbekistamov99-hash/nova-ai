import React from 'react';
import { CustomTitlebar } from './components/titlebar/CustomTitlebar';
import { Sidebar } from './components/sidebar/Sidebar';
import { NovaRobot } from './components/robot/NovaRobot';
import { CommandBar } from './components/command/CommandBar';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { AskAiView } from './modules/ask-ai/AskAiView';
import { ScreenshotAiView } from './modules/screenshot-ai/ScreenshotAiView';
import { TranslateView } from './modules/translate/TranslateView';
import { RewriteView } from './modules/rewrite/RewriteView';
import { OcrView } from './modules/ocr/OcrView';
import { ClipboardView } from './modules/clipboard/ClipboardView';
import { VoiceTypingView } from './modules/voice/VoiceTypingView';
import { FileAiView } from './modules/file-ai/FileAiView';
import { StudyView } from './modules/study/StudyView';
import { MeetingNotesView } from './modules/meeting/MeetingNotesView';
import { useNavigation } from './stores/useNavigationStore';

export const App: React.FC = () => {
  const { activeModule } = useNavigation();

  const renderActiveContent = () => {
    switch (activeModule) {
      case 'ask_ai':
        return <AskAiView />;
      case 'screenshot_ai':
        return <ScreenshotAiView />;
      case 'translate':
        return <TranslateView />;
      case 'rewrite':
        return <RewriteView />;
      case 'ocr':
        return <OcrView />;
      case 'clipboard':
        return <ClipboardView />;
      case 'voice_typing':
        return <VoiceTypingView />;
      case 'file_ai':
        return <FileAiView />;
      case 'study_mode':
        return <StudyView />;
      case 'meeting_notes':
        return <MeetingNotesView />;
      case 'settings':
        return <Settings />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col bg-[#040814] text-slate-100 overflow-hidden select-none font-sans">
      {/* Sci-Fi Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft radial nebula gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[650px] h-[650px] rounded-full bg-blue-600/15 blur-[120px]"></div>
        <div className="absolute bottom-[-15%] left-[20%] w-[550px] h-[550px] rounded-full bg-cyan-500/10 blur-[130px]"></div>
        <div className="absolute top-[35%] left-[45%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px]"></div>

        {/* Subtle perspective sci-fi grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 229, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      {/* Top Custom Window Titlebar */}
      <CustomTitlebar />

      {/* Body: Left Sidebar + Central Workstage + Right Animated Robot */}
      <div className="flex-1 flex overflow-hidden z-10">
        {/* Fixed Left Navigation Sidebar */}
        <Sidebar />

        {/* Dynamic Center Workstage */}
        <main className="flex-1 flex flex-col justify-between overflow-hidden relative">
          <div className="flex-1 flex overflow-hidden">
            {/* Active Content Area (Dashboard or Module) */}
            <div className="flex-1 flex overflow-hidden">
              {renderActiveContent()}
            </div>

            {/* Right Side: Animated NOVA AI Robot (Prominent on Dashboard, Companion on Modules) */}
            <div
              className={`transition-all duration-300 flex items-center justify-center shrink-0 ${
                activeModule === 'dashboard'
                  ? 'w-[420px]'
                  : 'w-[300px] border-l border-nova-border/30 bg-[#060e22]/40 hidden xl:flex'
              }`}
            >
              <NovaRobot />
            </div>
          </div>

          {/* Multimodal Bottom Command Bar */}
          <CommandBar />
        </main>
      </div>
    </div>
  );
};

export default App;
