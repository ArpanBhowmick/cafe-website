'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import { useCanvasSequence } from '@/hooks/useCanvasSequence';
import StorytellingOverlays from './StorytellingOverlays';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CanvasScrollProps {
  frameCount?: number; // Kept for backward compatibility, but overridden internally
  onSequenceChange?: (index: number) => void;
}

const SEQUENCES = [
  { pathPrefix: '/frames/frame_', frameCount: 209, padLength: 4 },
  { pathPrefix: '/frames-2/ezgif-frame-', frameCount: 240, padLength: 3 },
  { pathPrefix: '/frames-3/ezgif-frame-', frameCount: 240, padLength: 3 }
];

export default function CanvasScroll({ frameCount: _ignored, onSequenceChange }: CanvasScrollProps) {
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

  // Apply frame interpolation for Apple/Tesla level smoothness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
    restDelta: 0.001
  });

  const toggleSequence = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentSequenceIndex((prev) => {
        const next = prev > 0 ? prev - 1 : SEQUENCES.length - 1;
        if (onSequenceChange) onSequenceChange(next);
        return next;
      });
    } else {
      setCurrentSequenceIndex((prev) => {
        const next = prev < SEQUENCES.length - 1 ? prev + 1 : 0;
        if (onSequenceChange) onSequenceChange(next);
        return next;
      });
    }
  };

  useEffect(() => {
    if (!loaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Disable alpha for huge rendering speedup since we don't have transparency
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let currentRenderedIndex = -1;
    
    // Cached geometry to prevent expensive Math on every frame
    let cachedScale = 1;
    let cachedX = 0;
    let cachedY = 0;

    const renderFrame = (index: number) => {
      const imgIndex = Math.min(Math.max(Math.round(index), 0), activeSequence.frameCount - 1);
      if (imgIndex === currentRenderedIndex) return;
      
      const img = images[imgIndex];
      if (img && img.complete) {
        currentRenderedIndex = imgIndex;
        // Draw image directly using pre-calculated dimensions.
        // No fillRect needed because object-fit:cover guarantees full coverage
        ctx.drawImage(img, cachedX, cachedY, img.width * cachedScale, img.height * cachedScale);
      }
    };

    let resizeTimeout: NodeJS.Timeout;
    const resizeCanvas = () => {
      // Debounce resize to prevent layout thrashing
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const dpr = window.devicePixelRatio || 1;
        const cw = window.innerWidth;
        const ch = window.innerHeight;
        
        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
        ctx.scale(dpr, dpr);
        
        // Cache geometry based on the first loaded image
        const sampleImg = images[0];
        if (sampleImg && sampleImg.width > 0) {
          cachedScale = Math.max(cw / sampleImg.width, ch / sampleImg.height);
          cachedX = (cw / 2) - (sampleImg.width / 2) * cachedScale;
          cachedY = (ch / 2) - (sampleImg.height / 2) * cachedScale;
        }
        
        // Force render
        currentRenderedIndex = -1;
        renderFrame(smoothProgress.get() * (activeSequence.frameCount - 1));
      }, 50);
    };

    // Calculate initial geometry synchronously without debounce to avoid flash
    const initGeometry = () => {
      const dpr = window.devicePixelRatio || 1;
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.scale(dpr, dpr);
      const sampleImg = images[0];
      if (sampleImg && sampleImg.width > 0) {
        cachedScale = Math.max(cw / sampleImg.width, ch / sampleImg.height);
        cachedX = (cw / 2) - (sampleImg.width / 2) * cachedScale;
        cachedY = (ch / 2) - (sampleImg.height / 2) * cachedScale;
      }
      renderFrame(smoothProgress.get() * (activeSequence.frameCount - 1));
    };
    
    initGeometry();
    
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Use smoothed progress for buttery transitions
    const unsubscribe = smoothProgress.on('change', (latest) => {
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
      clearTimeout(resizeTimeout);
      unsubscribe();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [loaded, images, activeSequence.frameCount, smoothProgress]);

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
          style={{ 
            opacity: loaded ? 1 : 0,
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
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
          <StorytellingOverlays scrollYProgress={smoothProgress} loaded={loaded} currentSequenceIndex={currentSequenceIndex} />
        </div>
      </div>
    </section>
  );
}
