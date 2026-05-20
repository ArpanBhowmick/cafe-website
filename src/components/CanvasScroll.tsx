'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';
import { useCanvasSequence } from '@/hooks/useCanvasSequence';
import StorytellingOverlays from './StorytellingOverlays';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CanvasScrollProps {
  frameCount?: number; // Kept for backward compatibility, but overridden internally
}

const SEQUENCES = [
  { pathPrefix: '/frames/frame_', frameCount: 209, padLength: 4 },
  { pathPrefix: '/frames-2/ezgif-frame-', frameCount: 240, padLength: 3 },
  { pathPrefix: '/frames-3/ezgif-frame-', frameCount: 240, padLength: 3 }
];

export default function CanvasScroll({ frameCount: _ignored }: CanvasScrollProps) {
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const activeSequence = SEQUENCES[currentSequenceIndex];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { images, loaded } = useCanvasSequence(activeSequence.frameCount, activeSequence.pathPrefix, activeSequence.padLength);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const toggleSequence = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentSequenceIndex((prev) => (prev > 0 ? prev - 1 : SEQUENCES.length - 1));
    } else {
      setCurrentSequenceIndex((prev) => (prev < SEQUENCES.length - 1 ? prev + 1 : 0));
    }
  };

  useEffect(() => {
    if (!loaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let currentRenderedIndex = -1;

    const renderFrame = (index: number) => {
      const imgIndex = Math.min(Math.max(Math.round(index), 0), activeSequence.frameCount - 1);
      
      // Prevent unnecessary re-renders
      if (imgIndex === currentRenderedIndex) return;
      
      const img = images[imgIndex];
      
      if (img && img.complete) {
        currentRenderedIndex = imgIndex;
        
        // Calculate aspect ratio for object-fit: cover
        const canvasW = window.innerWidth;
        const canvasH = window.innerHeight;
        
        const scale = Math.max(canvasW / img.width, canvasH / img.height);
        const x = (canvasW / 2) - (img.width / 2) * scale;
        const y = (canvasH / 2) - (img.height / 2) * scale;
        
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvasW, canvasH);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    const resizeCanvas = () => {
      // Use device pixel ratio for sharper rendering on retina displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      
      // Force render on resize
      currentRenderedIndex = -1;
      const currentIndex = scrollYProgress.get() * (activeSequence.frameCount - 1);
      renderFrame(currentIndex);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial render

    // Setup subscription to framer-motion scroll transform
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Use requestAnimationFrame to sync with display refresh rate
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => {
        const index = latest * (activeSequence.frameCount - 1);
        renderFrame(index);
      });
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      unsubscribe();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [loaded, images, activeSequence.frameCount, scrollYProgress]);

  return (
    <section ref={containerRef} className="relative w-full h-[500vh] bg-black">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        {!loaded && (
          <div className="absolute z-10 flex flex-col items-center justify-center space-y-4 text-white">
            <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase opacity-60">Loading Cinematic Experience</p>
          </div>
        )}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: loaded ? 1 : 0 }}
        />
        
        {/* Left Navigation Zone */}
        {loaded && (
          <div 
            className="absolute top-0 left-0 w-[15%] max-w-[150px] h-full z-30 flex items-center justify-start pl-6 md:pl-12 opacity-0 hover:opacity-100 transition-opacity duration-500 cursor-pointer"
            onClick={() => toggleSequence('left')}
          >
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all">
              <ChevronLeft size={24} />
            </div>
          </div>
        )}

        {/* Right Navigation Zone */}
        {loaded && (
          <div 
            className="absolute top-0 right-0 w-[15%] max-w-[150px] h-full z-30 flex items-center justify-end pr-6 md:pr-12 opacity-0 hover:opacity-100 transition-opacity duration-500 cursor-pointer"
            onClick={() => toggleSequence('right')}
          >
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all">
              <ChevronRight size={24} />
            </div>
          </div>
        )}

        {/* Storytelling Content Overlays */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
          <StorytellingOverlays scrollYProgress={scrollYProgress} loaded={loaded} currentSequenceIndex={currentSequenceIndex} />
        </div>
      </div>
    </section>
  );
}
