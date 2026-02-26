# Gemini API Timetable Demos

A collection of interactive HTML demos showcasing Google's Gemini API capabilities through university timetable examples. Each demo is a standalone HTML file that runs directly in your browser — no build tools or server required.

The goal of this collection is to help students and developers build a smart university timetable app. Each file demonstrates a specific Gemini SDK feature and shows how it could power a real timetable feature — from scheduling assistant chat to extracting class times from a PDF handbook.

## Quick Start

1. **Get a free API key** from Google AI Studio: https://aistudio.google.com/api-keys
2. **Clone or download** this repository
3. **Drag and drop** any HTML file into your browser
4. **Enter your API key** when prompted (stored locally in your browser)
5. **Start exploring!**

## Demo Catalog

### 1. Text Generation (`01-text-generation.html`)
**Timetable Chat Assistant**
Generate responses to timetable questions like "What should I study on Tuesday afternoon?" using adjustable creativity and system instructions.
- Temperature control
- System instructions
- Conversational responses

### 2. Image Generation (`02-image-generation.html`)
**Weekly Schedule Visualiser**
Generate a visual weekly timetable image from a text description of your subjects and preferred study times.
- Schedule visualisation
- Before/after comparisons
- Custom layouts

> **Note:** This demo uses Imagen and requires a **paid API token**.

### 3. Speech Generation (`03-speech-generation.html`)
**Timetable Announcer**
Generate audio announcements for class reminders, schedule changes, and daily briefings in different voice styles.
- Multiple voice styles
- Adjustable speech rate
- Reminder audio

### 4. Long Context Processing (`04-long-context.html`)
**University Handbook Analyser**
Upload a long PDF course handbook and extract specific class times, room numbers, and assessment dates.
- PDF processing
- Schedule extraction
- Large document handling

### 5. Structured Output (`05-structured-output.html`)
**Class Schedule Parser**
Convert a plain-text course description into structured JSON — perfect for populating a timetable database.
- JSON schema validation
- Data structuring
- Schedule parsing

### 6. Thinking Mode (`06-thinking.html`)
**Clash Resolver**
Solve complex scheduling problems — like fitting all required subjects into a week without clashes — with step-by-step reasoning.
- Step-by-step reasoning
- Constraint solving
- Logical deduction

### 7. Document Processing (`07-document-processing.html`)
**Handwritten Notes Digitiser**
Extract text from photos of handwritten timetables, sticky notes, or whiteboard schedules.
- Handwriting OCR
- Image upload support
- Text structure preservation

### 8. Image Understanding (`08-image-understanding.html`)
**Timetable Photo Reader**
Photograph a printed or handwritten timetable and have Gemini read and summarise the schedule for you.
- Image analysis
- Schedule reading
- Photo input

### 9. Video Understanding (`09-video-understanding.html`)
**Lecture Recording Summariser**
Extract key topics, timestamps, and action items from a lecture recording to help plan study sessions.
- Video processing
- Timestamp generation
- Topic detection

### 10. Audio Processing (`10-audio.html`)
**Lecture Audio Transcriber**
Transcribe a lecture audio clip and extract mentioned dates, deadlines, and assignment details.
- Audio transcription
- Date/deadline extraction
- Timeline creation

### 11. Function Calling (`11-function-calling.html`)
**Smart Timetable Assistant**
Control a timetable with natural language — add, move, or remove classes through conversation using function calls.
- Natural language control
- Calendar functions
- Conversational UI

### 12. Google Search Integration (`12-google-search.html`)
**Course Info Lookup**
Look up real-time information about courses, prerequisites, or university policies using grounded search results.
- Real-time search
- Fact verification
- Source citations

### 13. Code Execution (`13-code-execution.html`)
**Study Hours Calculator**
Generate and run code to calculate weekly study load, free periods, and optimal revision windows from a timetable.
- Code generation
- Live execution
- Schedule calculations

### 14. URL Context Processing (`14-url-context.html`)
**Course Page Analyser**
Paste a university course page URL and extract the schedule, assessment dates, and contact information automatically.
- URL processing
- Schedule extraction
- Data comparison

## How to Use

Open `index.html` in your browser for an overview of all demos, or open any individual file directly:

```bash
# Option 1: Open the main index
open index.html

# Option 2: Open a specific demo
open 01-text-generation.html
```

Or drag and drop any `.html` file into your browser window.

### API Key Setup

Each demo will prompt for your Google AI API key on first use. It is stored in your browser's `localStorage` and persists across sessions — you only need to enter it once per demo.

**Privacy note:** Your API key is stored locally and is never sent anywhere except Google's API endpoints.

## Important Notes

- **Demo 2 (Image Generation)** requires a **paid API token** (uses the Imagen API)
- All other demos work with the free tier
- No server or build process is required — every file is standalone
- API keys are stored in `localStorage`

## Technical Details

- Pure HTML/CSS/JavaScript — no frameworks required
- Uses the `@google/generative-ai` SDK via CDN
- Responsive design works on desktop and mobile
- All demos include error handling and loading states

## Resources

- **Get API Key:** https://aistudio.google.com/api-keys
- **Gemini API Docs:** https://ai.google.dev/gemini-api/docs
- **API Reference:** https://ai.google.dev/api

## Contributing

These demos are designed as educational starting points. Feel free to:
- Use them as templates for your own timetable app
- Modify and extend each demo
- Share them with others learning about AI-powered scheduling

## License

Provided as-is for educational purposes.

---

**Build your smart timetable with Gemini.**
