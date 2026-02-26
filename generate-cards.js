const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const demos = [
  {
    num: '01', file: '01-text-generation.html',
    icon: '📅', title: 'Uni Study Planner', capability: 'Text Generation',
    description: 'Chat with an AI study planner that understands Australian uni life — units, WAM, swotvac, HECS. Choose your assistant style and get a personalised weekly plan.',
    tags: ['Temperature control', 'System instructions', 'WAM & swotvac'],
    gradient: ['#4338ca', '#6366f1'], accent: '#6366f1',
  },
  {
    num: '02', file: '02-image-generation.html',
    icon: '🖼️', title: 'Weekly Timetable Visualiser', capability: 'Image Generation',
    description: 'Describe your weekly schedule in plain text and Imagen generates a beautiful visual planner — minimal grid, colourful blocks, pastel aesthetic, or dark mode.',
    tags: ['Imagen API', 'Visual styles', 'PNG download'],
    gradient: ['#be185d', '#ec4899'], accent: '#ec4899',
    paid: true,
  },
  {
    num: '03', file: '03-speech-generation.html',
    icon: '🔊', title: 'Timetable Announcer', capability: 'Speech Generation',
    description: 'Generate spoken announcements for class reminders, schedule changes, and swotvac countdowns. Choose from five voices with a live waveform visualiser.',
    tags: ['TTS voices', 'Waveform display', 'WAV download'],
    gradient: ['#b45309', '#f59e0b'], accent: '#f59e0b',
  },
  {
    num: '04', file: '04-long-context.html',
    icon: '📚', title: 'University Handbook Analyser', capability: 'Long Context',
    description: 'Upload a unit outline or course handbook PDF and ask questions — due dates, hurdle requirements, assessment weightings, late submission policies, and more.',
    tags: ['PDF upload', '1M token context', 'Token counter'],
    gradient: ['#6d28d9', '#8b5cf6'], accent: '#8b5cf6',
  },
  {
    num: '05', file: '05-structured-output.html',
    icon: '📊', title: 'Class Schedule Parser', capability: 'Structured Output',
    description: 'Paste messy timetable text from your student portal and get back clean structured JSON — unit codes, types, days, times, and locations — plus a visual grid.',
    tags: ['JSON schema', 'Visual timetable grid', 'Unit codes'],
    gradient: ['#047857', '#10b981'], accent: '#10b981',
  },
  {
    num: '06', file: '06-thinking.html',
    icon: '🧠', title: 'Timetable Clash Resolver', capability: 'Thinking Mode',
    description: 'Describe your units, available time slots, and constraints (work shifts, travel time, preferences). The AI thinks step-by-step to find a clash-free timetable.',
    tags: ['Extended reasoning', 'Constraint solving', 'Thinking budget'],
    gradient: ['#b91c1c', '#ef4444'], accent: '#ef4444',
  },
  {
    num: '07', file: '07-document-processing.html',
    icon: '📷', title: 'Handwritten Timetable Digitiser', capability: 'Document Processing',
    description: 'Photograph a handwritten or printed timetable — whiteboard, paper planner, sticky note — and extract it into a clean structured day-by-day schedule.',
    tags: ['Handwriting OCR', 'Image upload', 'Structured output'],
    gradient: ['#0369a1', '#0ea5e9'], accent: '#0ea5e9',
  },
  {
    num: '08', file: '08-image-understanding.html',
    icon: '🗺️', title: 'Campus Map & Room Finder', capability: 'Image Understanding',
    description: 'Upload a campus map or building floor plan and ask questions — find your lecture theatre, get directions between buildings, or check room locations.',
    tags: ['Image analysis', 'Spatial reasoning', 'Campus navigation'],
    gradient: ['#0f766e', '#14b8a6'], accent: '#14b8a6',
  },
  {
    num: '09', file: '09-video-understanding.html',
    icon: '🎬', title: 'Lecture Recording Summariser', capability: 'Video Understanding',
    description: 'Upload a lecture recording and get a timestamped summary, key concepts, assessment hints mentioned by the lecturer, and a 5-minute study guide.',
    tags: ['Video upload', 'Timestamps', 'Study guide'],
    gradient: ['#c2410c', '#f97316'], accent: '#f97316',
  },
  {
    num: '10', file: '10-audio.html',
    icon: '🎧', title: 'Lecture Audio Transcriber', capability: 'Audio Processing',
    description: 'Upload lecture audio to get a full transcript, extract any due dates and deadlines mentioned by the lecturer, and pull out key terms and definitions.',
    tags: ['Audio transcription', 'Deadline extraction', 'Key terms'],
    gradient: ['#7e22ce', '#a855f7'], accent: '#a855f7',
  },
  {
    num: '11', file: '11-function-calling.html',
    icon: '💬', title: 'Smart Timetable Assistant', capability: 'Function Calling',
    description: 'Chat with an AI that controls a live timetable grid. Add or remove classes, check for clashes, and find free periods — all through natural language conversation.',
    tags: ['Function calling loop', 'Live grid UI', 'Clash detection'],
    gradient: ['#15803d', '#22c55e'], accent: '#22c55e',
  },
  {
    num: '12', file: '12-google-search.html',
    icon: '🔍', title: 'Course Info Lookup', capability: 'Google Search Grounding',
    description: 'Ask real-time questions about Australian uni courses — prerequisites, semester dates, WAM requirements for honours, special consideration policies — with source citations.',
    tags: ['Real-time search', 'Source citations', 'AU universities'],
    gradient: ['#1d4ed8', '#3b82f6'], accent: '#3b82f6',
  },
  {
    num: '13', file: '13-code-execution.html',
    icon: '💻', title: 'Study Load & WAM Calculator', capability: 'Code Execution',
    description: 'Gemini writes and runs Python to calculate your WAM impact, grade needed to pass or get an HD, weekly study load, and swotvac revision allocation.',
    tags: ['Live code execution', 'WAM calculations', 'HD/D/C/P/F scale'],
    gradient: ['#0e7490', '#06b6d4'], accent: '#06b6d4',
  },
  {
    num: '14', file: '14-url-context.html',
    icon: '🌐', title: 'Course Page Analyser', capability: 'URL Context',
    description: 'Paste a university handbook URL and extract prerequisites, assessments, contact hours, and semester details — or compare two units side by side.',
    tags: ['URL context tool', 'Unit comparison', 'AU handbook URLs'],
    gradient: ['#9f1239', '#e11d48'], accent: '#e11d48',
  },
];

