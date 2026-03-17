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
  { src: 'amazon2.jpeg', title: 'Amazon Internship' },
  { src: 'Ambassadors.jpeg', title: 'Tech Leadership' },
  { src: 'DSC00227.JPG', title: 'Problem Solving' },
  { src: 'DSC03005.jpg', title: 'Team Collaboration' },
  { src: 'DSC05871.JPG', title: 'Innovation' },
  { src: 'HackTheNorth.jpg', title: 'Hackathon Winner' },
  { src: 'IMG_6300.jpg', title: 'Tech Conference' },
  { src: 'IMG-20240715-WA0005.jpg', title: 'Project Demo' }
];

// Navigation items - Commented out for deployment
/*
const NAVIGATION_ITEMS = [
  { label: 'About', href: '#about', icon: '👋' },
  { label: 'Experience', href: '#experience', icon: '💼' },
  { label: 'Projects', href: '#projects', icon: '🚀' },
  { label: 'Skills', href: '#skills', icon: '💫' },
  { label: 'Contact', href: '#contact', icon: '📬' }
];

const SKILLS_DATA = {
  languages: [
    { name: 'Python', level: 95, icon: '🐍', description: 'ML, Data Analysis, Backend' },
    { name: 'TypeScript', level: 90, icon: '📘', description: 'Full-stack Development' },
    { name: 'JavaScript', level: 90, icon: '💛', description: 'Web Development' },
    { name: 'C++', level: 85, icon: '⚡', description: 'Systems Programming' },
    { name: 'Ruby', level: 80, icon: '💎', description: 'Web Development' },
    { name: 'Java', level: 75, icon: '☕', description: 'Backend Development' }
  ],
  frontend: [
    { name: 'React.js', level: 95, icon: '⚛️', description: 'UI Development' },
    { name: 'Next.js', level: 90, icon: '▲', description: 'Full-stack Framework' },
    { name: 'Tailwind CSS', level: 90, icon: '🎨', description: 'Styling' },
    { name: 'TypeScript', level: 85, icon: '🔷', description: 'Type Safety' },
    { name: 'HTML/CSS', level: 85, icon: '🎯', description: 'Web Fundamentals' }
  ],
  backend: [
    { name: 'Node.js', level: 90, icon: '🟢', description: 'Server Runtime' },
    { name: 'Express.js', level: 85, icon: '🚂', description: 'Web Framework' },
    { name: 'REST APIs', level: 85, icon: '🔌', description: 'API Design' },
    { name: 'GraphQL', level: 80, icon: '📊', description: 'API Query Language' },
    { name: 'ROS', level: 75, icon: '🤖', description: 'Robotics Framework' }
  ],
  databases: [
    { name: 'PostgreSQL', level: 85, icon: '🐘', description: 'Relational DB' },
    { name: 'MongoDB', level: 85, icon: '🍃', description: 'NoSQL DB' },
    { name: 'Redis', level: 80, icon: '⚡', description: 'In-memory Cache' },
    { name: 'Firebase', level: 80, icon: '🔥', description: 'Real-time DB' }
  ],
  cloud: [
    { name: 'AWS', level: 85, icon: '☁️', description: 'Cloud Platform' },
    { name: 'Docker', level: 80, icon: '🐳', description: 'Containerization' },
    { name: 'Git', level: 90, icon: '📚', description: 'Version Control' },
    { name: 'CI/CD', level: 85, icon: '🔄', description: 'Automation' }
  ],
  tools: [
    { name: 'VS Code', level: 90, icon: '💻', description: 'IDE' },
    { name: 'Postman', level: 85, icon: '📬', description: 'API Testing' },
    { name: 'Jira', level: 85, icon: '📋', description: 'Project Management' },
    { name: 'Figma', level: 80, icon: '🎨', description: 'UI/UX Design' }
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
*/

