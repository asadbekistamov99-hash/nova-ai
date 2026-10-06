/**
 * AI Provider Service - Real API Integrations
 * Supports: Gemini, OpenAI, Claude (via Claude API), Ollama (local)
 */

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  text: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}

export interface AIProviderConfig {
  type: 'gemini' | 'openai' | 'claude' | 'ollama';
  apiKey?: string;
  model: string;
  endpoint?: string; // For Ollama
}

class AIProvider {
  private config: AIProviderConfig;

  constructor(config: AIProviderConfig) {
    this.config = config;
  }

  async sendMessage(messages: AIMessage[]): Promise<AIResponse> {
    switch (this.config.type) {
      case 'gemini':
        return this.sendToGemini(messages);
      case 'openai':
        return this.sendToOpenAI(messages);
      case 'claude':
        return this.sendToClaude(messages);
      case 'ollama':
        return this.sendToOllama(messages);
      default:
        throw new Error(`Unknown provider: ${this.config.type}`);
    }
  }

  private async sendToGemini(messages: AIMessage[]): Promise<AIResponse> {
    if (!this.config.apiKey) {
      throw new Error('Gemini API key not configured. Add it in Settings.');
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.config.model}:generateContent?key=${this.config.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: messages.map((m) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          })),
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      throw new Error('No text content in Gemini response');
    }

    return {
      text: textContent,
      model: this.config.model,
      usage: {
        promptTokens: data.usageMetadata?.promptTokens || 0,
        completionTokens: data.usageMetadata?.candidatesTokens || 0,
      },
    };
  }

  private async sendToOpenAI(messages: AIMessage[]): Promise<AIResponse> {
    if (!this.config.apiKey) {
      throw new Error('OpenAI API key not configured. Add it in Settings.');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model,
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const textContent = data.choices?.[0]?.message?.content;

    if (!textContent) {
      throw new Error('No text content in OpenAI response');
    }

    return {
      text: textContent,
      model: this.config.model,
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
      },
    };
  }

  private async sendToClaude(messages: AIMessage[]): Promise<AIResponse> {
    if (!this.config.apiKey) {
      throw new Error('Claude API key not configured. Add it in Settings.');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.config.model,
        max_tokens: 1024,
        messages,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Claude API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const textContent = data.content?.[0]?.text;

    if (!textContent) {
      throw new Error('No text content in Claude response');
    }

    return {
      text: textContent,
      model: this.config.model,
      usage: {
        promptTokens: data.usage?.input_tokens || 0,
        completionTokens: data.usage?.output_tokens || 0,
      },
    };
  }

  private async sendToOllama(messages: AIMessage[]): Promise<AIResponse> {
    const endpoint = this.config.endpoint || 'http://127.0.0.1:11434';

    // Test if Ollama is running
    try {
      const healthCheck = await fetch(`${endpoint}/api/tags`, { method: 'GET' });
      if (!healthCheck.ok) {
        throw new Error('Ollama is not running');
      }
    } catch (err) {
      throw new Error(
        `Cannot connect to Ollama at ${endpoint}. Make sure Ollama is running: 'ollama serve'`
      );
    }

    const response = await fetch(`${endpoint}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.config.model,
        messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data = await response.json();
    const textContent = data.message?.content;

    if (!textContent) {
      throw new Error('No text content in Ollama response');
    }

    return {
      text: textContent,
      model: this.config.model,
    };
  }
}

// Factory function
export const createAIProvider = (config: AIProviderConfig): AIProvider => {
  return new AIProvider(config);
};
