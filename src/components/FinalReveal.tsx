'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PrismaticBurst from './PrismaticBurst';

interface FinalRevealProps {
  onPreOrderClick?: () => void;
}

export default function FinalReveal({ onPreOrderClick }: FinalRevealProps) {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background Prismatic Effect */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <PrismaticBurst 
          intensity={1.5}
          speed={0.8}
          animationType="hover"
          mixBlendMode="screen"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-[1]" />
      
      <div className="z-10 text-center px-6 mt-20">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-gray-400 tracking-[0.3em] uppercase text-sm mb-6"
        >
          The Wait is Over
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-8xl font-medium tracking-tighter text-white mb-12"
        >
          Reserve your<br />
          <span className="italic font-light">Macha.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button 
            onClick={onPreOrderClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full text-lg font-medium overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 w-full h-full bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            <span className="relative flex items-center">
              Pre-order Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