export default function Home() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  // const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  // const [activeSection, setActiveSection] = useState<string>('terminal');
  // const [showSection, setShowSection] = useState(false);

  // Simplified visibility calculations
  const welcomeOpacity = Math.max(0, 1 - scrollProgress / 25);
  const terminalVisible = scrollProgress > 60;

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      // Smoother scroll progress calculation with more gradual transition
      const progress = (scrolled / (windowHeight * 2.5)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
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
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <p className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Hi! I&apos;m Jadiha 👋
                </p>
                <p className="text-gray-600 mt-2">
                  A Systems Design Engineering student at UWaterloo. 
                  I&apos;m passionate about building impactful software products and have gained valuable experience at companies like Amazon and Wealthsimple. 
                  Always looking for opportunities to make a positive difference in the tech space!
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-pink-500 font-medium">🎯 Focus Areas</p>
                  <p className="text-gray-600 ml-4">• Software Development</p>
                  <p className="text-gray-600 ml-4">• Product Management</p>
                  <p className="text-gray-600 ml-4">• Systems Design</p>
                </div>
                <div>
                  <p className="text-pink-500 font-medium">💼 Recent Work</p>
                  <p className="text-gray-600 ml-4">• Amazon</p>
                  <p className="text-gray-600 ml-4">• Wealthsimple</p>
                  <p className="text-gray-600 ml-4">• Real Life Robotics</p>
                </div>
              </div>
              <p className="text-pink-500 font-medium mt-2">📧 Open to Winter 2026 opportunities!</p>
            </div>
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="command-output">
            <div className="space-y-4">
              <div>
                <p className="text-pink-500 font-medium">💰 Wealthsimple | Software Engineer Intern</p>
                <p className="text-gray-500 text-sm ml-4">May 2025 - Present · Toronto, Ontario, Canada</p>
                <p className="text-gray-600 ml-4">• Implemented features such as TFSA account linking for margin trading, contributing to $60K daily revenue and $20M annual revenue</p>
              </div>
              
              <div>
                <p className="text-pink-500 font-medium">🤖 Real Life Robotics | Full Stack Developer</p>
                <p className="text-gray-500 text-sm ml-4">Sep 2024 - Dec 2024 · Toronto, Ontario, Canada</p>
                <p className="text-gray-600 ml-4">• Developed real-time robot communication system for BUBs delivery robot, enabling 100+ successful deliveries at Toronto Zoo</p>
              </div>
              
              <div>
                <p className="text-pink-500 font-medium">☁️ Municipal Property Assessment Corporation | Cloud Infrastructure Analyst</p>
                <p className="text-gray-500 text-sm ml-4">Jan 2024 - Apr 2024 · Pickering, Ontario, Canada</p>
                <p className="text-gray-600 ml-4">• Managed cloud infrastructure operations using Python Boto3 and React.js, processing $10K+ in data assets</p>
              </div>
              
              <div>
                <p className="text-pink-500 font-medium">⏰ Amazon | Software Development Engineer Intern</p>
                <p className="text-gray-500 text-sm ml-4">May 2023 - Aug 2023 · Vancouver, British Columbia, Canada</p>
                <p className="text-gray-600 ml-4">• Built real-time cron tracking interface, improving system uptime by 65% for 70,000+ employees</p>
              </div>
              
              <div>
                <p className="text-pink-500 font-medium">🏦 Home Trust Company | QA Automation Analyst</p>
                <p className="text-gray-500 text-sm ml-4">Jan 2023 - Apr 2023 · Toronto, Ontario, Canada</p>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 font-medium">Email</p>
                <p className="text-pink-400">jadiha.arul@gmail.com</p>
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
            <div className="ml-4 space-y-3">
              <div>
                <p className="text-pink-500 font-medium">🧠 EEG Brain Activity Analysis</p>
                <p className="ml-4">Applied FFT to analyze alpha waves (8-13 Hz) from EEG data, enabling real-time brain-computer interface applications</p>
              </div>
              <div>
                <p className="text-pink-500 font-medium">📄 AI Resume Optimizer</p>
                <p className="ml-4">Built AI-powered tool that parses PDF resumes, analyzes job descriptions, and optimizes content with formatting preservation</p>
              </div>
              <div>
                <p className="text-pink-500 font-medium">💻 Interactive Portfolio Website</p>
                <p className="ml-4">Developed terminal-style portfolio with React, TypeScript, and Framer Motion animations</p>
              </div>
            </div>
            <br></br>
            <p className="mt-3 text-gray-500">And many more available on my <a href="https://github.com/jadiha" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">GitHub</a>!</p>
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
        output = (
          <div className="text-gray-500 command-output">
            Terminal cleared. Type &apos;help&apos; to see available commands.
          </div>
        );
        break;

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

  // Update navigation click handler - Commented out for deployment
  /*
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
  */

  return (
    <main className="relative">
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
            Hi, I&apos;m Jadiha
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-2xl text-gray-600 mb-12"
          >
            Scroll to start exploring my world!
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
          opacity: Math.min(1, (scrollProgress - 15) / 15),
          visibility: scrollProgress > 60 ? 'hidden' : 'visible'
        }}
      >
        <div className="gallery-container">
          <div 
            className="gallery-track"
            style={{
              transform: `translateX(${Math.min(
                Math.max(
                  -((scrollProgress - 20) / 30) * ((GALLERY_IMAGES.length + 0.5) * 520),
                  -((GALLERY_IMAGES.length + 0.5) * 520)
                ),
                0
              )}px)`
            }}
          >
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={index}
                className="gallery-item"
        >
          <Image
                  src={`/gallery/${image.src}`}
                  alt={image.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Keep scrolling dialogue - appears when near the last picture */}
        {scrollProgress > 45 && scrollProgress < 60 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-8 left-0 right-0 flex justify-center bg-white/90 backdrop-blur-md rounded-lg px-6 py-4 shadow-lg border border-pink-200 z-10 mx-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💻</span>
              <div>
                <p className="text-gray-800 font-medium">Keep scrolling to explore the terminal!</p>
                <p className="text-gray-600 text-sm">Type commands and discover more about me</p>
              </div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-pink-500 text-xl"
              >
                ↓
              </motion.div>
            </div>
          </motion.div>
        )}
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

      {/* Section Overlay - Removed for deployment */}

      {/* Spacer to control scroll range */}
      <div style={{ height: `${Math.max(350, GALLERY_IMAGES.length * 60)}vh` }} />
    </main>
  );
}
