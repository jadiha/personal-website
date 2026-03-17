'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

const COMMANDS = [
  'help',
  'about',
  'experience',
  'skills',
  'projects',
  'education',
  'contact',
  'clear',
  'download',
  'socials',
  'gallery'
];

const ASCII_ART = `
     ██╗ █████╗ ██████╗ ██╗██╗  ██╗ █████╗
     ██║██╔══██╗██╔══██╗██║██║  ██║██╔══██╗
     ██║███████║██║  ██║██║███████║███████║
██   ██║██╔══██║██║  ██║██║██╔══██║██╔══██║
╚█████╔╝██║  ██║██████╔╝██║██║  ██║██║  ██║
 ╚════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`;

const GALLERY_IMAGES = [
  { src: 'OrientationWeek.jpeg', title: 'Orientation Week Leaders 2025' },
  { src: 'Ambassadors.jpeg', title: 'Engineering Ambassadors 2024' },
  { src: 'HackTheNorth.jpg', title: 'Hack The North 2022' },
  { src: 'DSC03005.jpg', title: 'Acapella 2023' },
  { src: 'OrientationSpirit.jpg', title: 'Black and Gold Day 2022' },
  { src: 'DSC00227.JPG', title: 'Women in Engineering Kick Off 2024' },
  { src: 'Volleyball.jpg', title: 'Wealthsimple Beach Volleyball 2025' },
  { src: 'IMG-20240715-WA0005.jpg', title: 'Engineering Day 2024' }
];


