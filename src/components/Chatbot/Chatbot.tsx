import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { getBotResponse } from '../../data/chatbot';
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
  time: string;
}

const WELCOME: Message = {
  id: 0,
  from: 'bot',
  text: "Hey! 👋 I'm **KBot** — Kishkindhan's mini assistant. Ask me anything about him: his skills, projects, education, or even a joke! 😄",
  time: now(),
};

const SUGGESTIONS = [
  "What are his skills?",
  "Tell me about his projects",
  "How can I contact him?",
  "Tell me a joke 😄",
];

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderText(text: string) {
  // Bold **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
      setUnread(0);
    }
  }, [open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now(),
      from: 'user',
      text: text.trim(),
      time: now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate bot thinking delay (300–900ms)
    const delay = 350 + Math.random() * 550;
    setTimeout(() => {
      const botReply: Message = {
        id: Date.now() + 1,
        from: 'bot',
        text: getBotResponse(text),
        time: now(),
      };
      setMessages(prev => [...prev, botReply]);
      setTyping(false);
      if (!open) setUnread(n => n + 1);
    }, delay);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(input);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!open && (
            <motion.button
              key="fab"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              onClick={() => setOpen(true)}
              aria-label="Open chat"
              className="relative h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              <MessageCircle size={24} />
              {/* Pulse ring */}
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-40"
                style={{ background: 'var(--accent)' }}
              />
              {/* Unread badge */}
              {unread > 0 && (
                <span
                  className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full text-[11px] font-bold flex items-center justify-center px-1"
                  style={{ background: '#EF4444', color: '#fff' }}
                >
                  {unread}
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat Window */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="window"
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="absolute bottom-0 right-0 w-[340px] sm:w-[380px] rounded-2xl border overflow-hidden flex flex-col"
              style={{
                background: 'var(--bg)',
                borderColor: 'var(--border)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.14)',
                maxHeight: '560px',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3.5"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-none">KBot</p>
                    <p className="text-xs text-white/75 mt-0.5">Kishkindhan's assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
                style={{ minHeight: 0, maxHeight: 380 }}
              >
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div
                      className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center"
                      style={{
                        background: msg.from === 'bot' ? 'var(--accent-pale)' : 'var(--surface)',
                        color: msg.from === 'bot' ? 'var(--accent)' : 'var(--ink-muted)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {msg.from === 'bot' ? <Bot size={14} /> : <User size={14} />}
                    </div>

                    <div className={`max-w-[80%] ${msg.from === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div
                        className="rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
                        style={
                          msg.from === 'bot'
                            ? { background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--border)', borderBottomLeftRadius: 6 }
                            : { background: 'var(--accent)', color: '#fff', borderBottomRightRadius: 6 }
                        }
                      >
                        {msg.from === 'bot' ? renderText(msg.text) : msg.text}
                      </div>
                      <span className="text-[10px] mt-1 px-1" style={{ color: 'var(--ink-subtle)' }}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <div className="flex gap-2.5 items-end">
                    <div
                      className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--accent-pale)', color: 'var(--accent)', border: '1px solid var(--border)' }}
                    >
                      <Bot size={14} />
                    </div>
                    <div
                      className="flex items-center gap-1 px-4 py-3 rounded-2xl"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderBottomLeftRadius: 6 }}
                    >
                      {[0, 1, 2].map(i => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background: 'var(--ink-subtle)',
                            animation: `bounce 1.2s ${i * 0.2}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Suggestions (only when few messages) */}
              {messages.length < 3 && !typing && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs px-2.5 py-1 rounded-full border transition-all duration-150 cursor-pointer"
                      style={{ borderColor: 'var(--border)', color: 'var(--ink-muted)', background: 'var(--surface)' }}
                      onMouseEnter={e => {
                        const t = e.currentTarget as HTMLElement;
                        t.style.borderColor = 'var(--accent)';
                        t.style.color = 'var(--accent)';
                      }}
                      onMouseLeave={e => {
                        const t = e.currentTarget as HTMLElement;
                        t.style.borderColor = 'var(--border)';
                        t.style.color = 'var(--ink-muted)';
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div
                className="px-4 py-3 flex items-center gap-2.5 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask something..."
                  className="flex-1 text-sm px-3.5 py-2.5 rounded-xl border outline-none transition-all duration-150"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--ink)',
                  }}
                  onFocus={e => { (e.target as HTMLElement).style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { (e.target as HTMLElement).style.borderColor = 'var(--border)'; }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || typing}
                  className="h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-150 disabled:opacity-40 cursor-pointer"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                  aria-label="Send"
                >
                  <Send size={15} />
                </button>
              </div>

              {/* Footer watermark */}
              <div className="px-4 pb-3 flex items-center justify-center gap-1">
                <Sparkles size={10} style={{ color: 'var(--ink-subtle)' }} />
                <span className="text-[10px]" style={{ color: 'var(--ink-subtle)' }}>
                  KBot · Offline · No data collected
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bounce keyframe */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </>
  );
}
