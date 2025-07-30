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
  const headerVisible = scrollProgress > 30;

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
            <div className="space-y-3">
              <div>
                <p className="text-pink-500 font-medium">Amazon | Software Engineer Intern</p>
                <p className="text-gray-600 ml-4">• Built real-time cron tracking interface</p>
                <p className="text-gray-600 ml-4">• Improved system uptime by 65%</p>
              </div>
              <div>
                <p className="text-pink-500 font-medium">Real Life Robotics | Full Stack Engineer</p>
                <p className="text-gray-600 ml-4">• Built real-time robot communication system</p>
                <p className="text-gray-600 ml-4">• Improved task success rate by 75%</p>
              </div>
            </div>
            <p className="mt-2 text-gray-500">Type &apos;about&apos; for more info or click Experience in header</p>
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
            <p>📄 Downloading resume...</p>
            <p className="text-purple-400">
              <a href="/resume.pdf" download className="hover:underline">
                Click here if the download doesn&apos;t start automatically
              </a>
            </p>
          </div>
        );
        // Add actual download logic here
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
      {/* Navigation Header - Simplified for deployment */}
      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <motion.span 
                  className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Jadiha Aruleswaran
                </motion.span>
              </div>
              <div className="flex items-center">
                <a 
                  href="/contact"
                  className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent hover:from-pink-600 hover:to-purple-600 transition-all duration-300 cursor-pointer"
                >
                  Contact
                </a>
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