function cardHtml(demo) {
  const tagBg = demo.accent + '18';
  const paidBadge = demo.paid
    ? `<span style="display:inline-flex;align-items:center;gap:3px;background:#fef3c7;color:#92400e;font-size:11px;font-weight:600;padding:2px 8px;border-radius:999px;margin-left:8px;">Paid API</span>`
    : '';

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 420px;
    height: 340px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  .card {
    width: 380px;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.14);
  }
  .card-header {
    background: linear-gradient(135deg, ${demo.gradient[0]}, ${demo.gradient[1]});
    padding: 20px 20px 16px;
    position: relative;
    overflow: hidden;
  }
  .card-header::before {
    content:'';
    position:absolute;
    top:-24px; right:-24px;
    width:100px; height:100px;
    border-radius:50%;
    background:rgba(255,255,255,0.1);
  }
  .card-meta {
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:10px;
  }
  .card-number {
    background:rgba(255,255,255,0.25);
    color:white;
    font-size:11px;
    font-weight:700;
    letter-spacing:0.06em;
    padding:3px 10px;
    border-radius:999px;
  }
  .card-icon { font-size:26px; line-height:1; }
  .card-title {
    color:white;
    font-size:16px;
    font-weight:700;
    margin-bottom:3px;
    letter-spacing:-0.01em;
  }
  .card-capability {
    color:rgba(255,255,255,0.78);
    font-size:11px;
    font-weight:500;
    text-transform:uppercase;
    letter-spacing:0.06em;
  }
  .card-body { padding:16px 20px 18px; }
  .card-description {
    color:#475569;
    font-size:12.5px;
    line-height:1.55;
    margin-bottom:12px;
  }
  .tags {
    display:flex;
    flex-wrap:wrap;
    gap:5px;
    margin-bottom:14px;
  }
  .tag {
    font-size:11px;
    font-weight:500;
    padding:3px 9px;
    border-radius:999px;
    background:${tagBg};
    color:${demo.accent};
  }
  .cta {
    display:inline-flex;
    align-items:center;
    gap:5px;
    background:${demo.gradient[1]};
    color:white;
    font-size:12.5px;
    font-weight:600;
    padding:8px 16px;
    border-radius:8px;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <div class="card-meta">
        <span class="card-number">${demo.num}</span>
        <span class="card-icon">${demo.icon}</span>
      </div>
      <div class="card-title">${demo.title}</div>
      <div class="card-capability">${demo.capability}${paidBadge}</div>
    </div>
    <div class="card-body">
      <p class="card-description">${demo.description}</p>
      <div class="tags">${demo.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="cta">Open demo →</div>
    </div>
  </div>
</body>
</html>`;
}

(async () => {
  const outDir = path.join(__dirname, 'cards');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 340, deviceScaleFactor: 2 });

  for (const demo of demos) {
    const html = cardHtml(demo);
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    // give fonts a moment to load
    await new Promise(r => setTimeout(r, 600));
    const outPath = path.join(outDir, `${demo.num}-card.png`);
    await page.screenshot({ path: outPath, clip: { x: 20, y: 0, width: 380, height: 340 } });
    console.log(`✓ ${outPath}`);
  }

  await browser.close();
  console.log('\nAll cards generated in ./cards/');
})();
