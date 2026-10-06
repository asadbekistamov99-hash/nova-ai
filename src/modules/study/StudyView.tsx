import React, { useState } from 'react';
import { GraduationCap, BookOpen, Layers, HelpCircle, CheckCircle, Award } from 'lucide-react';
import { useLanguage } from '../../stores/useLanguageStore';
import { useRobot } from '../../stores/useRobotStore';

const DISCIPLINES = ['Computer Science', 'Medicine', 'Biology', 'Chemistry', 'Law', 'History'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

export const StudyView: React.FC = () => {
  const { t } = useLanguage();
  const { setRobotState } = useRobot();
  const [discipline, setDiscipline] = useState('Computer Science');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [activeTab, setActiveTab] = useState<'flashcards' | 'quiz' | 'notes'>('quiz');

  const [questions, setQuestions] = useState([
    {
      q: 'Which data structure provides O(1) average lookup time?',
      options: ['Binary Search Tree', 'Hash Map', 'Linked List', 'B-Tree'],
      correctIndex: 1,
      selected: null as number | null,
    },
    {
      q: 'What is the primary role of an Operating System Kernel?',
      options: ['Compiling C Code', 'Hardware abstraction & resource scheduling', 'Rendering 3D GPUs', 'Managing web browser tabs'],
      correctIndex: 1,
      selected: null as number | null,
    },
  ]);

  const handleGenerate = (type: string) => {
    setRobotState('THINKING', `Creating ${type} for ${discipline}...`);
    setTimeout(() => {
      setRobotState('SUCCESS', `${type} generated!`);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-8.5rem)] px-6 py-2 overflow-y-auto">
      <div className="flex items-center justify-between pb-3 border-b border-nova-border/50">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-nova-cyan" />
          <h2 className="text-base font-bold text-white tracking-wide">{t('modules.study_mode')}</h2>
        </div>

        {/* Discipline & Difficulty Selectors */}
        <div className="flex items-center gap-2">
          <select
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
            className="bg-[#091530] text-xs text-white border border-nova-border rounded-lg px-2.5 py-1 focus:outline-none"
          >
            {DISCIPLINES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-[#091530] text-xs text-nova-cyan border border-nova-border rounded-lg px-2.5 py-1 focus:outline-none"
          >
            {DIFFICULTIES.map((df) => (
              <option key={df} value={df}>{df}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Generator Toolbars */}
      <div className="my-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'quiz', label: 'Practice Quiz', icon: HelpCircle },
            { id: 'flashcards', label: 'Flashcards', icon: Layers },
            { id: 'notes', label: 'Summary & Notes', icon: BookOpen },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border transition-all ${
                activeTab === item.id
                  ? 'bg-nova-cyan text-slate-950 font-bold border-nova-cyan shadow-glow-cyan-sm'
                  : 'glass-panel text-slate-300 border-nova-border'
              }`}
            >
              <item.icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => handleGenerate('20 Test Questions')}
          className="text-xs px-3 py-1.5 rounded-xl bg-gradient-to-r from-nova-blue to-nova-cyan text-white font-semibold shadow-glow-pill hover:opacity-95"
        >
          + Generate 20 Exam Questions
        </button>
      </div>

      {/* Main Study Arena */}
      <div className="flex-1 rounded-xl glass-panel p-4 bg-[#081533]/80 overflow-y-auto">
        {activeTab === 'quiz' && (
          <div className="space-y-4">
            {questions.map((item, qIdx) => (
              <div key={qIdx} className="p-3.5 rounded-xl bg-[#050c20]/80 border border-nova-border/60">
                <h4 className="text-sm font-semibold text-white mb-2.5">
                  {qIdx + 1}. {item.q}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {item.options.map((opt, optIdx) => {
                    const isSelected = item.selected === optIdx;
                    const isCorrect = optIdx === item.correctIndex;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => {
                          const updated = [...questions];
                          updated[qIdx].selected = optIdx;
                          setQuestions(updated);
                        }}
                        className={`p-2 rounded-lg text-xs text-left border transition-all ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-950 border-emerald-400 text-emerald-200 font-semibold'
                              : 'bg-red-950 border-red-400 text-red-200'
                            : 'bg-[#0a1738] text-slate-300 border-nova-border/40 hover:border-nova-cyan/50'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}. {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'flashcards' && (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-80 h-44 rounded-2xl border-2 border-nova-cyan/40 bg-gradient-to-br from-[#0c1c45] to-[#06102b] shadow-glow-cyan-sm flex flex-col items-center justify-center p-6 cursor-pointer hover:border-nova-cyan transition-all">
              <span className="text-xs text-nova-cyan uppercase tracking-wider mb-2">Term</span>
              <h3 className="text-lg font-bold text-white mb-3">Turing Completeness</h3>
              <span className="text-[11px] text-slate-400">Click to flip card</span>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="text-xs text-slate-200 font-mono leading-relaxed space-y-2">
            <h3 className="text-sm font-bold text-nova-cyan font-sans">High-Yield Lecture Summary</h3>
            <p>1. Fundamentals of Computational Complexity (P vs NP problem formulation).</p>
            <p>2. Memory Hierarchies: L1/L2/L3 Caches, Main Memory latency profiles.</p>
            <p>3. Asymptotic Analysis: Big O, Big Theta, and Big Omega definitions.</p>
          </div>
        )}
      </div>
    </div>
  );
};
