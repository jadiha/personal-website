        'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

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

const CUTE_EMOJIS = ['🌸', '✨', '🎀', '💖', '🌟', '🍰', '🌺', '💝', '🦄', '🌈'];

function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="floating-hearts">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            animation: `float-heart 6s ease-in-out ${heart.delay}s infinite`
          }}
        >
          {CUTE_EMOJIS[Math.floor(Math.random() * CUTE_EMOJIS.length)]}
        </div>
      ))}
    </div>
  );
}

const ASCII_ART = `
     ██╗ █████╗ ██████╗ ██╗██╗  ██╗ █████╗     █████╗ ██████╗ ██╗   ██╗██╗     
     ██║██╔══██╗██╔══██╗██║██║  ██║██╔══██╗    ██╔══██╗██╔══██╗██║   ██║██║     
     ██║███████║██║  ██║██║███████║███████║    ███████║██████╔╝██║   ██║██║     
██   ██║██╔══██║██║  ██║██║██╔══██║██╔══██║    ██╔══██║██╔══██╗██║   ██║██║     
╚█████╔╝██║  ██║██████╔╝██║██║  ██║██║  ██║    ██║  ██║██║  ██║╚██████╔╝███████╗
 ╚════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
`;

const GALLERY_IMAGES = [
  { src: 'amazon2.jpeg', title: 'Amazon Internship' },
  { src: 'Ambassadors.jpeg', title: 'Tech Leadership' },
  { src: 'DSC00227.JPG', title: 'Problem Solving' },
  { src: 'DSC03005.jpg', title: 'Team Collaboration' },
  { src: 'DSC05871.JPG', title: 'Innovation' },
  { src: 'HackTheNorth.jpg', title: 'Hackathon Winner' },
  { src: 'IMG_6300.jpg', title: 'Tech Conference' },
  { src: 'IMG-20240715-WA0005.jpg', title: 'Project Demo' }
];

const NAVIGATION_ITEMS = [
  { label: 'About', href: '#about', icon: '👋' },
  { label: 'Experience', href: '#experience', icon: '💼' },
  { label: 'Projects', href: '#projects', icon: '🚀' },
  { label: 'Skills', href: '#skills', icon: '💫' },
  { label: 'Contact', href: '#contact', icon: '📬' }
];

const SKILLS_DATA = {
  languages: [
    { name: 'TypeScript', level: 90, icon: '📘' },
    { name: 'Python', level: 85, icon: '🐍' },
    { name: 'Ruby', level: 80, icon: '💎' },
    { name: 'Java', level: 75, icon: '☕' }
  ],
  frameworks: [
    { name: 'React.js', level: 90, icon: '⚛️' },
    { name: 'Next.js', level: 85, icon: '▲' },
    { name: 'Node.js', level: 85, icon: '🟢' },
    { name: 'ROS', level: 75, icon: '🤖' }
  ],
  cloud: [
    { name: 'AWS', level: 80, icon: '☁️' },
    { name: 'Docker', level: 75, icon: '🐳' },
    { name: 'Git', level: 90, icon: '📚' }
  ]
};

const PROJECTS_DATA = [
  {
    title: 'Last-Mile Delivery Robot',
    description: 'Autonomous delivery robot system using ROS and computer vision',
    image: '/projects/robot.jpg',
    tech: ['ROS', 'Python', 'Computer Vision', 'Navigation'],
    link: 'https://github.com/yourusername/robot-project'
  },
  {
    title: 'Interactive Portfolio',
    description: 'Modern portfolio website with terminal interface and animations',
    image: '/projects/portfolio.jpg',
    tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    link: 'https://github.com/yourusername/portfolio'
  },
  // Add more projects...
];

