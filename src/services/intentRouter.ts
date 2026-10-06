import { NavModule } from '../stores/useNavigationStore';

export interface IntentResult {
  intent: NavModule;
  confidence: number;
  parameters: Record<string, any>;
  explanation: string;
}

export class IntentRouter {
  public static routeCommand(rawInput: string): IntentResult {
    const text = rawInput.trim().toLowerCase();

    // 1. TRANSLATE patterns (EN, UZ, RU)
    if (
      text.includes('translate') ||
      text.includes('tarjima') ||
      text.includes('переведи') ||
      text.includes('перевод') ||
      text.includes('into english') ||
      text.includes('into russian') ||
      text.includes('ruschaga') ||
      text.includes('inglizchaga')
    ) {
      let targetLang = 'en';
      if (text.includes('russian') || text.includes('ruscha') || text.includes('русский') || text.includes('рус')) {
        targetLang = 'ru';
      } else if (text.includes('uzbek') || text.includes('o\'zbek') || text.includes('узбек')) {
        targetLang = 'uz';
      }
      return {
        intent: 'translate',
        confidence: 0.98,
        parameters: { targetLang },
        explanation: 'Routed to Translate module with target language detection',
      };
    }

    // 2. SCREENSHOT AI patterns
    if (
      text.includes('screenshot') ||
      text.includes('screen') ||
      text.includes('skrinshot') ||
      text.includes('ekran') ||
      text.includes('снимок экрана') ||
      text.includes('скриншот') ||
      text.includes('what is on my screen') ||
      text.includes('ekrandagi')
    ) {
      return {
        intent: 'screenshot_ai',
        confidence: 0.96,
        parameters: { mode: 'active_window' },
        explanation: 'Screen analysis detected',
      };
    }

    // 3. FILE AI patterns
    if (
      text.includes('pdf') ||
      text.includes('document') ||
      text.includes('file') ||
      text.includes('fayl') ||
      text.includes('hujjat') ||
      text.includes('документ') ||
      text.includes('файл') ||
      text.includes('summarize this pdf') ||
      text.includes('docx') ||
      text.includes('excel')
    ) {
      return {
        intent: 'file_ai',
        confidence: 0.95,
        parameters: { action: 'summarize' },
        explanation: 'Document or PDF operation identified',
      };
    }

    // 4. OCR patterns
    if (
      text.includes('ocr') ||
      (text.includes('extract') && (text.includes('table') || text.includes('text') || text.includes('data'))) ||
      text.includes('matnni ajrat') ||
      text.includes('jadval') ||
      text.includes('распознай') ||
      text.includes('извлеки') ||
      text.includes('распознать')
    ) {
      return {
        intent: 'ocr',
        confidence: 0.95,
        parameters: { extractType: 'table_or_text' },
        explanation: 'Text/Table extraction OCR requested',
      };
    }

    // 5. REWRITE patterns
    if (
      text.includes('rewrite') ||
      text.includes('rephrase') ||
      text.includes('qayta yoz') ||
      text.includes('tahrirla') ||
      text.includes('перепиши') ||
      text.includes('сделай рерайт') ||
      text.includes('write this professionally') ||
      text.includes('telegram uchun') ||
      text.includes('for a rector')
    ) {
      return {
        intent: 'rewrite',
        confidence: 0.94,
        parameters: { style: 'professional' },
        explanation: 'Stylistic rewriting requested',
      };
    }

    // 6. VOICE TYPING patterns
    if (
      text.includes('voice typing') ||
      text.includes('write what i am saying') ||
      text.includes('ovozimni yoz') ||
      text.includes('диктовка') ||
      text.includes('пиши что я говорю') ||
      text.includes('ovozli kirit') ||
      text.includes('diktafon')
    ) {
      return {
        intent: 'voice_typing',
        confidence: 0.97,
        parameters: { autoPunctuation: true },
        explanation: 'Voice dictation activated',
      };
    }

    // 7. STUDY MODE patterns
    if (
      text.includes('study') ||
      text.includes('exam') ||
      text.includes('quiz') ||
      text.includes('flashcard') ||
      text.includes('test') ||
      text.includes('savollar') ||
      text.includes('imtihon') ||
      text.includes('лекция') ||
      text.includes('вопросы к тесту') ||
      text.includes('билеты') ||
      text.includes('konspekt')
    ) {
      return {
        intent: 'study_mode',
        confidence: 0.96,
        parameters: { questionsCount: 20 },
        explanation: 'Academic/study generation workflow requested',
      };
    }

    // 8. MEETING NOTES patterns
    if (
      text.includes('meeting') ||
      text.includes('notes from this meeting') ||
      text.includes('majlis') ||
      text.includes('uchrashuv') ||
      text.includes('митинг') ||
      text.includes('собрание') ||
      text.includes('протокол') ||
      text.includes('action items')
    ) {
      return {
        intent: 'meeting_notes',
        confidence: 0.95,
        parameters: { generateActionItems: true },
        explanation: 'Meeting summarization workflow initiated',
      };
    }

    // 9. CLIPBOARD patterns
    if (
      text.includes('clipboard') ||
      text.includes('bufer') ||
      text.includes('nusxalangan') ||
      text.includes('буфер') ||
      text.includes('скопированное')
    ) {
      return {
        intent: 'clipboard',
        confidence: 0.93,
        parameters: {},
        explanation: 'Clipboard intelligence module requested',
      };
    }

    // Default fallback: General Ask AI query
    return {
      intent: 'ask_ai',
      confidence: 0.88,
      parameters: { query: rawInput },
      explanation: 'General query routed to Ask AI conversation assistant',
    };
  }
}
