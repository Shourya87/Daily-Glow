import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
//  THEME TOKENS
// ─────────────────────────────────────────────
const LIGHT = {
  bg: "from-rose-100 via-fuchsia-50 to-indigo-100",
  blob1: "#f9a8d4",   // pink-300
  blob2: "#c4b5fd",   // purple-300
  blob3: "#fde68a",   // yellow-200
  glass: "rgba(255,255,255,0.45)",
  glassBorder: "rgba(255,255,255,0.65)",
  text: "#4a3f5c",
  textMuted: "#9d8faf",
  textStrong: "#2e1f3e",
  accent: "#e879a0",
  accentGrad: "linear-gradient(135deg,#f472b6,#a78bfa)",
  inputBg: "rgba(255,255,255,0.55)",
  progressTrack: "rgba(255,255,255,0.4)",
  progressBar: "linear-gradient(90deg,#f472b6,#a78bfa)",
  tagBg: "rgba(244,114,182,0.15)",
  tagText: "#e879a0",
  toggleBg: "rgba(255,255,255,0.55)",
  toggleText: "#5c4a72",
};

const DARK = {
  bg: "from-[#13041f] via-[#0d0520] to-[#070318]",
  blob1: "#581c87",
  blob2: "#312e81",
  blob3: "#701a75",
  glass: "rgba(255,255,255,0.05)",
  glassBorder: "rgba(255,255,255,0.10)",
  text: "#e9d5ff",
  textMuted: "rgba(196,167,255,0.5)",
  textStrong: "#f3e8ff",
  accent: "#e879f9",
  accentGrad: "linear-gradient(135deg,#e879f9,#818cf8)",
  inputBg: "rgba(255,255,255,0.06)",
  progressTrack: "rgba(255,255,255,0.08)",
  progressBar: "linear-gradient(90deg,#e879f9,#818cf8)",
  tagBg: "rgba(232,121,249,0.18)",
  tagText: "#f0abfc",
  toggleBg: "rgba(255,255,255,0.07)",
  toggleText: "#e9d5ff",
};

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────
const QUOTES = [
  { text: "You are not behind. You are exactly where you need to be.", sub: "a soft reminder" },
  { text: "Rest is not giving up — it's giving yourself what you actually need.", sub: "permission granted" },
  { text: "You're doing better than you think. 🌷", sub: "always & forever" },
  { text: "Take a breath… you've already survived 100% of your hard days.", sub: "the universe, probably" },
  { text: "Small steps still move you forward. Every single one.", sub: "a gentle truth" },
  { text: "Being soft in a hard world is a kind of bravery.", sub: "a love note to you" },
  { text: "Progress, not perfection. Every time. 🌙", sub: "your biggest fan" },
  { text: "You deserve the same love you give to everyone else.", sub: "just so you know" },
];

const MOODS = [
  { emoji: "🌸", label: "Blooming" },
  { emoji: "☁️", label: "Cloudy" },
  { emoji: "🌙", label: "Dreamy" },
  { emoji: "✨", label: "Glowing" },
  { emoji: "🌧️", label: "Heavy" },
  { emoji: "🦋", label: "Shifting" },
];

const WATER_GOAL = 8;

const DEFAULT_TASKS = [
  { id: 1, text: "Drink your water 💧", done: false },
  { id: 2, text: "5 minutes of stillness 🕯️", done: false },
  { id: 3, text: "Tell someone you love them 🌸", done: false },
];

