'use client';

import React, { useState } from 'react';
import { motion, MotionValue, useTransform, useMotionValueEvent } from 'framer-motion';

interface Props {
  scrollYProgress: MotionValue<number>;
  loaded?: boolean;
  currentSequenceIndex?: number;
}

const DRINK_CONTENT = [
  {
    // Matcha
    block1: {
      subtitle: "Premium Quality",
      title1: "Crafted for",
      title2: "tranquility.",
      desc: "Ceremonial grade matcha sourced directly from Kyoto. A perfect balance of sustained energy and deep focus.",
    },
    block2: {
      subtitle: "Earthy Notes",
      title1: "Taste the",
      title2: "tradition.",
      desc: "Rich umami flavor with a natural sweetness. Whisked to perfection for a smooth, velvety texture.",
    },
    block3: {
      title1: "Find your",
      title2: "balance.",
      desc: "Experience the Matcha ritual today."
    }
  },
  {
    // Cappuccino
    block1: {
      subtitle: "Bold & Rich",
      title1: "Awaken your",
      title2: "senses.",
      desc: "Premium arabica beans roasted to perfection. A robust espresso foundation topped with velvety microfoam.",
    },
    block2: {
      subtitle: "Perfect Crema",
      title1: "Art in every",
      title2: "pour.",
      desc: "Expertly crafted by master baristas. The perfect harmony of bold espresso and sweet textured milk.",
    },
    block3: {
      title1: "Start your",
      title2: "morning.",
      desc: "Experience the ultimate Cappuccino today."
    }
  },
  {
    // Taro Bubble Tea
    block1: {
      subtitle: "Sweet & Creamy",
      title1: "Indulge in",
      title2: "purple dreams.",
      desc: "Authentic taro root blended for a naturally sweet, nutty flavor profile with a beautiful signature hue.",
    },
    block2: {
      subtitle: "Chewy Goodness",
      title1: "Boba made",
      title2: "fresh daily.",
      desc: "Slow-cooked tapioca pearls caramelized in brown sugar for the perfect chewy texture in every sip.",
    },
    block3: {
      title1: "Treat",
      title2: "yourself.",
      desc: "Experience our signature Taro Bubble Tea today."
    }
  }
];

export default function StorytellingOverlays({ scrollYProgress, loaded = true, currentSequenceIndex = 0 }: Props) {
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
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.65, 0.85, 0.9], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.6, 0.7], [50, 0]);

  const content = DRINK_CONTENT[currentSequenceIndex] || DRINK_CONTENT[0];

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
        className="absolute top-[30vh] md:top-[40vh] left-6 md:left-24 max-w-[calc(100vw-3rem)] md:max-w-md text-white drop-shadow-2xl z-20"
      >
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mb-2 md:mb-4">{content.block1.subtitle}</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 md:mb-6 leading-tight">{content.block1.title1}<br/><span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{content.block1.title2}</span></h2>
        <p className="text-gray-400 font-light leading-relaxed text-base md:text-lg">
          {content.block1.desc}
        </p>
      </motion.div>

      {/* Narrative Beat 2 */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute top-[40vh] right-6 md:right-24 max-w-[calc(100vw-3rem)] md:max-w-md text-white text-right drop-shadow-2xl z-20"
      >
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mb-2 md:mb-4">{content.block2.subtitle}</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 md:mb-6 leading-tight">{content.block2.title1}<br/><span className="font-medium text-transparent bg-clip-text bg-gradient-to-l from-white to-gray-500">{content.block2.title2}</span></h2>
        <p className="text-gray-400 font-light leading-relaxed text-base md:text-lg">
          {content.block2.desc}
        </p>
      </motion.div>

      {/* Narrative Beat 3 */}
      <div className="absolute bottom-[20vh] w-full flex justify-center pointer-events-none z-20">
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="max-w-[calc(100vw-3rem)] md:max-w-2xl text-white text-center drop-shadow-2xl px-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tighter mb-4 md:mb-6">
            {content.block3.title1} <br className="md:hidden" />
            <span className="italic font-light">{content.block3.title2}</span>
          </h2>
          <p className="text-gray-300 font-light text-lg md:text-xl">
            {content.block3.desc}
          </p>
        </motion.div>
      </div>

    </div>
  );
}
