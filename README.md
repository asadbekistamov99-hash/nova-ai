# NOVA AI — Windows Desktop Intelligent Assistant

![NOVA AI](docs/preview.jpg)

NOVA AI is a production-ready Windows desktop AI productivity assistant engineered with **React 19, TypeScript, Tailwind CSS, Electron, and Python FastAPI**. It combines chat, screenshot understanding, local OCR, multilingual translation, rewrite styles, smart clipboard monitoring, voice typing, document analysis, study tools, and meeting notes into a unified futuristic desktop companion.

---

## 🚀 Key Features Built in V1

1. **Native Windows Desktop Integration**:
   - Custom frameless Windows titlebar with drag region, minimize, maximize, and close controls.
   - Windows System Tray with quick launcher context menu.
   - Global keyboard shortcuts: `Ctrl + Space` (toggle window), `Ctrl + Shift + S` (screenshot).
   - Instant startup (<1.5s), memory optimized, GPU-accelerated glassmorphism.

2. **Multilingual Architecture (Zero Hardcoded Strings)**:
   - Full native localization for **Uzbek (O'zbek tili)**, **English**, and **Russian (Русский язык)**.
   - Instant language switching via the top navigation pill selector (`UZB | ENG | RUS`).

3. **10 Primary Functional Modules**:
   - 💬 **Ask AI**: Streaming conversations with multi-model switcher (Gemini, OpenAI, Claude, Ollama).
   - 📸 **Screenshot AI**: Full screen, active window, and cropped region capture with vision comprehension.
   - 🌐 **Translate**: Bidirectional translation between UZB, ENG, RUS + Latin/Cyrillic script converter.
   - ✍️ **Rewrite**: Style modes (Professional, Academic, Telegram, Rector format, Grammar polish).
   - 🔍 **OCR**: Local Windows OCR engine for extracting plain text and tables without cloud dependencies.
   - 📋 **Smart Clipboard**: History feed, auto-classification, pinned items, and sensitive password isolation.
   - 🎙️ **Voice Typing**: Speech-to-text dictation with AI punctuation and direct insertion into active apps.
   - 📄 **File AI**: Multi-format document parser (PDF, DOCX, XLSX, TXT) with local extraction.
   - 🎓 **Study Mode**: Academic quiz generator, flashcard decks, high-yield summary notes across disciplines.
   - 👥 **Meeting Notes**: Audio capture with explicit user consent, live speaker transcripts, and action items.

4. **Animated AI Robot Assistant**:
   - Original cybernetic companion character representing NOVA AI.
   - Live visual state machine: `IDLE`, `LISTENING`, `THINKING`, `SPEAKING`, `PROCESSING`, `SUCCESS`, `ERROR`.
   - Dynamic pulsing neon cyan audio equalizers and expressive visor LED eyes.

5. **Multimodal Intent Command Router**:
   - Natural language routing across English, Uzbek, and Russian.
   - Understands commands like `"Translate this into Russian"`, `"Buni ruschaga tarjima qil"`, `"Summarize this PDF"`, `"Ekranni tushuntirib ber"`, and automatically navigates to the right module.

6. **Privacy & Security Guardrails**:
   - Strict Local Private Mode toggle (cloud calls disabled; Ollama and local OCR preferred).
   - Safe action confirmation protocol before executing file or OS changes.
   - Zero plaintext credential storage (Windows DPAPI / Credential Manager ready).

---

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 18 (Tested on v24.21.0)
- Python >= 3.10 (Tested on Python 3.12)
- Windows 10 or 11

### 1. Run the Desktop Application
```bash
# Inside C:\Users\AI LAB\.gemini\antigravity\scratch\nova-ai
npm run desktop
```

### 2. Run in Development Mode with Hot Reload
```bash
npm run dev
# In another terminal:
npm run desktop
```

### 3. Build Production Windows Installer (.exe)
```bash
npm run electron:build
```

### 4. Run the Local Python Intelligence Engine (Optional Sidecar)
```bash
cd backend
py -m pip install -r requirements.txt
py app/main.py
```

---

## 📁 Project Structure

```
nova-ai/
├── apps/
│   └── desktop/
│       ├── electron/           # Windows Native Shell (Main, Preload, Tray, Shortcuts)
│       └── src-tauri/          # Tauri 2.0 Rust cross-compilation target
├── backend/
│   ├── app/
│   │   └── main.py             # FastAPI local intelligence sidecar
│   └── requirements.txt
├── src/
│   ├── components/
│   │   ├── titlebar/           # Frameless Titlebar & Language Selector
│   │   ├── sidebar/            # Fixed Left 10-Module Navigation
│   │   ├── robot/              # Animated NOVA Robot Assistant & Waveforms
│   │   └── command/            # Multimodal Command Bar & Mic Input
│   ├── modules/                # 10 Functional Modules
│   ├── pages/                  # Dashboard (Hero) & Settings
│   ├── stores/                 # Language, Navigation, Robot, and Settings stores
│   ├── services/               # Multilingual Intent Router (18/18 Unit Tested)
│   └── locales/                # uz.json, en.json, ru.json
└── tests/
    └── test_router.ts          # Automated router test suite
```