// ─────────────────────────────────────────────
//  GLOBAL STYLES
// ─────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { font-family: 'DM Sans', sans-serif; }

  @keyframes blob1 {
    0%,100% { transform: translate(0,0) scale(1); }
    30%     { transform: translate(50px,-40px) scale(1.06); }
    65%     { transform: translate(-25px,30px) scale(0.96); }
  }
  @keyframes blob2 {
    0%,100% { transform: translate(0,0) scale(1); }
    40%     { transform: translate(-45px,30px) scale(1.04); }
    75%     { transform: translate(20px,-20px) scale(0.98); }
  }
  @keyframes blob3 {
    0%,100% { transform: translate(0,0) scale(1); }
    50%     { transform: translate(25px,-50px) scale(1.07); }
  }
  @keyframes breathe {
    0%,100% { transform: scale(1); }
    50%     { transform: scale(1.007); }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(10px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes popBounce {
    0%   { transform:scale(1); }
    40%  { transform:scale(1.4); }
    70%  { transform:scale(0.9); }
    100% { transform:scale(1.1); }
  }
  @keyframes shimmer {
    from { background-position: -200% center; }
    to   { background-position:  200% center; }
  }
  @keyframes slideCard {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes cursor-blink {
    0%,100% { opacity:1; }
    50%     { opacity:0; }
  }

  .dg-card {
    border-radius: 24px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04);
    transition: background 1s ease, border-color 1s ease, box-shadow 0.5s ease;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  .dg-card:hover {
    box-shadow: 0 12px 40px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05);
  }

  .slide-1 { animation: slideCard 0.85s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
  .slide-2 { animation: slideCard 0.85s cubic-bezier(0.16,1,0.3,1) 0.18s both; }
  .slide-3 { animation: slideCard 0.85s cubic-bezier(0.16,1,0.3,1) 0.30s both; }
  .slide-4 { animation: slideCard 0.85s cubic-bezier(0.16,1,0.3,1) 0.43s both; }

  .glow-btn {
    background: linear-gradient(135deg,#f472b6,#a78bfa);
    background-size: 200% auto;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
  }
  .glow-btn:hover {
    animation: shimmer 1.2s linear infinite;
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(244,114,182,0.5);
  }
  .glow-btn:active { transform: scale(0.97); }

  input::placeholder { opacity: 0.5; }
  input:focus { outline: none; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(180,120,200,0.25); border-radius: 10px; }

  .cursor { animation: cursor-blink 1s step-end infinite; }

  .pop { animation: popBounce 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards; }
`;

// ─────────────────────────────────────────────
//  TYPEWRITER HOOK
// ─────────────────────────────────────────────
function useTypewriter(text, speed = 26) {
  const [display, setDisplay] = useState("");
  const ref = useRef(0);
  useEffect(() => {
    ref.current = 0;
    setDisplay("");
    const iv = setInterval(() => {
      ref.current++;
      setDisplay(text.slice(0, ref.current));
      if (ref.current >= text.length) clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);
  return display;
}

// ─────────────────────────────────────────────
//  FLOATING BLOBS
// ─────────────────────────────────────────────
function Blobs({ t }) {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {[
        { color: t.blob1, w: 520, h: 520, top: "-12%", left: "-12%", anim: "blob1 20s ease-in-out infinite" },
        { color: t.blob2, w: 420, h: 420, bottom: "2%", right: "-10%", anim: "blob2 25s ease-in-out infinite" },
        { color: t.blob3, w: 300, h: 300, top: "38%", left: "28%", anim: "blob3 30s ease-in-out infinite" },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: b.w, height: b.h,
            borderRadius: "50%",
            background: b.color,
            filter: "blur(100px)",
            opacity: 0.38,
            top: b.top, left: b.left, bottom: b.bottom, right: b.right,
            animation: b.anim,
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
//  QUOTE CARD
// ─────────────────────────────────────────────
function QuoteCard({ t, dark }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const typed = useTypewriter(visible ? QUOTES[idx].text : "", 28);

  const cycle = () => {
    setVisible(false);
    setTimeout(() => { setIdx(i => (i + 1) % QUOTES.length); setVisible(true); }, 350);
  };

  useEffect(() => {
    const timer = setInterval(cycle, 13000);
    return () => clearInterval(timer);
  }, [idx]);

  return (
    <div
      className="dg-card slide-1"
      style={{
        background: t.glass, border: `1px solid ${t.glassBorder}`,
        animation: "breathe 7s ease-in-out infinite, slideCard 0.85s cubic-bezier(0.16,1,0.3,1) 0.05s both",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Decorative gradient accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: t.accentGrad, borderRadius: "24px 24px 0 0",
      }} />

      <p style={{ fontSize: 10, letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase", color: t.textMuted, marginBottom: 14 }}>
        ✦ today's reminder
      </p>

      <div style={{ minHeight: 90, transition: "opacity 0.35s ease", opacity: visible ? 1 : 0 }}>
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 19,
          fontWeight: 400,
          lineHeight: 1.65,
          color: t.textStrong,
          letterSpacing: "0.005em",
        }}>
          {typed}
          <span className="cursor" style={{ color: t.accent, marginLeft: 1 }}>|</span>
        </p>
        <p style={{ marginTop: 10, fontSize: 12, color: t.textMuted, fontStyle: "italic" }}>
          — {QUOTES[idx].sub}
        </p>
      </div>

      <button
        onClick={cycle}
        style={{
          marginTop: 16, fontSize: 11, color: t.accent,
          background: "none", border: `1px solid ${t.accent}40`,
          borderRadius: 100, padding: "6px 14px", cursor: "pointer",
          transition: "all 0.4s ease",
        }}
        onMouseEnter={e => e.target.style.background = t.accent + "18"}
        onMouseLeave={e => e.target.style.background = "none"}
      >
        next reminder →
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
//  MOOD TRACKER
// ─────────────────────────────────────────────
function MoodTracker({ t }) {
  const [sel, setSel] = useState(null);
  const [popped, setPopped] = useState(null);

  const pick = i => {
    setSel(i); setPopped(i);
    setTimeout(() => setPopped(null), 600);
  };

  const affirmations = [
    "Blooming — that's beautiful. Keep growing. 🌸",
    "Cloudy days make the clear ones matter. ☁️",
    "Dreaming is productive. Stay soft. 🌙",
    "Glowing today — the world sees it. ✨",
    "Heavy is okay. You're allowed to feel everything. 🌧️",
    "Shifting means you're alive and evolving. 🦋",
  ];

  return (
    <div className="dg-card slide-2" style={{ background: t.glass, border: `1px solid ${t.glassBorder}` }}>
      <p style={{ fontSize: 10, letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase", color: t.textMuted, marginBottom: 4 }}>
        ✦ how are you feeling?
      </p>
      <p style={{ fontSize: 13, color: t.textMuted, marginBottom: 16 }}>no judgment, just curiosity 🌿</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {MOODS.map((m, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
              padding: "12px 8px", borderRadius: 18, cursor: "pointer",
              background: sel === i ? t.tagBg : t.glass,
              border: sel === i ? `1.5px solid ${t.accent}50` : `1px solid ${t.glassBorder}`,
              color: sel === i ? t.tagText : t.textMuted,
              transform: popped === i ? "scale(1.2)" : sel === i ? "scale(1.04)" : "scale(1)",
              transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span style={{ fontSize: 24, display: "block" }}>{m.emoji}</span>
            <span style={{ fontSize: 10, fontWeight: 500 }}>{m.label}</span>
          </button>
        ))}
      </div>

      {sel !== null && (
        <p style={{
          marginTop: 14, textAlign: "center", fontSize: 13, color: t.accent,
          animation: "fadeUp 0.6s ease forwards",
        }}>
          {affirmations[sel]}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  WATER TRACKER
// ─────────────────────────────────────────────
function WaterTracker({ t }) {
  const [glasses, setGlasses] = useState(0);
  const pct = (glasses / WATER_GOAL) * 100;

  const message =
    glasses === 0 ? "hydration is self-love 💧"
    : glasses <= 2 ? "a little sip of love ✨"
    : glasses <= 4 ? "halfway there — keep glowing 🌊"
    : glasses <= 6 ? "almost full, you're doing amazing 🌸"
    : glasses < WATER_GOAL ? "one more and you're unstoppable 💎"
    : "fully hydrated & luminous 🌟";

  const tap = i => setGlasses(i < glasses ? i : i + 1);

  return (
    <div className="dg-card slide-3" style={{ background: t.glass, border: `1px solid ${t.glassBorder}` }}>
      <p style={{ fontSize: 10, letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase", color: t.textMuted, marginBottom: 4 }}>
        ✦ hydrate your glow
      </p>
      <p style={{ fontSize: 13, color: t.textMuted, marginBottom: 16 }}>{message}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {Array.from({ length: WATER_GOAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => tap(i)}
            style={{
              fontSize: 22, background: "none", border: "none", cursor: "pointer", padding: 0,
              filter: i < glasses ? "none" : "grayscale(1)",
              opacity: i < glasses ? 1 : 0.25,
              transform: i < glasses ? "scale(1.1)" : "scale(1)",
              transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >💧</button>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ height: 10, borderRadius: 100, background: t.progressTrack, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 100,
          background: t.progressBar,
          width: `${pct}%`,
          transition: "width 0.9s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 11, color: t.textMuted }}>{glasses} glasses</span>
        <span style={{ fontSize: 11, color: t.textMuted }}>goal: {WATER_GOAL}</span>
      </div>

      {glasses >= WATER_GOAL && (
        <p style={{
          marginTop: 12, textAlign: "center", fontSize: 13,
          background: t.accentGrad,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          fontWeight: 500, animation: "fadeUp 0.8s ease forwards",
        }}>
          ✨ you absolutely nailed it today
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  TODO LIST
// ─────────────────────────────────────────────
function TodoList({ t }) {
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [input, setInput] = useState("");
  const [removing, setRemoving] = useState(null);

  const add = () => {
    if (!input.trim()) return;
    setTasks(p => [...p, { id: Date.now(), text: input.trim(), done: false }]);
    setInput("");
  };

  const toggle = id => setTasks(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const remove = id => {
    setRemoving(id);
    setTimeout(() => { setTasks(p => p.filter(t => t.id !== id)); setRemoving(null); }, 400);
  };

  const done = tasks.filter(t => t.done).length;

  return (
    <div className="dg-card slide-4" style={{ background: t.glass, border: `1px solid ${t.glassBorder}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <p style={{ fontSize: 10, letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase", color: t.textMuted }}>
          ✦ little intentions
        </p>
        <span style={{
          fontSize: 10, padding: "3px 10px", borderRadius: 100,
          background: t.tagBg, color: t.tagText, fontWeight: 500,
        }}>
          {done}/{tasks.length}
        </span>
      </div>
      <p style={{ fontSize: 13, color: t.textMuted, marginBottom: 16 }}>gentle things for today 🍃</p>

      <div style={{ maxHeight: 200, overflowY: "auto", marginBottom: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        {tasks.map(task => (
          <div
            key={task.id}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px", borderRadius: 16,
              background: t.glass, border: `1px solid ${t.glassBorder}`,
              backdropFilter: "blur(10px)",
              opacity: removing === task.id ? 0 : 1,
              transform: removing === task.id ? "translateX(20px) scale(0.95)" : "none",
              transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <button
              onClick={() => toggle(task.id)}
              style={{
                width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                border: task.done ? "none" : `2px solid ${t.textMuted}`,
                background: task.done ? t.accentGrad : "transparent",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
                transform: task.done ? "scale(1.1)" : "scale(1)",
              }}
            >
              {task.done && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
            </button>
            <span style={{
              fontSize: 13, flex: 1, color: t.text,
              textDecoration: task.done ? "line-through" : "none",
              opacity: task.done ? 0.5 : 1,
              transition: "all 0.4s ease",
            }}>
              {task.text}
            </span>
            <button
              onClick={() => remove(task.id)}
              style={{
                fontSize: 14, color: t.textMuted, background: "none",
                border: "none", cursor: "pointer", padding: "0 4px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={e => e.target.style.color = "#f87171"}
              onMouseLeave={e => e.target.style.color = t.textMuted}
            >×</button>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
          placeholder="add something gentle…"
          style={{
            flex: 1, fontSize: 13, padding: "10px 16px", borderRadius: 100,
            background: t.inputBg, border: `1px solid ${t.glassBorder}`,
            color: t.text, backdropFilter: "blur(10px)",
            transition: "background 0.5s ease, border 0.5s ease",
          }}
        />
        <button
          onClick={add}
          className="glow-btn"
          style={{ padding: "10px 18px", borderRadius: 100, fontSize: 18, lineHeight: 1 }}
        >+</button>
      </div>

      {done > 0 && done === tasks.length && (
        <p style={{
          marginTop: 12, textAlign: "center", fontSize: 13, color: t.accent,
          animation: "fadeUp 0.8s ease forwards",
        }}>
          🌟 all done — you showed up for yourself today
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  THEME TOGGLE
// ─────────────────────────────────────────────
function Toggle({ dark, setDark, t }) {
  return (
    <button
      onClick={() => setDark(d => !d)}
      style={{
        display: "flex", alignItems: "center", gap: 7,
        padding: "8px 16px", borderRadius: 100, fontSize: 12, fontWeight: 500,
        background: t.toggleBg, color: t.toggleText,
        border: `1px solid ${t.glassBorder}`,
        backdropFilter: "blur(16px)", cursor: "pointer",
        transition: "all 0.7s ease",
      }}
    >
      <span style={{ transition: "transform 0.7s ease", transform: dark ? "rotate(180deg)" : "rotate(0deg)", fontSize: 14 }}>
        {dark ? "🌙" : "☀️"}
      </span>
      {dark ? "night mode" : "day mode"}
    </button>
  );
}

// ─────────────────────────────────────────────
//  ROOT APP
// ─────────────────────────────────────────────
export default function DailyGlow() {
  const [dark, setDark] = useState(false);
  const t = dark ? DARK : LIGHT;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <>
      <style>{CSS}</style>
      <div
        style={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${dark ? "#13041f, #0d0520, #070318" : "#ffe4e6, #fdf4ff, #e0e7ff"})`,
          transition: "background 1.2s ease",
          position: "relative",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <Blobs t={t} />

        {/* Grain */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10,
          opacity: 0.022,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 20,
          maxWidth: 420, margin: "0 auto",
          padding: "32px 16px 48px",
        }}>
          {/* Header */}
          <div style={{ marginBottom: 28, animation: "slideCard 0.9s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h1 style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: 32, fontWeight: 400,
                  color: t.textStrong, letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}>
                  Daily{" "}
                  <span style={{
                    background: t.accentGrad,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>Glow</span>
                  {" "}✨
                </h1>
                <p style={{ fontSize: 12, color: t.textMuted, marginTop: 4 }}>{today}</p>
              </div>
              <Toggle dark={dark} setDark={setDark} t={t} />
            </div>
            <p style={{
              fontSize: 13, color: t.textMuted, marginTop: 10,
              animation: "fadeUp 1s ease 0.3s both",
            }}>
              a soft space made just for you 🌷
            </p>
          </div>

          {/* Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <QuoteCard t={t} dark={dark} />
            <MoodTracker t={t} />
            <WaterTracker t={t} />
            <TodoList t={t} />
          </div>

          {/* Footer */}
          <p style={{
            textAlign: "center", fontSize: 11, color: t.textMuted,
            marginTop: 40, animation: "fadeUp 1s ease 1s both",
          }}>
            made with love, for you 🌙
          </p>
        </div>
      </div>
    </>
  );
}
