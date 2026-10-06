import { IntentRouter } from '../src/services/intentRouter';

const testCases = [
  { input: 'Translate this text into Russian.', expected: 'translate' },
  { input: 'Buni ingliz tiliga tarjima qil.', expected: 'translate' },
  { input: 'Переведи этот документ на русский.', expected: 'translate' },
  { input: 'Explain what is on my screen.', expected: 'screenshot_ai' },
  { input: 'Ekranni tahlil qil va skrinshot ol.', expected: 'screenshot_ai' },
  { input: 'Summarize this PDF report.', expected: 'file_ai' },
  { input: 'Ushbu Word hujjatni tushuntir.', expected: 'file_ai' },
  { input: 'Write what I am saying right now.', expected: 'voice_typing' },
  { input: 'Ovozimni yozib ol.', expected: 'voice_typing' },
  { input: 'Extract this table from image.', expected: 'ocr' },
  { input: 'Jadvalni ajratib ol.', expected: 'ocr' },
  { input: 'Rewrite this for a rector.', expected: 'rewrite' },
  { input: 'Buni Telegram uchun moslab tahrirla.', expected: 'rewrite' },
  { input: 'Create 20 test questions from this lecture.', expected: 'study_mode' },
  { input: 'Imtihon savollarini tayyorla.', expected: 'study_mode' },
  { input: 'Create notes from this meeting.', expected: 'meeting_notes' },
  { input: 'Majlisdan qaydlar tayyorla.', expected: 'meeting_notes' },
  { input: 'Show my clipboard history.', expected: 'clipboard' },
];

let passed = 0;
for (const tc of testCases) {
  const result = IntentRouter.routeCommand(tc.input);
  const ok = result.intent === tc.expected;
  if (ok) {
    passed++;
    console.log(`[PASS] "${tc.input}" -> ${result.intent} (conf: ${result.confidence})`);
  } else {
    console.error(`[FAIL] "${tc.input}" -> Got: ${result.intent}, Expected: ${tc.expected}`);
  }
}

console.log(`\nTest Summary: ${passed}/${testCases.length} Intent Router tests passed successfully.`);
if (passed !== testCases.length) {
  process.exit(1);
}