export default function Home() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const skyCanvasRef = useRef<HTMLCanvasElement>(null);
  const targetProgressRef = useRef(0);
  const rafRef = useRef<number>(0);

  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  const ramp = (v: number, start: number, end: number) => clamp((v - start) / (end - start), 0, 1);

  // Scroll-driven visibility
  const welcomeOpacity = 1 - ramp(scrollProgress, 0, 22);
  const galleryDone = scrollProgress > 65;

  // keep scrolling: fades in 63→68, fades out 72→76
  const keepScrollingOpacity = ramp(scrollProgress, 63, 68) * (1 - ramp(scrollProgress, 72, 76));

  // Terminal: zooms in 72→98
  const terminalProgress = ramp(scrollProgress, 72, 98);
  const terminalScale = 0.15 + terminalProgress * 0.85;
  const terminalOpacity = ramp(scrollProgress, 72, 80);
  const terminalVisible = scrollProgress > 72;


  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      targetProgressRef.current = (scrolled / (windowHeight * 2)) * 100;
    };

    let current = 0;
    const animate = () => {
      const diff = targetProgressRef.current - current;
      current += diff * 0.18;
      if (Math.abs(diff) > 0.02) {
        setScrollProgress(current);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Pixel sky canvas
  useEffect(() => {
    const canvas = skyCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 320;

    // Sky bands top → horizon
    const bands: [number, number, string][] = [
      [0,   50, '#4AAEDE'],
      [50,  40, '#6EC6E8'],
      [90,  35, '#96D9F0'],
      [125, 19, '#C0EAF8'],
    ];
    bands.forEach(([y, h, color]) => {
      ctx.fillStyle = color;
      ctx.fillRect(0, y, W, h);
    });

    // Ground
    ctx.fillStyle = '#3A9A3A';
    ctx.fillRect(0, 144, W, 36);
    ctx.fillStyle = '#5DBF5D';
    ctx.fillRect(0, 144, W, 5);
    ctx.fillStyle = '#80D480';
    ctx.fillRect(0, 142, W, 3);

    // Cloud helper — chunky pixel blobs
    const cloud = (x: number, y: number, s: number) => {
      s = Math.round(s);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x + s*2, y,       s*4, s*2);
      ctx.fillRect(x + s,   y + s*2, s*6, s*2);
      ctx.fillRect(x,       y + s*3, s*8, s*3);
      ctx.fillStyle = '#CCE8F5';
      ctx.fillRect(x,       y + s*5, s*8, s);
    };

    // Wrap helper (handles negative offsets cleanly)
    const wrap = (base: number, speed: number, margin: number) => {
      const total = W + margin * 2;
      const moved = base - (scrollProgress / 100) * 200 * speed;
      return ((moved % total) + total) % total - margin;
    };

    // Far clouds (small, slow)
    cloud(wrap(60,  0.15, 55), 18, 2.5);
    cloud(wrap(210, 0.15, 55), 8,  2);
    // Mid clouds
    cloud(wrap(130, 0.35, 65), 5,  3);
    cloud(wrap(280, 0.35, 65), 22, 2.5);
    // Near clouds (large, fast)
    cloud(wrap(40,  0.7,  80), 10, 4);
    cloud(wrap(240, 0.7,  80), 3,  3.5);

    // Pixel flowers in the grass
    const flowerColors = ['#FF9CAE', '#FFE566', '#FFFFFF', '#FFD9E4', '#FFCBA8'];
    [12, 38, 60, 85, 110, 135, 158, 185, 210, 238, 262, 288, 308].forEach((fx, i) => {
      const fy = 139;
      ctx.fillStyle = '#FFEE88';
      ctx.fillRect(fx, fy, 2, 2);
      ctx.fillStyle = flowerColors[i % flowerColors.length];
      ctx.fillRect(fx - 2, fy,     2, 2);
      ctx.fillRect(fx + 2, fy,     2, 2);
      ctx.fillRect(fx,     fy - 2, 2, 2);
      ctx.fillRect(fx,     fy + 2, 2, 2);
    });

    // Sun (top-right)
    ctx.fillStyle = '#FFE566';
    ctx.fillRect(W - 34, 5, 20, 20);
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(W - 32, 7, 16, 16);
    ctx.fillStyle = '#FFE566';
    // Rays
    ctx.fillRect(W - 27, 1,  6, 3);
    ctx.fillRect(W - 27, 26, 6, 3);
    ctx.fillRect(W - 38, 13, 3, 6);
    ctx.fillRect(W - 15, 13, 3, 6);
  }, [scrollProgress]);

  // Add auto-scroll effect when history changes
  useEffect(() => {
    const contentContainer = contentContainerRef.current;
    if (contentContainer) {
      const terminalContent = contentContainer.querySelector('.terminal-content');
      if (terminalContent) {
        terminalContent.scrollTop = terminalContent.scrollHeight;
      }
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
              {[
                ['about', '👋 Learn about me'],
                ['experience', '💼 View my work experience'],
                ['skills', '💫 List my technical skills'],
                ['projects', '🚀 View my projects'],
                ['socials', '📬 Contact & social links'],
                ['download', '📄 Download my resume'],
                ['clear', '🧹 Clear the terminal'],
                ['help', '❓ Show commands']
              ].map(([cmd, desc]) => (
                <div key={cmd} className="flex items-center gap-1.5">
                  <span className="text-pink-500 font-medium min-w-[70px] text-xs">{cmd}</span>
                  <span className="text-gray-600 text-xs">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="command-output">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-pink-500 font-medium mb-1">Languages</p>
                <p className="text-gray-600">Python, Javascript,TypeScript, C++, Ruby, Java</p>
              </div>
              <div>
                <p className="text-pink-500 font-medium mb-1">Technologies</p>
                <p className="text-gray-600">React.js, Node.js, Next.js, ROS</p>
              </div>
              <div>
                <p className="text-pink-500 font-medium mb-1">Cloud & DevOps</p>
                <p className="text-gray-600">AWS, Git, Docker</p>
              </div>
              <div>
                <p className="text-pink-500 font-medium mb-1">Tools</p>
                <p className="text-gray-600">Postman, CodeceptJS, REST APIs</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="command-output">
            <div className="space-y-3">
              <p className="text-pink-500 font-medium text-base">👋🏽 Hi there! I&apos;m Jadiha <span className="text-gray-500 font-normal text-sm">(ja-thee-ha)</span></p>
              <p className="text-gray-600">
                I&apos;m a Systems Design Engineering student at the University of Waterloo who loves building human-centred products grounded in thoughtful UX, strong engineering principles, and real-world impact.
              </p>
              <p className="text-gray-600">
                I thrive in roles where I can take end-to-end ownership, collaborate across disciplines, use product intuition, and ship solutions that genuinely improve people&apos;s lives — whether it&apos;s in fintech, neurotech, or robotics!
              </p>
              <p className="text-gray-600">
                I think the best tech makes the world a little more human. I&apos;m drawn to building things that actually help people, especially around mental health and community.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div>
                  <p className="text-pink-500 font-medium">🎯 Interests</p>
                  <p className="text-gray-600 ml-4">• Fintech & Neurotech</p>
                  <p className="text-gray-600 ml-4">• Mental Health Tech</p>
                  <p className="text-gray-600 ml-4">• Robotics & Community</p>
                </div>
                <div>
                  <p className="text-pink-500 font-medium">💼 Where I&apos;ve been</p>
                  <p className="text-gray-600 ml-4">• Wealthsimple (current)</p>
                  <p className="text-gray-600 ml-4">• Amazon</p>
                  <p className="text-gray-600 ml-4">• Real Life Robotics</p>
                </div>
              </div>
              <p className="text-pink-500 font-medium">🌿 Actively seeking Technical Product & Data Science roles for Summer & Fall 2026!</p>
              <p className="text-gray-600 text-sm">📧 jadiha.arul@gmail.com</p>
            </div>
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="command-output">
            <div className="space-y-4">
              <div>
                <p className="text-pink-500 font-medium">💳 Wealthsimple | Software Engineer Intern</p>
                <p className="text-gray-500 text-sm ml-4">May 2025 - Present · Toronto</p>
                <p className="text-gray-600 ml-4">Prototyping new features for the 2% cashback card and shaping what the next generation of Wealthsimple cards could look like. Also implemented TFSA account linking for margin trading, contributing to $60K daily revenue.</p>
              </div>

              <div>
                <p className="text-pink-500 font-medium">🤖 Real Life Robotics | Full Stack Developer</p>
                <p className="text-gray-500 text-sm ml-4">Sep 2024 - Dec 2024 · Toronto</p>
                <p className="text-gray-600 ml-4">Led software development and ran live pilots for an autonomous food delivery robot at the Toronto Zoo — putting real robots in front of real people and making it work.</p>
              </div>

              <div>
                <p className="text-pink-500 font-medium">☁️ MPAC | Cloud Infrastructure Analyst</p>
                <p className="text-gray-500 text-sm ml-4">Jan 2024 - Apr 2024 · Pickering</p>
                <p className="text-gray-600 ml-4">• Managed cloud infrastructure operations using Python Boto3 and React.js, processing $10K+ in data assets</p>
              </div>

              <div>
                <p className="text-pink-500 font-medium">📊 Amazon | Software Development Engineer Intern</p>
                <p className="text-gray-500 text-sm ml-4">May 2023 - Aug 2023 · Vancouver</p>
                <p className="text-gray-600 ml-4">Built an internal tool that gave an entire team visibility into their cron jobs in one place — turning something messy and scattered into something clear and manageable. Improved system uptime by 65% for 70,000+ employees.</p>
              </div>

              <div>
                <p className="text-pink-500 font-medium">🏦 Home Trust Company | QA Automation Analyst</p>
                <p className="text-gray-500 text-sm ml-4">Jan 2023 - Apr 2023 · Toronto</p>
                <p className="text-gray-600 ml-4">• Automated digital banking QA processes using CodeceptJS and Postman API, reducing testing time by 40%</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'socials':
        output = (
          <div className="command-output">
            <p className="text-pink-500 font-medium mb-3">📬 Contact & Social Links</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 font-medium">Email</p>
                <a href="mailto:jadiha.arul@gmail.com" className="text-pink-400 hover:underline">jadiha.arul@gmail.com</a>
              </div>
              <div>
                <p className="text-gray-600 font-medium">LinkedIn</p>
                <a href="https://www.linkedin.com/in/jadiha-aruleswaran/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-pink-400 hover:underline">
                  View Profile
                </a>
              </div>
              <div>
                <p className="text-gray-600 font-medium">GitHub</p>
                <a href="https://github.com/jadiha"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-pink-400 hover:underline">
                  @jadiha
                </a>
              </div>
            </div>
          </div>
        );
        break;

      case 'download':
        output = (
          <div className="mb-2 command-output">
            <p className="text-gray-600 mb-3">Click the link below to download my resume:</p>
            <a
              href="/resume.pdf"
              download="Jadiha_Aruleswaran_Resume.pdf"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              📄 Download Resume (PDF)
            </a>
            <p className="text-gray-500 text-sm mt-2">If the download doesn&apos;t start automatically, right-click the link and select &quot;Save as&quot;</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="mb-2 command-output">
            <div className="space-y-3">
              <div>
                <p className="text-pink-500 font-medium">🌿 Letters To Myself <span className="text-gray-400 font-normal text-xs">HTML</span></p>
                <p className="text-gray-600 ml-4">A quiet little web app for writing daily gratitude letters to yourself.</p>
              </div>
              <div>
                <p className="text-pink-500 font-medium">🧠 Mindscape <span className="text-gray-400 font-normal text-xs">TypeScript</span></p>
                <p className="text-gray-600 ml-4">Context-aware meditation app that recommends sessions based on how you feel, time of day, your calendar, and meditations you enjoy.</p>
              </div>
              <div>
                <p className="text-pink-500 font-medium">🎓 Scholarship Finder Bot <span className="text-gray-400 font-normal text-xs">Python</span></p>
                <p className="text-gray-600 ml-4">A free, self-hosted tool that finds scholarships for you and delivers them to Discord daily.</p>
              </div>
              <div>
                <p className="text-pink-500 font-medium">💻 Personal Website <span className="text-gray-400 font-normal text-xs">TypeScript</span></p>
                <p className="text-gray-600 ml-4">A sneak peek into Jadiha&apos;s world — the one you&apos;re in right now :)</p>
              </div>
            </div>
            <hr style={{ borderColor: 'var(--border)', marginTop: '1.5rem', marginBottom: '1rem' }} />
            <p className="text-gray-500">More on my <a href="https://github.com/jadiha" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">GitHub</a>!</p>
          </div>
        );
        break;

      case 'gallery':
        output = (
          <div className="mb-2 command-output">
            <p className="mb-2 sparkle">✨ Opening Photo Gallery ✨</p>
            <p className="ml-4">
              <a
                href="/gallery"
                className="text-pink-500 hover:underline"
                target="_self"
              >
                Click here to view the gallery
              </a>
            </p>
          </div>
        );
        break;

      case 'clear':
        setHistory(prev => prev.slice(0, 1));
        return;

      default:
        output = (
          <div className="text-pink-400 command-output bounce-hover">
            Command not found. Type &apos;help&apos; for available commands!
            <span className="ml-2 rainbow-text">🌸</span>
          </div>
        );
    }

    setHistory(prev => [...prev, { command, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matchingCommands = COMMANDS.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
      }
    } else if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    handleCommand('help');
  }, []);


  return (
    <main className="relative">
      {/* Pixel sky background */}
      <canvas
        ref={skyCanvasRef}
        width={320}
        height={180}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          imageRendering: 'pixelated',
        }}
      />

      {/* Welcome Section */}
      <section
        className="welcome-section min-h-screen flex items-center justify-center fixed top-0 left-0 w-full z-[40]"
        style={{
          opacity: welcomeOpacity,
          visibility: scrollProgress > 20 ? 'hidden' : 'visible'
        }}
      >
        <div className="text-center p-8 relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1.5
            }}
            className="mb-8 relative"
          >
            <div className="w-40 h-40 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full animate-pulse"></div>
              <Image
                src="/avatars/avatar.png"
                alt="Cute waving avatar"
                width={160}
                height={160}
                className="relative z-10 w-full h-full object-contain drop-shadow-lg"
              />
              <motion.div
                animate={{
                  rotate: [0, 20, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="absolute top-0 right-0 origin-bottom-left"
              >
                <span className="text-4xl">👋🏽</span>
              </motion.div>
            </div>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl sm:text-4xl md:text-5xl mb-6"
            style={{
              fontFamily: 'var(--font-press-start)',
              lineHeight: 1.8,
              color: '#FFFFFF',
              textShadow: '0 0 10px rgba(255,179,198,0.9), 0 0 25px rgba(255,156,174,0.7), 0 0 60px rgba(255,100,150,0.5)',
            }}
          >
            Jadiha Aruleswaran
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-sm sm:text-base mb-12"
            style={{
              fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
              letterSpacing: '0.05em',
              color: '#FFFFFF',
              textShadow: '0 0 8px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,200,220,0.4)',
            }}
          >
            scroll down to begin the journey
          </motion.p>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
            className="text-3xl text-pink-400"
          >
            ↓
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        className="gallery-section"
        style={{
          opacity: ramp(scrollProgress, 15, 30) * (1 - ramp(scrollProgress, 58, 66)),
          visibility: galleryDone ? 'hidden' : 'visible'
        }}
      >
        <div className="gallery-container">
          <div
            className="gallery-track"
            style={{
              transform: `translateX(${Math.min(
                Math.max(
                  -((scrollProgress - 20) / 48) * ((GALLERY_IMAGES.length + 4) * 520),
                  -((GALLERY_IMAGES.length + 4) * 520)
                ),
                0
              )}px)`
            }}
          >
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={index}
                className="gallery-item group"
              >
                <Image
                  src={`/gallery/${image.src}`}
                  alt={image.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span style={{
                    fontSize: '0.6rem',
                    fontFamily: 'var(--font-press-start)',
                    color: '#fff',
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                    letterSpacing: '0.03em',
                  }}>{image.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keep scrolling hint */}
      <div
        style={{
          position: 'fixed',
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 60,
          opacity: keepScrollingOpacity,
          pointerEvents: 'none',
          textAlign: 'center',
          color: '#FFFFFF',
          fontFamily: 'var(--font-press-start)',
          fontSize: '0.8rem',
          whiteSpace: 'nowrap',
          textShadow: '0 0 10px rgba(255,255,255,0.9), 0 0 25px rgba(255,255,255,0.6), 0 0 50px rgba(255,200,220,0.4)',
          animation: 'pixel-pulse 1.5s ease-in-out infinite',
        }}
      >
        keep scrolling &gt;&gt;
      </div>

      {/* Terminal Section */}
      <section
        className="terminal-section min-h-screen z-[50] flex items-center justify-center"
        style={{
          opacity: terminalOpacity,
          transform: `scale(${terminalScale})`,
          transformOrigin: 'center center',
          pointerEvents: terminalVisible ? 'auto' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="terminal-window">
            <div className="text-center">
              <pre className="ascii-art">
                {ASCII_ART}
              </pre>
              <p className="text-gray-700 text-sm mb-2">
                Type <span className="text-pink-500 font-semibold">help</span> to get started
              </p>
            </div>

            <div className="content-container" ref={contentContainerRef}>
              <div className="terminal-content">
                {history.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="terminal-prompt text-sm">
                      <span>visitor</span>
                      <span className="text-gray-400">@</span>
                      <span>jadiha</span>
                      <span className="text-gray-400">:</span>
                      <span className="text-pink-500">~$</span>
                      <span className="ml-2 text-gray-700">{item.command}</span>
                    </div>
                    <div className="mt-1">
                      {item.output}
                    </div>
                  </div>
                ))}
              </div>

              <div className="terminal-input">
                <div className="terminal-prompt text-sm">
                  <span>visitor</span>
                  <span className="text-gray-400">@</span>
                  <span>jadiha</span>
                  <span className="text-gray-400">:</span>
                  <span className="text-pink-500">~$</span>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="ml-2 bg-transparent outline-none flex-1 text-sm"
                    autoFocus
                    placeholder="Type a command..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to control scroll range */}
      <div style={{ height: `${Math.max(500, GALLERY_IMAGES.length * 70)}vh` }} />
    </main>
  );
}
