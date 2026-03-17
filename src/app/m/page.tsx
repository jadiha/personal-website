'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

const GALLERY_IMAGES = [
  { src: 'OrientationWeek.jpeg', title: 'Orientation Week Leaders 2025' },
  { src: 'Ambassadors.jpeg',     title: 'Engineering Ambassadors 2024' },
  { src: 'HackTheNorth.jpg',     title: 'Hack The North 2022' },
  { src: 'DSC03005.jpg',         title: 'Acapella 2023' },
  { src: 'OrientationSpirit.jpg',title: 'Black and Gold Day 2022' },
  { src: 'DSC00227.JPG',         title: 'Women in Engineering Kick Off 2024' },
  { src: 'Volleyball.jpg',       title: 'Wealthsimple Beach Volleyball 2025' },
  { src: 'IMG-20240715-WA0005.jpg', title: 'Engineering Day 2024' },
];

export default function MobilePage() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const skyCanvasRef = useRef<HTMLCanvasElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Draw static pixel sky — portrait orientation (180×320)
  useEffect(() => {
    const canvas = skyCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = 180, H = 320;

    // Sky bands — tall portrait layout
    const bands: [number, number, string][] = [
      [0,   90, '#4AAEDE'],
      [90,  70, '#6EC6E8'],
      [160, 60, '#96D9F0'],
      [220, 40, '#C0EAF8'],
    ];
    bands.forEach(([y, h, color]) => {
      ctx.fillStyle = color;
      ctx.fillRect(0, y, W, h);
    });

    // Ground
    ctx.fillStyle = '#3A9A3A'; ctx.fillRect(0, H - 36, W, 36);
    ctx.fillStyle = '#5DBF5D'; ctx.fillRect(0, H - 36, W, 5);
    ctx.fillStyle = '#80D480'; ctx.fillRect(0, H - 38, W, 3);

    const cloud = (x: number, y: number, s: number) => {
      s = Math.round(s);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x + s*2, y,       s*4, s*2);
      ctx.fillRect(x + s,   y + s*2, s*6, s*2);
      ctx.fillRect(x,       y + s*3, s*8, s*3);
      ctx.fillStyle = '#CCE8F5';
      ctx.fillRect(x,       y + s*5, s*8, s);
    };
    // Spread clouds through the taller sky
    cloud(10,  20, 2.5);
    cloud(100, 10, 2);
    cloud(50,  80, 3);
    cloud(120, 60, 2);
    cloud(20, 140, 2.5);
    cloud(100,130, 2);

    // Flowers along grass line
    const flowerColors = ['#FF9CAE', '#FFE566', '#FFFFFF', '#FFD9E4', '#FFCBA8'];
    [8, 22, 38, 55, 72, 90, 108, 125, 142, 158, 170].forEach((fx, i) => {
      const fy = H - 41;
      ctx.fillStyle = '#FFEE88'; ctx.fillRect(fx, fy, 2, 2);
      ctx.fillStyle = flowerColors[i % flowerColors.length];
      ctx.fillRect(fx-2, fy, 2, 2); ctx.fillRect(fx+2, fy, 2, 2);
      ctx.fillRect(fx, fy-2, 2, 2); ctx.fillRect(fx, fy+2, 2, 2);
    });

    // Sun top-right
    ctx.fillStyle = '#FFE566'; ctx.fillRect(W - 26, 8, 16, 16);
    ctx.fillStyle = '#FFD700'; ctx.fillRect(W - 24, 10, 12, 12);
    ctx.fillStyle = '#FFE566';
    ctx.fillRect(W - 20, 4,  4, 3);
    ctx.fillRect(W - 20, 25, 4, 3);
    ctx.fillRect(W - 30, 14, 3, 4);
    ctx.fillRect(W - 11, 14, 3, 4);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    let output: React.ReactNode;

    if (cmd) {
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
    }

    switch (cmd) {
      case 'help':
        output = (
          <div className="command-output">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              {[
                ['about', '👋 About me'],
                ['experience', '💼 Work history'],
                ['skills', '💫 Tech skills'],
                ['projects', '🚀 My projects'],
                ['socials', '📬 Contact links'],
                ['download', '📄 Resume PDF'],
                ['clear', '🧹 Clear'],
                ['help', '❓ Commands'],
              ].map(([c, desc]) => (
                <div key={c} className="flex items-center gap-1.5">
                  <span className="text-pink-500 font-medium min-w-[60px] text-xs">{c}</span>
                  <span className="text-gray-600 text-xs">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="command-output">
            <div className="space-y-2">
              <p className="text-pink-500 font-medium">👋🏽 Hi! I&apos;m Jadiha <span className="text-gray-500 font-normal text-xs">(ja-thee-ha)</span></p>
              <p className="text-gray-600 text-xs">Systems Design Engineering student at UWaterloo who loves building human-centred products with thoughtful UX and real-world impact.</p>
              <p className="text-gray-600 text-xs">I thrive taking end-to-end ownership across fintech, neurotech, and robotics!</p>
              <div className="grid grid-cols-1 gap-2 mt-1">
                <div>
                  <p className="text-pink-500 font-medium text-xs">🎯 Interests</p>
                  <p className="text-gray-600 text-xs ml-3">• Fintech & Neurotech</p>
                  <p className="text-gray-600 text-xs ml-3">• Mental Health Tech</p>
                  <p className="text-gray-600 text-xs ml-3">• Robotics & Community</p>
                </div>
                <div>
                  <p className="text-pink-500 font-medium text-xs">💼 Where I&apos;ve been</p>
                  <p className="text-gray-600 text-xs ml-3">• Wealthsimple (current)</p>
                  <p className="text-gray-600 text-xs ml-3">• Amazon</p>
                  <p className="text-gray-600 text-xs ml-3">• Real Life Robotics</p>
                </div>
              </div>
              <p className="text-pink-500 font-medium text-xs">🌿 Seeking PM & Data roles Summer/Fall 2026!</p>
              <p className="text-gray-500 text-xs">📧 jadiha.arul@gmail.com</p>
            </div>
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="command-output">
            <div className="space-y-3">
              {[
                { icon: '💳', title: 'Wealthsimple', role: 'SWE Intern', date: 'May 2025 - Present', desc: 'Prototyping cashback card features and implemented TFSA account linking, contributing to $60K daily revenue.' },
                { icon: '🤖', title: 'Real Life Robotics', role: 'Full Stack Dev', date: 'Sep–Dec 2024', desc: 'Led software dev for autonomous food delivery robot at the Toronto Zoo.' },
                { icon: '☁️', title: 'MPAC', role: 'Cloud Infra Analyst', date: 'Jan–Apr 2024', desc: 'Managed cloud infra using Python Boto3 and React.js, processing $10K+ in data assets.' },
                { icon: '📊', title: 'Amazon', role: 'SDE Intern', date: 'May–Aug 2023', desc: 'Built internal cron job dashboard. Improved system uptime 65% for 70,000+ employees.' },
                { icon: '🏦', title: 'Home Trust', role: 'QA Automation', date: 'Jan–Apr 2023', desc: 'Automated QA processes reducing testing time by 40%.' },
              ].map((job) => (
                <div key={job.title}>
                  <p className="text-pink-500 font-medium text-xs">{job.icon} {job.title} | {job.role}</p>
                  <p className="text-gray-500 text-xs ml-3">{job.date}</p>
                  <p className="text-gray-600 text-xs ml-3">{job.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="command-output">
            <div className="space-y-2">
              {[
                ['Languages', 'Python, JS, TypeScript, C++, Ruby, Java'],
                ['Technologies', 'React.js, Node.js, Next.js, ROS'],
                ['Cloud & DevOps', 'AWS, Git, Docker'],
                ['Tools', 'Postman, CodeceptJS, REST APIs'],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-pink-500 font-medium text-xs">{label}</p>
                  <p className="text-gray-600 text-xs ml-3">{val}</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="command-output">
            <div className="space-y-2">
              {[
                { icon: '🌿', name: 'Letters To Myself', lang: 'HTML', desc: 'Daily gratitude letters to yourself.' },
                { icon: '🧠', name: 'Mindscape', lang: 'TypeScript', desc: 'Context-aware meditation app.' },
                { icon: '🎓', name: 'Scholarship Finder Bot', lang: 'Python', desc: 'Finds scholarships, delivers to Discord daily.' },
                { icon: '💻', name: 'Personal Website', lang: 'TypeScript', desc: 'The one you\'re on right now :)' },
              ].map((p) => (
                <div key={p.name}>
                  <p className="text-pink-500 font-medium text-xs">{p.icon} {p.name} <span className="text-gray-400 font-normal">{p.lang}</span></p>
                  <p className="text-gray-600 text-xs ml-3">{p.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-gray-500 text-xs">More on <a href="https://github.com/jadiha" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">GitHub</a>!</p>
          </div>
        );
        break;

      case 'socials':
        output = (
          <div className="command-output">
            <p className="text-pink-500 font-medium text-xs mb-2">📬 Find me here</p>
            <div className="space-y-2">
              <div><p className="text-gray-600 text-xs">Email</p><a href="mailto:jadiha.arul@gmail.com" className="text-pink-400 text-xs hover:underline">jadiha.arul@gmail.com</a></div>
              <div><p className="text-gray-600 text-xs">LinkedIn</p><a href="https://www.linkedin.com/in/jadiha-aruleswaran/" target="_blank" rel="noopener noreferrer" className="text-pink-400 text-xs hover:underline">jadiha-aruleswaran</a></div>
              <div><p className="text-gray-600 text-xs">GitHub</p><a href="https://github.com/jadiha" target="_blank" rel="noopener noreferrer" className="text-pink-400 text-xs hover:underline">@jadiha</a></div>
            </div>
          </div>
        );
        break;

      case 'download':
        output = (
          <div className="command-output">
            <p className="text-gray-600 text-xs mb-2">Download my resume:</p>
            <a href="/resume.pdf" download="Jadiha_Aruleswaran_Resume.pdf" className="inline-block bg-pink-500 text-white px-3 py-2 rounded-lg text-xs">
              📄 Download Resume
            </a>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        output = <div className="text-gray-500 command-output text-xs">Cleared. Type &apos;help&apos; to start.</div>;
        break;

      default:
        output = (
          <div className="text-pink-400 command-output text-xs">
            Command not found. Type &apos;help&apos;! 🌸
          </div>
        );
    }

    setHistory(prev => [...prev, { command, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const i = historyIndex + 1;
        setHistoryIndex(i);
        setInput(commandHistory[commandHistory.length - 1 - i]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const i = historyIndex - 1;
        setHistoryIndex(i);
        setInput(commandHistory[commandHistory.length - 1 - i]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Auto-run help
  useEffect(() => { handleCommand('help'); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Touch swipe for gallery
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setGalleryIndex(i => Math.min(GALLERY_IMAGES.length - 1, i + 1));
      else          setGalleryIndex(i => Math.max(0, i - 1));
    }
  };

  const dot = (active: boolean) => ({
    width: active ? 20 : 8,
    height: 8,
    borderRadius: 4,
    background: active ? 'var(--primary)' : 'rgba(255,179,198,0.4)',
    border: 'none',
    cursor: 'pointer' as const,
    transition: 'all 0.3s ease',
    padding: 0,
  });

  const navBtn = (disabled: boolean) => ({
    background: 'rgba(255,246,243,0.85)',
    border: '2px solid var(--border)',
    borderRadius: 8,
    padding: '0.4rem 1rem',
    cursor: disabled ? 'default' : 'pointer' as const,
    opacity: disabled ? 0.4 : 1,
    fontFamily: 'ui-monospace, monospace',
    fontSize: '0.9rem',
    color: 'var(--text)',
    backdropFilter: 'blur(6px)',
  });

  return (
    <main style={{ position: 'relative' }}>
      {/* Fixed pixel sky */}
      <canvas
        ref={skyCanvasRef}
        width={180}
        height={320}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100vw', height: '100vh',
          zIndex: 1, imageRendering: 'pixelated',
        }}
      />

      {/* ── Section 1: Welcome ───────────────────────────────────── */}
      <section style={{
        minHeight: '100svh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 10,
        textAlign: 'center', padding: '2rem 1.5rem',
        background: 'linear-gradient(160deg, rgba(255,246,243,0.55) 0%, rgba(255,246,243,0.3) 50%, rgba(255,203,168,0.1) 100%)',
      }}>
        {/* Avatar */}
        <div style={{ width: 110, height: 110, margin: '0 auto 1.5rem', position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFD9E4, #FFE4CC)',
          }} />
          <Image
            src="/avatars/avatar.png" alt="Jadiha"
            width={110} height={110}
            style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 1 }}
          />
          <span style={{
            position: 'absolute', top: 0, right: 0,
            fontSize: '1.8rem',
            animation: 'wave 2s ease-in-out infinite',
            transformOrigin: 'bottom left',
            display: 'inline-block',
          }}>👋</span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'var(--font-press-start)',
          fontSize: '0.95rem',
          lineHeight: 2.2,
          color: '#FFFFFF',
          textShadow: '0 0 10px rgba(255,179,198,0.9), 0 0 25px rgba(255,156,174,0.7), 0 0 60px rgba(255,100,150,0.5)',
          marginBottom: '1rem',
        }}>
          Jadiha<br />Aruleswaran
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'ui-monospace, SF Mono, monospace',
          fontSize: '0.7rem',
          color: '#FFFFFF',
          textShadow: '0 0 8px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.6)',
          marginBottom: '2.5rem',
          letterSpacing: '0.05em',
        }}>
          scroll to begin the journey
        </p>

        <div style={{
          fontSize: '1.5rem', color: '#FFB3C6',
          animation: 'bounce 2s ease-in-out infinite',
        }}>↓</div>
      </section>

      {/* ── Section 2: Gallery ───────────────────────────────────── */}
      <section style={{
        minHeight: '100svh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 10,
        padding: '2rem 0',
        background: 'linear-gradient(160deg, rgba(255,203,168,0.2) 0%, rgba(255,246,243,0.9) 50%, rgba(255,179,198,0.2) 100%)',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-press-start)',
          fontSize: '0.55rem',
          color: '#FFFFFF',
          textShadow: '0 0 10px rgba(255,179,198,0.9)',
          marginBottom: '1.5rem',
          letterSpacing: '0.1em',
        }}>
          memories ✿
        </h2>

        {/* Carousel */}
        <div
          style={{ width: '100%', overflow: 'hidden', position: 'relative' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div style={{
            display: 'flex',
            transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: `translateX(-${galleryIndex * 100}%)`,
          }}>
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} style={{ flex: '0 0 100%', padding: '0 1.25rem' }}>
                <div style={{
                  borderRadius: 12, overflow: 'hidden',
                  border: '2px solid var(--border)',
                  boxShadow: '0 8px 24px var(--shadow)',
                  background: 'rgba(255,246,243,0.85)',
                  backdropFilter: 'blur(8px)',
                }}>
                  <Image
                    src={`/gallery/${img.src}`}
                    alt={img.title}
                    width={400} height={260}
                    style={{ width: '100%', height: 230, objectFit: 'cover', display: 'block' }}
                  />
                  <p style={{
                    fontFamily: 'var(--font-press-start)',
                    fontSize: '0.42rem',
                    color: 'var(--text-muted)',
                    padding: '0.75rem 1rem',
                    textAlign: 'center',
                    letterSpacing: '0.05em',
                    lineHeight: 1.8,
                  }}>
                    {img.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '1.25rem' }}>
          {GALLERY_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setGalleryIndex(i)} style={dot(i === galleryIndex)} />
          ))}
        </div>

        {/* Prev / count / Next */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
          <button onClick={() => setGalleryIndex(i => Math.max(0, i-1))} disabled={galleryIndex === 0} style={navBtn(galleryIndex === 0)}>←</button>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {galleryIndex + 1} / {GALLERY_IMAGES.length}
          </span>
          <button onClick={() => setGalleryIndex(i => Math.min(GALLERY_IMAGES.length-1, i+1))} disabled={galleryIndex === GALLERY_IMAGES.length-1} style={navBtn(galleryIndex === GALLERY_IMAGES.length-1)}>→</button>
        </div>
      </section>

      {/* ── Section 3: Terminal ──────────────────────────────────── */}
      <section style={{
        minHeight: '100svh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 10,
        padding: '0.75rem',
      }}>
        <div className="terminal-window" style={{ width: '100%', maxWidth: '100%', height: '90svh', padding: '1rem', paddingTop: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <p style={{ color: 'var(--text)', fontSize: '0.75rem' }}>
              Type <span style={{ color: 'var(--rose)', fontWeight: 600 }}>help</span> to get started
            </p>
          </div>

          <div className="content-container" ref={terminalContentRef} style={{ flex: 1 }}>
            <div className="terminal-content">
              {history.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="terminal-prompt" style={{ fontSize: '0.78rem' }}>
                    <span>visitor</span>
                    <span style={{ color: 'var(--text-faint)' }}>@</span>
                    <span>jadiha</span>
                    <span style={{ color: 'var(--text-faint)' }}>:</span>
                    <span style={{ color: 'var(--rose)' }}>~$</span>
                    <span className="ml-2" style={{ color: 'var(--text)' }}>{item.command}</span>
                  </div>
                  <div className="mt-1">{item.output}</div>
                </div>
              ))}
            </div>

            <div className="terminal-input">
              <div className="terminal-prompt" style={{ fontSize: '0.78rem' }}>
                <span>visitor</span>
                <span style={{ color: 'var(--text-faint)' }}>@</span>
                <span>jadiha</span>
                <span style={{ color: 'var(--text-faint)' }}>:</span>
                <span style={{ color: 'var(--rose)' }}>~$</span>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="ml-2 bg-transparent outline-none flex-1"
                  style={{ fontSize: '0.78rem' }}
                  placeholder="tap to type a command..."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25%       { transform: rotate(20deg); }
          75%       { transform: rotate(-5deg); }
        }
      `}</style>
    </main>
  );
}
