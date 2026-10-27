import { IntentRouter } from '../src/services/intentRouter';

// Characterize current keyword ordering and parameters before changing routing.
const cases: Array<{
  input: string;
  intent: string;
  parameters: Record<string, unknown>;
}> = [
  { input: 'Translate this PDF into Russian', intent: 'translate', parameters: { targetLang: 'ru' } },
  { input: 'Summarize this PDF from my screen', intent: 'screenshot_ai', parameters: { mode: 'active_window' } },
  { input: 'Extract text from this PDF', intent: 'file_ai', parameters: { action: 'summarize' } },
  { input: 'Extract text from this image', intent: 'ocr', parameters: { extractType: 'table_or_text' } },
  { input: 'Rewrite my meeting notes', intent: 'rewrite', parameters: { style: 'professional' } },
  { input: 'Create a quiz from this meeting', intent: 'study_mode', parameters: { questionsCount: 20 } },
  { input: 'Translate this into Uzbek', intent: 'translate', parameters: { targetLang: 'uz' } },
  { input: 'Translate this text', intent: 'translate', parameters: { targetLang: 'en' } },
  { input: 'What is the weather?', intent: 'ask_ai', parameters: { query: 'What is the weather?' } },
];

let failures = 0;
for (const testCase of cases) {
  const actual = IntentRouter.routeCommand(testCase.input);
  const matches = actual.intent === testCase.intent &&
    JSON.stringify(actual.parameters) === JSON.stringify(testCase.parameters);
  if (!matches) {
    failures++;
    console.error(`FAIL: ${testCase.input}`, { expected: testCase, actual });
  } else {
    console.log(`PASS: ${testCase.input}`);
  }
}
console.log(`\n${cases.length - failures}/${cases.length} characterization cases passed.`);
if (failures) process.exitCode = 1;
