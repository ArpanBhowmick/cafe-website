'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
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
          <div className="text-white font-bold tracking-widest text-xl uppercase">
            Macha
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#specs" className="hover:text-white transition-colors">Specs</a>
            <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
            <button className="bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition-colors">
              Pre-order
            </button>
          </nav>

          <button 
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black flex items-center justify-center">
          <nav className="flex flex-col items-center space-y-8 text-2xl text-white font-light">
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#specs" onClick={() => setMenuOpen(false)}>Specs</a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
            <button className="bg-white text-black px-8 py-3 rounded-full text-lg mt-4">
              Pre-order
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
