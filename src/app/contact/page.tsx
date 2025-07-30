'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4"
          >
            Let&apos;s Connect! 💫
          </motion.h1>
          <p className="text-gray-600 text-lg">
            I&apos;m always open to new opportunities and collaborations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">📬 Contact Info</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <Link 
                    href="mailto:jadiha.arul@gmail.com"
                    className="text-pink-600 hover:text-pink-700 transition-colors"
                  >
                    jadiha.arul@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-medium text-gray-800">Location</p>
                  <p className="text-gray-600">Waterloo, Ontario, Canada</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl">🎓</span>
                <div>
                  <p className="font-medium text-gray-800">Education</p>
                  <p className="text-gray-600">University of Waterloo</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🌐 Social Links</h2>
            
            <div className="space-y-4">
              <Link 
                href="https://www.linkedin.com/in/jadiha-aruleswaran/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-2xl">💼</span>
                <div>
                  <p className="font-medium text-gray-800">LinkedIn</p>
                  <p className="text-blue-600">Connect with me</p>
                </div>
              </Link>

              <Link 
                href="https://github.com/jadiha"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-2xl">💻</span>
                <div>
                  <p className="font-medium text-gray-800">GitHub</p>
                  <p className="text-gray-600">@jadiha</p>
                </div>
              </Link>

              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">📄</span>
                <div>
                  <p className="font-medium text-gray-800">Resume</p>
                  <Link 
                    href="/resume.pdf" 
                    download
                    className="text-green-600 hover:text-green-700 transition-colors"
                  >
                    Download PDF
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Open to Winter 2026 Opportunities! 🚀
          </h3>
          <p className="text-gray-600">
            I&apos;m actively seeking internship and full-time opportunities in software development, 
            product management, and systems design.
          </p>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 text-center"
        >
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 transition-colors"
          >
            <span>←</span>
            <span>Back to Terminal</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 