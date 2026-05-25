'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';

const CanvasScroll = dynamic(() => import('@/components/CanvasScroll'), {
  ssr: false,
  loading: () => <div className="w-full h-[500vh] bg-black"><div className="sticky top-0 h-screen flex items-center justify-center bg-black"><div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div></div></div>
});

const FeatureRevealSection = dynamic(() => import('@/sections/FeatureRevealSection'), { 
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />
});

const TechnicalShowcase = dynamic(() => import('@/sections/TechnicalShowcase'), { 
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />
});

const FinalReveal = dynamic(() => import('@/sections/FinalReveal'), { ssr: false });
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
