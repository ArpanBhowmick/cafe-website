'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CanvasScroll from '@/components/CanvasScroll';
import FeatureRevealSection from '@/components/FeatureRevealSection';
import TechnicalShowcase from '@/components/TechnicalShowcase';
import FinalReveal from '@/components/FinalReveal';
import Footer from '@/components/Footer';
import PreOrderModal from '@/components/PreOrderModal';

export default function Home() {
  const [isPreOrderModalOpen, setIsPreOrderModalOpen] = useState(false);
  const [currentDrinkIndex, setCurrentDrinkIndex] = useState(0);

  return (
    <main className="bg-black min-h-screen text-white selection:bg-white/30">
      <Navbar onPreOrderClick={() => setIsPreOrderModalOpen(true)} />
      
      {/* 
        The canvas animation expects a total frame count. 
        We have frames 0001 to 0209. So 209 frames.
      */}
      <CanvasScroll frameCount={209} onSequenceChange={setCurrentDrinkIndex} />
      
      <FeatureRevealSection currentDrinkIndex={currentDrinkIndex} />
      <TechnicalShowcase currentDrinkIndex={currentDrinkIndex} />
      <FinalReveal onPreOrderClick={() => setIsPreOrderModalOpen(true)} />
      <Footer />

      <PreOrderModal 
        isOpen={isPreOrderModalOpen} 
        onClose={() => setIsPreOrderModalOpen(false)} 
      />
    </main>
  );
}