function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPercentage = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
      setScrollProgress(scrollPercentage);
      
      // Calculate horizontal scroll based on vertical scroll
      const track = container.querySelector('.gallery-track') as HTMLElement;
      if (track) {
        const translateX = -(scrollPercentage / 100) * (track.offsetWidth - container.clientWidth);
        track.style.transform = `translate3d(${translateX}px, -50%, 0)`;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="gallery-container" ref={containerRef}>
      <div className="gallery-track">
        {GALLERY_IMAGES.map((imageName, index) => (
          <div key={index} className="gallery-item">
            <img
              src={`/gallery/${imageName.src}`}
              alt={imageName.title}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="scroll-progress">
        <div 
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('terminal');
  const [showSection, setShowSection] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const contentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = (scrolled / (windowHeight * 2)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add auto-scroll effect when history changes
  useEffect(() => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTop = contentContainerRef.current.scrollHeight;
    }
  }, [history]);

  // Simplified visibility calculations
  const welcomeOpacity = Math.max(0, 1 - scrollProgress / 30);
  const galleryProgress = Math.max(0, Math.min(1, (scrollProgress - 20) / 50));
  const terminalVisible = scrollProgress > 60;
  const galleryTranslate = -(galleryProgress * 100);

  const typeWriter = (text: string, callback: (text: string) => void) => {
    let i = 0;
    setIsTyping(true);
    const speed = 30;

    const type = () => {
      if (i < text.length) {
        callback(text.slice(0, i + 1));
        i++;
        setTimeout(type, speed);
      } else {
        setIsTyping(false);
      }
    };

    type();
  };

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
            <h2 className="section-heading">Available Commands</h2>
            <ul className="command-list">
              {[
                ['about', 'Learn about me'],
                ['experience', 'View my work experience'],
                ['skills', 'List my technical skills'],
                ['projects', 'View my projects'],
                ['education', 'View my education'],
                ['contact', 'Get my contact information'],
                ['socials', 'View my social media links'],
                ['download', 'Download my resume'],
                ['clear', 'Clear the terminal'],
                ['help', 'Show this help message']
              ].map(([cmd, desc]) => (
                <li key={cmd}>
                  <span className="command-name">{cmd}</span>
                  <span className="command-description">{desc}</span>
          </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Tip: Use ↑↓ keys to navigate through command history and Tab for command completion
            </p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="mb-2 command-output">
            <p className="mb-2 sparkle">✨ Technical Skills ✨</p>
            <div className="ml-4">
              <p className="cute-bullet">Languages:</p>
              <p className="ml-4">JavaScript/TypeScript, Python, Ruby, Java</p>
              
              <p className="mt-2 cute-bullet">Technologies:</p>
              <p className="ml-4">React.js, Node.js, Next.js, ROS (Robot Operating System)</p>
              
              <p className="mt-2 cute-bullet">Cloud & DevOps:</p>
              <p className="ml-4">AWS (Boto3), Git, Docker</p>
              
              <p className="mt-2 cute-bullet">Tools:</p>
              <p className="ml-4">Postman, CodeceptJS, REST APIs</p>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="mb-2 command-output">
            <p className="mb-2 sparkle">✨ Featured Projects ✨</p>
            <div className="ml-4 space-y-3">
              <div>
                <p className="cute-bullet">Cute Terminal Website</p>
                <p className="ml-4">Interactive terminal-style portfolio with a kawaii twist! 🎀</p>
              </div>
              <div>
                <p className="cute-bullet">Last-Mile Delivery Robot</p>
                <p className="ml-4">Autonomous delivery robot system (but make it cute!) 🤖💕</p>
              </div>
              <div>
                <p className="cute-bullet">More coming soon!</p>
                <p className="ml-4">Stay tuned for more magical projects! ✨</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'education':
        output = (
          <div className="mb-2 command-output">
            <p className="mb-2 sparkle">✨ Education ✨</p>
            <div className="ml-4">
              <p className="cute-bullet">University of Toronto</p>
              <p className="ml-4">📚 Computer Science</p>
              <p className="ml-4">🎀 Notable Coursework:</p>
              <ul className="ml-8">
                <li>💫 Data Structures & Algorithms</li>
                <li>💫 Software Engineering</li>
                <li>💫 Computer Systems</li>
              </ul>
            </div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="mb-2 command-output">
            <p className="mb-2 sparkle">✨ Contact Information ✨</p>
            <div className="ml-4">
              <p className="cute-bullet">📧 Email: jadiha.arul@gmail.com</p>
              <p className="cute-bullet">📍 Location: Toronto, Ontario, Canada</p>
            </div>
          </div>
        );
        break;

      case 'socials':
        output = (
          <div className="mb-2 command-output">
            <p className="mb-2 sparkle">✨ Social Media Links ✨</p>
            <div className="ml-4">
              <p className="cute-bullet">
                <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" 
                   className="text-pink-400 hover:underline">LinkedIn</a>
              </p>
              <p className="cute-bullet">
                <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer"
                   className="text-pink-400 hover:underline">GitHub</a>
              </p>
            </div>
          </div>
        );
        break;

      case 'download':
        output = (
          <div className="mb-2 command-output">
            <p>📄 Downloading resume...</p>
            <p className="text-purple-400">
              <a href="/resume.pdf" download className="hover:underline">
                Click here if the download doesn't start automatically
              </a>
            </p>
          </div>
        );
        // Add actual download logic here
        break;

      case 'about':
        output = (
          <div className="mb-2 command-output">
            <p className="sparkle">✨ Hi! I'm Jadiha ✨</p>
            <p className="mt-2">Systems Design Engineering @ University of Waterloo 💻</p>
            <p className="mt-2">🎯 Currently focused on:</p>
            <ul className="ml-4">
              <li className="cute-bullet">Full-stack Development</li>
              <li className="cute-bullet">Systems Architecture</li>
              <li className="cute-bullet">Human-Centered Design</li>
              <li className="cute-bullet">Cloud & DevOps</li>
            </ul>
            <p className="mt-2">🚀 Previously worked at Amazon, Real Life Robotics, MPAC, and Home Trust Company</p>
            <p className="mt-2 text-pink-500">📧 Open to Winter 2024 opportunities!</p>
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="mb-2 command-output">
            <p className="mb-2 sparkle">✨ Work Experience ✨</p>
            <div className="space-y-4">
              <div className="ml-4">
                <p className="cute-bullet">Wealthsimple | Software Engineer Intern</p>
                <p className="ml-8">🎀 May 2025 - Present</p>
                <p className="ml-8">🌸 Toronto, Ontario, Canada (Hybrid)</p>
                <p className="ml-8">💖 Investing Products</p>
              </div>
              <p className="mt-4 text-pink-400">Type 'about' to learn more about me or click Experience in the header for my detailed work history! ✨</p>
            </div>
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
        setHistory([]);
        return;

      default:
        output = (
          <div className="text-pink-400 command-output bounce-hover">
            Command not found. Type 'help' for available commands! 
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
    } else if (e.key === 'Enter' && !isTyping) {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    handleCommand('help');
  }, []);

  // Update navigation click handler
  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setShowSection(true);

    // Hide terminal when showing sections
    const terminalSection = document.querySelector('.terminal-section') as HTMLElement;
    if (terminalSection) {
      terminalSection.style.opacity = '0';
      terminalSection.style.pointerEvents = 'none';
    }

    // Show overlay with content
    requestAnimationFrame(() => {
      const overlay = document.querySelector('.section-overlay') as HTMLElement;
      if (overlay) {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
      }
    });
  };

  // Handle closing sections
  const handleCloseSection = () => {
    setShowSection(false);
    
    // Show terminal again
    const terminalSection = document.querySelector('.terminal-section') as HTMLElement;
    if (terminalSection) {
      terminalSection.style.opacity = '1';
      terminalSection.style.pointerEvents = 'auto';
    }
  };

  return (
    <main className="relative">
      {/* Navigation Header */}
      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrollProgress > 60 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <motion.span 
                  className="pixel-text cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCloseSection()}
                >
                  Jadiha Arul
                </motion.span>
              </div>
              <div className="hidden sm:flex sm:items-center sm:space-x-8">
                {NAVIGATION_ITEMS.map((item) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item.label.toLowerCase())}
                    className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                      activeSection === item.label.toLowerCase()
                        ? 'text-pink-500'
                        : 'text-gray-600 hover:text-pink-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Welcome Section */}
      <section 
        className="welcome-section min-h-screen flex items-center justify-center fixed top-0 left-0 w-full z-[40]"
        style={{ 
          opacity: welcomeOpacity,
          visibility: welcomeOpacity === 0 ? 'hidden' : 'visible'
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
              <img
                src="/avatars/avatar.png"
                alt="Cute waving avatar"
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
                <span className="text-4xl">👋</span>
              </motion.div>
            </div>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-6"
          >
            Welcome to My World
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-2xl text-gray-600 mb-12"
          >
            Scroll to begin the journey
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
        className="gallery-section min-h-screen sticky top-0 overflow-hidden flex items-center z-[30]"
        style={{ 
          opacity: Math.min(1, (scrollProgress - 15) / 15),
          visibility: scrollProgress > 80 ? 'hidden' : 'visible'
        }}
      >
        <div 
          ref={galleryRef}
          className="flex gap-8 px-8 transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${galleryTranslate}%)` }}
        >
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={index}
              className="flex-none w-[500px]"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={`/gallery/${image.src}`}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Terminal Section */}
      <section 
        className={`terminal-section min-h-screen z-[50] flex items-center justify-center`}
        style={{ 
          opacity: terminalVisible ? 1 : 0,
          pointerEvents: terminalVisible ? 'auto' : 'none',
          transform: terminalVisible ? 'none' : 'translateY(100px)',
          position: terminalVisible ? 'fixed' : 'relative',
          top: terminalVisible ? '0' : 'auto',
          left: terminalVisible ? '0' : 'auto',
          width: terminalVisible ? '100%' : 'auto'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="terminal-window">
            <div className="text-center mb-4">
              <pre className="ascii-art text-base">
                {ASCII_ART}
              </pre>
              <p className="text-gray-700 text-lg">
                Type <span className="text-pink-500 font-semibold">help</span> to get started
              </p>
            </div>
            
            <div className="content-container" ref={contentContainerRef}>
              {history.map((item, index) => (
                <div key={index} className="command-output">
                  <div className="terminal-prompt text-base">
                    <span>visitor</span>
                    <span className="text-gray-400">@</span>
                    <span>portfolio</span>
                    <span className="text-gray-400">:</span>
                    <span className="text-pink-500">~$</span>
                    <span className="ml-2 text-gray-700">{item.command}</span>
                  </div>
                  <div className="mt-2 text-base">
                    {item.output}
                  </div>
                </div>
              ))}
              
              <div className="terminal-prompt text-base">
                <span>visitor</span>
                <span className="text-gray-400">@</span>
                <span>portfolio</span>
                <span className="text-gray-400">:</span>
                <span className="text-pink-500">~$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="ml-2 bg-transparent outline-none flex-1 text-base"
                  autoFocus
                  disabled={isTyping}
                  placeholder="Type a command..."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Overlay */}
      <div 
        className={`section-overlay fixed inset-0 z-[45] flex items-center justify-center bg-white/80 backdrop-blur-sm transition-all duration-300`}
        style={{ 
          opacity: showSection ? 1 : 0,
          pointerEvents: showSection ? 'auto' : 'none',
        }}
      >
        <div className="w-full max-w-6xl p-6 relative">
          <motion.button
            className="absolute top-4 right-4 text-gray-500 hover:text-pink-500 transition-colors"
            onClick={handleCloseSection}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-2xl">×</span>
          </motion.button>

          {/* Section Content */}
          <div 
            ref={(el) => {
              if (el) {
                sectionRefs.current[activeSection] = el;
              }
            }}
            className="overflow-y-auto max-h-[80vh] pr-4"
          >
            {/* About Section */}
            {activeSection === 'about' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="section-content"
              >
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  About Me
                </h2>
                <div className="prose prose-pink">
                  <div className="space-y-4">
                    <p className="text-lg leading-relaxed">
                      Systems Design Engineering student at the University of Waterloo, combining engineering principles with human-centered design thinking.
                    </p>
                    
                    <div className="achievement-card">
                      <h3 className="text-xl font-semibold mb-2">🎯 Focus Areas</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <span>💫</span>
                          <span>Full-stack Development</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span>💫</span>
                          <span>Systems Architecture</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span>💫</span>
                          <span>Human-Centered Design</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span>💫</span>
                          <span>Cloud & DevOps</span>
                        </div>
                      </div>
                    </div>

                    <div className="achievement-card">
                      <h3 className="text-xl font-semibold mb-2">🚀 Experience</h3>
                      <p>Previously worked at:</p>
                      <ul className="list-none space-y-1 mt-2">
                        <li>• Amazon - Software Engineer Intern</li>
                        <li>• Real Life Robotics - Full Stack Engineer Intern</li>
                        <li>• MPAC - Software Engineer Intern</li>
                        <li>• Home Trust Company - Software Engineer Intern</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-100">
                      <p className="text-pink-500 font-medium text-lg">
                        📧 Open to Winter 2024 opportunities!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="section-content"
              >
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Technical Skills
                </h2>
                {Object.entries(SKILLS_DATA).map(([category, skills]) => (
                  <div key={category} className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 capitalize">{category}</h3>
                    <div className="tech-stack-grid">
                      {skills.map((skill) => (
                        <div key={skill.name} className="tech-item">
                          <span className="text-2xl mb-2">{skill.icon}</span>
                          <span className="font-medium">{skill.name}</span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-pink-500 rounded-full h-2"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Projects Section */}
            {activeSection === 'projects' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="section-content"
              >
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Featured Projects
                </h2>
                <div className="project-grid">
                  {PROJECTS_DATA.map((project, index) => (
                    <motion.div
                      key={project.title}
                      className="project-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <img src={project.image} alt={project.title} className="project-image" />
                      <div className="project-content">
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span key={tech} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Experience Section */}
            {activeSection === 'experience' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="section-content"
              >
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Work Experience
                </h2>
                <div className="space-y-8">
                  {/* Amazon */}
                  <div className="achievement-card">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">Amazon | Software Engineer Intern</h3>
                      <span className="text-gray-600">May 2023 - Aug 2023</span>
                    </div>
                    <p className="text-gray-600 mb-3">Vancouver, BC</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span>💫</span>
                        <span>Built real-time cron tracking visual interface for 70,000+ employees, enabling workflow planning.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>💫</span>
                        <span>Automated cron job display with Java & Ruby APIs, improving team scheduling efficiency by 35%.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>💫</span>
                        <span>Optimized core infrastructure, reducing scheduler failures by 65% and improving system uptime.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Real Life Robotics */}
                  <div className="achievement-card">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">Real Life Robotics | Full Stack Engineer Intern</h3>
                      <span className="text-gray-600">Sept 2024 - Dec 2024</span>
                    </div>
                    <p className="text-gray-600 mb-3">Toronto, ON</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span>💫</span>
                        <span>Built NodeJS server for real-time robot-user communication, cutting response time by 50%.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>💫</span>
                        <span>Developed localization system with REST APIs, computer vision, eliminating manual tracking.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>💫</span>
                        <span>Improved robot delivery platform, fixing 50+ bugs and increasing task success by 75%.</span>
                      </li>
                    </ul>
                  </div>

                  {/* MPAC */}
                  <div className="achievement-card">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">MPAC | Software Engineer Intern</h3>
                      <span className="text-gray-600">Jan 2024 - April 2024</span>
                    </div>
                    <p className="text-gray-600 mb-3">Pickering, ON</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span>💫</span>
                        <span>Implemented ReactJS AWS portal, automating service requests and cutting operational costs by 5x.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>💫</span>
                        <span>Optimized Python Boto3 automation for 25+ accounts, improving available cloud resources.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>💫</span>
                        <span>Secured infrastructure with SSL renewals and access key rotations, reducing maintenance by 30%.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Home Trust Company */}
                  <div className="achievement-card">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">Home Trust Company | Software Engineer Intern</h3>
                      <span className="text-gray-600">Jan 2023 - April 2023</span>
                    </div>
                    <p className="text-gray-600 mb-3">Toronto, ON</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span>💫</span>
                        <span>Built automated loan processing with JavaScript, NoSQL, reducing manual testing by 30%.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>💫</span>
                        <span>Executed zero-downtime migration, ensuring 100% accurate critical financial data transfers.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>💫</span>
                        <span>Enhanced loan processing with JavaScript, CodeceptJS, boosting defect detection by 40%.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Projects Section */}
                  <div className="achievement-card border-l-purple-500">
                    <h3 className="text-xl font-semibold mb-4">Featured Project: Timefly</h3>
                    <div className="prose prose-pink">
                      <p className="text-gray-600">
                        A revolutionary time management application that helps students and professionals optimize their daily schedules.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="tech-tag">React Native</span>
                        <span className="tech-tag">Firebase</span>
                        <span className="tech-tag">Machine Learning</span>
                        <span className="tech-tag">Node.js</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Section */}
            {activeSection === 'contact' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="section-content"
              >
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="achievement-card">
                      <h3 className="text-xl font-semibold">📧 Email</h3>
                      <p className="text-pink-500">jadiha.arul@gmail.com</p>
                    </div>
                    <div className="achievement-card">
                      <h3 className="text-xl font-semibold">🌐 Social</h3>
                      <div className="flex gap-4 mt-2">
                        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" 
                           className="text-gray-600 hover:text-pink-500 transition-colors">LinkedIn</a>
                        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer"
                           className="text-gray-600 hover:text-pink-500 transition-colors">GitHub</a>
                      </div>
                    </div>
                  </div>
                  <div className="achievement-card">
                    <h3 className="text-xl font-semibold mb-4">💌 Quick Message</h3>
                    <p className="text-gray-600 mb-4">
                      I'm always open to new opportunities and collaborations!
                    </p>
                    <div className="space-y-4">
                      <a 
                        href="mailto:jadiha.arul@gmail.com"
                        className="inline-block px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                      >
                        Send Email
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
    </div>

      {/* Spacer for scroll height */}
      <div style={{ height: '300vh' }} />
    </main>
  );
}
