import React, { useState, useRef } from 'react';
import { Send, Bot, User, Sparkles, Copy, Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../stores/useLanguageStore';
import { useRobot } from '../../stores/useRobotStore';
import { useSettings } from '../../stores/useSettingsStore';
import { createAIProvider } from '../../services/aiProviders';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  error?: string;
}

export const AskAiView: React.FC = () => {
  const { t } = useLanguage();
  const { setRobotState } = useRobot();
  const { settings } = useSettings();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Greetings! I am NOVA AI. How may I assist your workflow today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.0-flash');
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'openai' | 'claude' | 'ollama'>('gemini');
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setRobotState('THINKING');
    setIsLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      const provider = createAIProvider({
        type: selectedProvider,
        model: selectedModel,
        apiKey: (settings as any)[`${selectedProvider}_api_key`],
        endpoint: selectedProvider === 'ollama' ? settings.localOllamaUrl : undefined,
      });

      const response = await provider.sendMessage([
        ...messages.map((m) => ({
          role: m.sender as 'user' | 'assistant',
          content: m.text,
        })),
        { role: 'user', content: userMsg.text },
      ]);

      setRobotState('SPEAKING');
      const aiReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
      setRobotState('SUCCESS');
      setTimeout(() => setRobotState('IDLE'), 1500);
    } catch (error) {
      setRobotState('ERROR');
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        sender: 'assistant',
        text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        error: 'true',
      };
      setMessages((prev) => [...prev, errorMsg]);
      setTimeout(() => setRobotState('IDLE'), 2000);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(id);
    setTimeout(() => setIsCopied(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-8.5rem)] px-6 py-2 select-text">
      {/* Top Header & Provider/Model Selector */}
      <div className="flex items-center justify-between pb-3 border-b border-nova-border/50">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-nova-cyan" />
          <h2 className="text-base font-bold text-white tracking-wide">{t('modules.ask_ai')}</h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-semibold">Provider:</span>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value as any)}
            className="bg-[#091530]/80 text-xs text-nova-cyan border border-nova-border/60 rounded-lg px-3 py-1.5 focus:outline-none focus:border-nova-cyan focus:shadow-glow-cyan-sm transition-all duration-200 hover:border-nova-border"
          >
            <option value="gemini">Gemini</option>
            <option value="openai">OpenAI</option>
            <option value="claude">Claude</option>
            <option value="ollama">Ollama (Local)</option>
          </select>

          <span className="text-xs text-slate-400 font-semibold">Model:</span>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-[#091530]/80 text-xs text-nova-cyan border border-nova-border/60 rounded-lg px-3 py-1.5 focus:outline-none focus:border-nova-cyan focus:shadow-glow-cyan-sm transition-all duration-200 hover:border-nova-border"
          >
            {selectedProvider === 'gemini' && (
              <>
                <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
                <option value="gemini-2.0-pro">Gemini 2.0 Pro</option>
              </>
            )}
            {selectedProvider === 'openai' && (
              <>
                <option value="gpt-4o">GPT-4o</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </>
            )}
            {selectedProvider === 'claude' && (
              <>
                <option value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet</option>
                <option value="claude-3-opus-20250219">Claude 3 Opus</option>
              </>
            )}
            {selectedProvider === 'ollama' && (
              <>
                <option value="llama3">Llama 3</option>
                <option value="qwen2.5">Qwen 2.5</option>
                <option value="mistral">Mistral</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                m.sender === 'user'
                  ? 'bg-nova-blue text-white'
                  : 'bg-nova-cyan/20 text-nova-cyan border border-nova-cyan/40 shadow-glow-cyan-sm'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap transition-all duration-200 ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-nova-blue to-blue-500 text-white rounded-tr-none shadow-glow-blue-sm'
                  : `glass-panel text-slate-200 rounded-tl-none border border-nova-border/80 ${m.error ? 'border-red-400/60 bg-red-950/20' : ''}`
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-1">
                <span className="text-[11px] font-semibold text-slate-400">
                  {m.sender === 'user' ? 'You' : 'NOVA AI'}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">{m.timestamp}</span>
                  {m.sender === 'assistant' && (
                    <button
                      onClick={() => handleCopy(m.id, m.text)}
                      className="text-slate-400 hover:text-nova-cyan transition-colors"
                      title="Copy"
                    >
                      {isCopied === m.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
              <p className="font-mono text-xs text-slate-100">{m.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <div className="pt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2.5 bg-[#091530]/80 p-2.5 rounded-xl border border-nova-border/60 backdrop-blur-sm focus-within:border-nova-border focus-within:shadow-glow-cyan-sm transition-all duration-200"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything or request analysis..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm text-slate-100 px-3 py-2 focus:outline-none placeholder-slate-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-lg bg-gradient-to-r from-nova-cyan to-blue-400 text-slate-950 font-bold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-glow-cyan-sm hover:shadow-[0_0_16px_rgba(0,229,255,0.4)] active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
