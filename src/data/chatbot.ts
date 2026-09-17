// Chatbot knowledge base — answers about Kishkindhan's portfolio
// All responses are local — no API needed.

export interface BotRule {
  keywords: string[];
  responses: string[];
}

export const BOT_RULES: BotRule[] = [
  // ── Greetings ──────────────────────────────────────────────────────────────
  {
    keywords: ['hi', 'hey', 'hello', 'sup', 'hola', 'yo', 'howdy', 'namaste', 'vanakkam'],
    responses: [
      "Hey there! 👋 I'm KBot — Kishkindhan's tiny digital sidekick. Ask me anything about him!",
      "Heyy! Welcome to Kishkindhan's corner of the internet 🌐 What would you like to know?",
      "Hello, human! 🤖 I know everything about Kishkindhan (well, almost everything). What's up?",
    ],
  },
  // ── Who is Kishkindhan ─────────────────────────────────────────────────────
  {
    keywords: ['who', 'about', 'tell me', 'introduce', 'kishkindhan', 'person'],
    responses: [
      "Kishkindhan A is a Computer Science student from Coimbatore 🇮🇳 who loves building web apps, designing clean UIs, and poking hardware with a soldering iron. He's a Full Stack Dev + UI/UX Designer + IoT tinkerer — basically a triple threat! ⚡",
      "Kishkindhan is a B.Tech CS student at Dr. N.G.P Institute of Technology. He codes by day, designs by night, and occasionally argues with Raspberry Pi at 2am. 😅",
    ],
  },
  // ── Skills ─────────────────────────────────────────────────────────────────
  {
    keywords: ['skill', 'tech', 'stack', 'know', 'language', 'tools', 'framework', 'use'],
    responses: [
      "Tech skills? Oh, he's got a list 📋\n• **Frontend**: React, TypeScript, Tailwind, Vite\n• **Backend**: Node.js, Flask, Express\n• **IoT**: ESP32, Raspberry Pi, Arduino\n• **Design**: Figma, UI/UX, Prototyping\n• **AI/ML**: Python, Computer Vision\n• **DB**: MySQL, PostgreSQL\nBasically a one-man dev army 💪",
      "He speaks fluent JavaScript, Python, Java, and also Tamil, English & a bit of Japanese 🇯🇵 (still learning that last one). Tech-wise: React + Node + IoT + Figma is his comfort zone.",
    ],
  },
  // ── Projects ───────────────────────────────────────────────────────────────
  {
    keywords: ['project', 'built', 'work', 'portfolio', 'app', 'system', 'build'],
    responses: [
      "He's built some cool stuff! Here are the highlights 🚀\n1. **Farm To Home** — Farm-to-door delivery with IoT logistics\n2. **Driver Safety Monitor** — Real-time drowsiness detection on Raspberry Pi\n3. **EcoTrack** — Carbon footprint dashboard\n4. **Smart Energy Meter** — ESP32 + smart contracts for billing\n5. **Rockfall Predictor** — Geological safety system for mines\n6. **Food Time UI** — Figma restaurant UI design\nAll available on the Projects page!",
      "He's built apps that range from fighting sleepy drivers 😴 to tracking your carbon guilt 🌿 to predicting rockfalls ⛰️ — not exactly your average todo-list projects!",
    ],
  },
  // ── Farm To Home ────────────────────────────────────────────────────────────
  {
    keywords: ['farm', 'food', 'agriculture', 'delivery', 'produce'],
    responses: [
      "Farm To Home 🌾 — a web app connecting farmers directly to consumers. It handles collection, sorting, and delivery of fresh produce with some IoT magic in the logistics layer. Fresh veggies, zero middlemen!",
    ],
  },
  // ── Driver monitoring ────────────────────────────────────────────────────────
  {
    keywords: ['driver', 'drowsy', 'eye', 'safety', 'monitor', 'raspberry', 'alert'],
    responses: [
      "The Driver Safety Monitor 👁️ uses a Raspberry Pi camera + computer vision (Python/OpenCV) to watch for eye closure, head tilts, and distraction in real-time. If you're falling asleep at the wheel — BEEP! Wake up! 🚨 Could genuinely save lives.",
    ],
  },
  // ── EcoTrack ─────────────────────────────────────────────────────────────────
  {
    keywords: ['eco', 'carbon', 'sustainability', 'environment', 'footprint', 'green'],
    responses: [
      "EcoTrack 🌍 is a Flask + PostgreSQL dashboard where you can track your carbon footprint, see interactive consumption charts, and get personalised reduction benchmarks. Basically guilt-tripping you into being eco-friendly — but in a nice way! 😄",
    ],
  },
  // ── Smart Energy Meter ───────────────────────────────────────────────────────
  {
    keywords: ['energy', 'meter', 'esp32', 'smart', 'grid', 'ledger', 'billing', 'electricity'],
    responses: [
      "Smart Energy Meter ⚡ — ESP32 + Raspberry Pi hardware that logs electricity usage, and then uses smart contracts on a decentralised ledger for tamper-proof billing. He basically put blockchain and IoT together because why not! 🤷‍♂️",
    ],
  },
  // ── Rockfall ────────────────────────────────────────────────────────────────
  {
    keywords: ['rock', 'mine', 'geo', 'slope', 'hazard', 'prediction', 'geological'],
    responses: [
      "Geotechnical Rockfall Predictor 🪨 — a safety system for open-pit mines that classifies slope hazard levels using computer vision and renders risk heatmaps with Streamlit. Saving miners from *rock*et-powered accidents! 😂",
    ],
  },
  // ── Food Time UI ─────────────────────────────────────────────────────────────
  {
    keywords: ['food time', 'restaurant', 'figma', 'ui design', 'glassmorphism', 'ordering'],
    responses: [
      "Food Time 🍔 is a high-fidelity Figma restaurant UI with smooth ordering flows, glassmorphism, Auto Layout, and micro-interactions. He spent way too long making sure the burger icon looked *just right*. 🍔✨",
    ],
  },
  // ── Education ─────────────────────────────────────────────────────────────
  {
    keywords: ['college', 'study', 'education', 'university', 'btech', 'degree', 'cgpa', 'gpa', 'grade', 'institute', 'ngp'],
    responses: [
      "He's studying B.Tech in Computer Science & Business Systems at Dr. N.G.P Institute of Technology, Coimbatore. Currently in his 6th semester with a CGPA of 6.9 🎓 — spending more time coding than cramming, honestly.",
      "B.Tech CSE at Dr. NGP Tech, Coimbatore. CGPA: 6.9 — because while others study theory, he's busy building actual things! 💻",
    ],
  },
  // ── IoT ───────────────────────────────────────────────────────────────────
  {
    keywords: ['iot', 'arduino', 'raspberry', 'esp32', 'microcontroller', 'hardware', 'embedded', 'sensor', 'gpio'],
    responses: [
      "He loooves IoT! 🔌 ESP32, Raspberry Pi, Arduino — he's comfortable with all of them. He's built real-time monitoring systems, energy meters, and computer-vision safety hardware. Basically a professional wire-tangler who also writes the firmware. 😄",
      "IoT is one of his specialisations! ESP32 + Raspberry Pi + Python is his hardware stack. He builds stuff that talks to the real world — sensors, actuators, cameras, the works.",
    ],
  },
  // ── Experience / internship ────────────────────────────────────────────────
  {
    keywords: ['internship', 'experience', 'work', 'job', 'career', 'company', 'hire'],
    responses: [
      "He's had industry exposure through an internship — and he's actively looking for opportunities right now 🙋 Full Stack Dev, UI/UX Design, IoT roles all interest him. You can reach him at kkishkindhan@gmail.com!",
      "Open to opportunities! 🚀 Internship experience under his belt, looking for full-time or freelance roles in web dev, UI/UX, or IoT. Drop a message on the Contact page!",
    ],
  },
  // ── Location ──────────────────────────────────────────────────────────────
  {
    keywords: ['location', 'where', 'from', 'city', 'country', 'coimbatore', 'india', 'tamilnadu'],
    responses: [
      "He's based in Coimbatore, Tamil Nadu, India 🇮🇳 — home of great engineering colleges, idli, and apparently, some pretty solid IoT projects! 😄",
    ],
  },
  // ── Contact ───────────────────────────────────────────────────────────────
  {
    keywords: ['contact', 'email', 'reach', 'message', 'phone', 'whatsapp', 'linkedin', 'github'],
    responses: [
      "You can reach Kishkindhan at 📧 kkishkindhan@gmail.com or 📱 +91 96293 37872. Also on LinkedIn and GitHub! Or… just fill in the Contact form on this very site. It's right there. 👀",
      "Contact details:\n📧 kkishkindhan@gmail.com\n📱 +91 96293 37872\n🔗 LinkedIn: linkedin.com/in/kishkindhan-a-614143302\n🐙 GitHub: github.com/Kishkindhan-A\nPick your favourite!",
    ],
  },
  // ── Languages spoken ─────────────────────────────────────────────────────
  {
    keywords: ['language', 'speak', 'tamil', 'english', 'japanese', 'hindi'],
    responses: [
      "Languages he speaks 🗣️\n• **English** — Fluent\n• **Tamil** — Fluent (native)\n• **Hindi** — Can read & write\n• **Japanese** — Currently learning 🇯🇵\n\nHe's basically trying to collect languages like Pokémon.",
    ],
  },
  // ── Funny / joke ──────────────────────────────────────────────────────────
  {
    keywords: ['joke', 'funny', 'laugh', 'haha', 'lol', 'humor', 'fun'],
    responses: [
      "Why do programmers prefer dark mode? 🌑 Because light attracts bugs! 🐛",
      "Why did Kishkindhan stare at the orange juice? 🧃 Because it said 'concentrate'! Get it? Like an async operation? No? 😅 Fine.",
      "How many IoT engineers does it take to change a light bulb? 💡 One — but they'll also make it tweet, log the data, and send an MQTT message when it burns out again.",
    ],
  },
  // ── Resume ────────────────────────────────────────────────────────────────
  {
    keywords: ['resume', 'cv', 'download', 'pdf'],
    responses: [
      "His resume is available on the portfolio! 📄 Head to the Hero section and click 'Download Resume' — or just email him directly at kkishkindhan@gmail.com and ask nicely! 😊",
    ],
  },
  // ── Design / Figma ────────────────────────────────────────────────────────
  {
    keywords: ['design', 'figma', 'ui', 'ux', 'interface', 'prototype', 'wireframe'],
    responses: [
      "UI/UX is one of his passions! 🎨 He uses Figma to design wireframes, prototypes, and full design systems. He cares a *lot* about micro-interactions, spacing, and that feeling when a product just *works* perfectly.",
      "He's a Figma fan 🎨 — from wireframes to polished high-fidelity prototypes. He believes good design is invisible; you only notice bad design.",
    ],
  },
  // ── Machine learning / AI ────────────────────────────────────────────────
  {
    keywords: ['ml', 'machine learning', 'ai', 'model', 'vision', 'computer vision', 'python', 'neural'],
    responses: [
      "He applies ML practically rather than theoretically! Computer vision for the driver monitor, predictive modelling for the rockfall system — real problems, real solutions. No buzzword soup, just working code. 🧠",
    ],
  },
  // ── Hobbies / personality ─────────────────────────────────────────────────
  {
    keywords: ['hobby', 'like', 'interest', 'free time', 'personal', 'favorite', 'love', 'passion'],
    responses: [
      "When he's not coding, Kishkindhan enjoys... more coding 😂 But also: UI/UX exploration, tinkering with hardware, picking up Japanese, and hunting for cool open-source projects to learn from.",
      "He's genuinely passionate about: clean design, IoT experiments, learning Japanese, and building things that actually solve problems — not just things that look good in a README.",
    ],
  },
  // ── This chatbot ──────────────────────────────────────────────────────────
  {
    keywords: ['bot', 'chatbot', 'ai', 'who are you', 'what are you'],
    responses: [
      "I'm KBot — a lightweight chatbot built right into Kishkindhan's portfolio. No GPT, no API, just a tiny knowledge base and a lot of personality! 🤖✨",
      "I'm KBot! A friendly little widget who knows everything about Kishkindhan. I live in the bottom-right corner and I'm powered by pure enthusiasm (and JavaScript). 🚀",
    ],
  },
  // ── Farewell ──────────────────────────────────────────────────────────────
  {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'cya', 'thanks', 'thank you', 'thx'],
    responses: [
      "Catch you later! 👋 Don't forget to check out the projects page. And hey — if you liked what you saw, drop Kishkindhan a message! 📨",
      "Bye! 🌟 It was great chatting. If you're a recruiter, definitely hit that Contact button up there. You won't regret it! 😄",
      "Thanks for stopping by! 🙏 Feel free to come back anytime. I'm always here (literally — I never close unless you click that X). 😂",
    ],
  },
];

export const FALLBACK_RESPONSES = [
  "Hmm, I'm not quite sure about that one 🤔 Try asking me about his skills, projects, education, or how to contact him!",
  "That's a bit outside my knowledge base 😅 I know a lot about Kishkindhan though — projects, tech stack, education, contact info. Try one of those!",
  "Good question! But I'm just a tiny bot with a limited brain 🧠 Ask me about his projects, skills, IoT work, or how to reach him!",
  "I don't have an answer for that one 🤷 But I do know Kishkindhan's entire portfolio! Try: 'what are his skills?' or 'tell me about his projects'.",
];

export function getBotResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  // Find matching rule
  for (const rule of BOT_RULES) {
    if (rule.keywords.some(kw => lower.includes(kw))) {
      const pool = rule.responses;
      return pool[Math.floor(Math.random() * pool.length)];
    }
  }

  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
}
