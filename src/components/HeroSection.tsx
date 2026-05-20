'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-20 text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-white mb-6"
        >
          Macha.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="text-xl md:text-3xl font-light text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          The next evolution of <br className="md:hidden" />
          <span className="text-white italic">motion and design.</span>
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-xs tracking-widest text-gray-500 uppercase mb-4">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-white/50" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
