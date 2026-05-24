'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mb-6 md:mb-0 flex items-center cursor-pointer"
        >
          <Image 
            src="/logo/cropped_circle_image.png" 
            alt="Just a coffee cup logo" 
            width={64} 
            height={64} 
            className="rounded-full object-cover hover:opacity-80 transition-opacity"
          />
        </button>
        
        <div className="flex space-x-8 text-sm font-light">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        
        <div className="mt-6 md:mt-0 text-sm font-light text-gray-500">
          &copy; {new Date().getFullYear()} Macha Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
