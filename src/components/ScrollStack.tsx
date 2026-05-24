import React, { useRef, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

// Dummy wrapper to maintain the API contract. Children are extracted in the parent.
export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children }) => <>{children}</>;

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const parsePercentage = (value: string | number, containerHeight: number) => {
  if (typeof value === 'string' && value.includes('%')) {
    return (parseFloat(value) / 100) * containerHeight;
  }
  return parseFloat(value as string);
};

// The internal card component powered by Framer Motion
const ScrollCard = ({
  index,
  totalCards,
  childProps,
  metrics,
  scrollY,
  windowHeight,
  baseScale,
  itemScale,
  rotationAmount,
  blurAmount,
  itemDistance,
  itemStackDistance,
  stackPosition,
}: any) => {
  const targetScale = baseScale + index * itemScale;
  
  // Safe defaults before measurements are complete
  const start = metrics ? metrics.triggerStart : 0;
  const end = metrics ? metrics.triggerEnd : 1;

  // Cinematic transforms driven strictly by the GPU compositor
  const scale = useTransform(scrollY, [start, end], [1, targetScale], { clamp: true });
  const rotate = useTransform(scrollY, [start, end], [0, index * rotationAmount], { clamp: true });
  const blurValue = useTransform(scrollY, [start, end], [0, index > 0 ? blurAmount : 0], { clamp: true });
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  const stackPositionPx = windowHeight ? parsePercentage(stackPosition, windowHeight) : 0;
  const stickyTop = stackPositionPx + index * itemStackDistance;

  return (
    <motion.div
      className={`scroll-stack-card sticky origin-top will-change-transform shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border ${childProps.itemClassName || ''}`.trim()}
      style={{
        top: stickyTop,
        marginBottom: index < totalCards - 1 ? itemDistance : 0,
        scale,
        rotate,
        filter: blurAmount > 0 ? filter : 'none',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      }}
    >
      {childProps.children}
    </motion.div>
  );
};

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false, // Not heavily used now since native sticky works across both
  onStackComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<{ triggerStart: number; triggerEnd: number }[]>([]);
  const [windowHeight, setWindowHeight] = useState(0);

  // Use Framer Motion's ultra-smooth scroll hook
  const { scrollY } = useScroll();

  // Extract valid children
  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<ScrollStackItemProps> => React.isValidElement(child)
  );

  useEffect(() => {
    const updateMetrics = () => {
      requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

      const wh = window.innerHeight;
      setWindowHeight(wh);

      const stackPositionPx = parsePercentage(stackPosition, wh);
      const scaleEndPositionPx = parsePercentage(scaleEndPosition, wh);

      // Measure cards in their natural un-stuck layout position
      const cardElements = Array.from(container.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
      
      const newMetrics = cardElements.map((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + window.scrollY; // Absolute document position

        const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
        const triggerEnd = cardTop - scaleEndPositionPx;

        return { triggerStart, triggerEnd };
      });

      setMetrics(newMetrics);
      });
    };

    updateMetrics();

    // Debounced resize listener to update metrics cleanly
    let timer: any;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(updateMetrics, 100);
    };
    
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(timer);
    };
  }, [stackPosition, itemStackDistance, scaleEndPosition]);

  return (
    <div 
      className={`relative w-full ${className}`.trim()} 
      ref={containerRef}
    >
      <div className="scroll-stack-inner pt-[5vh] px-6 md:px-20 pb-0 min-h-screen">
        {items.map((child, i) => (
          <ScrollCard
            key={i}
            index={i}
            totalCards={items.length}
            childProps={child.props}
            metrics={metrics[i]}
            scrollY={scrollY}
            windowHeight={windowHeight}
            baseScale={baseScale}
            itemScale={itemScale}
            rotationAmount={rotationAmount}
            blurAmount={blurAmount}
            itemDistance={itemDistance}
            itemStackDistance={itemStackDistance}
            stackPosition={stackPosition}
          />
        ))}
        {/* Spacer to allow the last card to clear out gracefully */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
