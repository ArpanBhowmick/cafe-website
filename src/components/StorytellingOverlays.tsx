'use client';

import React, { useState } from 'react';
import { motion, MotionValue, useTransform, useMotionValueEvent } from 'framer-motion';

interface Props {
  scrollYProgress: MotionValue<number>;
  loaded?: boolean;
}

export default function StorytellingOverlays({ scrollYProgress, loaded = true }: Props) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.01 && showScrollIndicator) {
      setShowScrollIndicator(false);
    } else if (latest <= 0.01 && !showScrollIndicator) {
      setShowScrollIndicator(true);
    }
  });

  // Scroll Indicator
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.01], [1, 0]);

  // Block 1
  const opacity1 = useTransform(scrollYProgress, [0.05, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.05, 0.15], [50, 0]);
  
  // Block 2
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.4], [50, 0]);

  // Block 3
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.65], [0, 1]);
  const y3 = useTransform(scrollYProgress, [0.6, 0.7], [50, 0]);

  return (
    <div className="w-full h-full relative">
      
      {/* Scroll Indicator */}
      {loaded && showScrollIndicator && (
        <motion.div 
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-[5vh] w-full flex justify-center text-white/50 z-20"
        >
          <span className="text-xs uppercase tracking-widest text-gray-500">Scroll to explore</span>
        </motion.div>
      )}

      {/* Narrative Beat 1 */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute top-[30vh] md:top-[40vh] left-6 md:left-24 max-w-md text-white drop-shadow-2xl z-20"
      >
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mb-4">Precision Engineering</p>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 leading-tight">Designed to<br/><span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">defy expectations.</span></h2>
        <p className="text-gray-400 font-light leading-relaxed text-lg">
          Every curve, every material chosen with absolute purpose. The Macha introduces a new paradigm in structural aesthetics.
        </p>
      </motion.div>

      {/* Narrative Beat 2 */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute top-[40vh] right-6 md:right-24 max-w-md text-white text-right drop-shadow-2xl z-20"
      >
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mb-4">Aerodynamic Core</p>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 leading-tight">Air flows<br/><span className="font-medium text-transparent bg-clip-text bg-gradient-to-l from-white to-gray-500">uninterrupted.</span></h2>
        <p className="text-gray-400 font-light leading-relaxed text-lg">
          Our patented unibody design reduces drag to near zero, providing an effortlessly smooth experience.
        </p>
      </motion.div>

      {/* Narrative Beat 3 */}
      <div className="absolute bottom-[20vh] w-full flex justify-center pointer-events-none z-20">
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="max-w-2xl text-white text-center drop-shadow-2xl px-6"
        >
          <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-6">
            The future is <br className="md:hidden" />
            <span className="italic font-light">here.</span>
          </h2>
          <p className="text-gray-300 font-light text-xl">
            Experience the Macha revolution today.
          </p>
        </motion.div>
      </div>

    </div>
  );
}
