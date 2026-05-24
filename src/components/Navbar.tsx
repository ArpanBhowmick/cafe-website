'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

interface NavbarProps {
  onPreOrderClick?: () => void;
}

export default function Navbar({ onPreOrderClick }: NavbarProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window !== 'undefined') {
      setIsScrolled(latest > window.innerHeight * 4.9);
    }
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate="visible"
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={clsx(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
          isScrolled ? "bg-black/50 backdrop-blur-md border-white/10 py-4" : "bg-transparent border-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center cursor-pointer"
          >
            <Image 
              src="/logo/cropped_circle_image.png" 
              alt="Just a coffee cup logo" 
              width={48} 
              height={48} 
              className="rounded-full object-cover hover:opacity-80 transition-opacity"
            />
          </button>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-gray-300">
            <a href="#features" className="hover:text-white transition-colors cursor-pointer">Features</a>
            <a href="#specs" className="hover:text-white transition-colors cursor-pointer">Specs</a>

            <button 
              onClick={onPreOrderClick}
              className="bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Pre-order
            </button>
          </nav>

          <button 
            className="md:hidden text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex items-center justify-center"
          >
            <nav className="flex flex-col items-center space-y-8 text-2xl text-white font-light">
              <motion.a 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                href="#features" onClick={() => setMenuOpen(false)} className="cursor-pointer">Features</motion.a>
              <motion.a 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                href="#specs" onClick={() => setMenuOpen(false)} className="cursor-pointer">Specs</motion.a>

              <motion.button 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                onClick={() => {
                  setMenuOpen(false);
                  onPreOrderClick?.();
                }}
                className="bg-white text-black px-8 py-3 rounded-full text-lg mt-4 cursor-pointer"
              >
                Pre-order
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
