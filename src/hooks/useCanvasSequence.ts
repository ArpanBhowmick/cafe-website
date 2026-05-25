import { useState, useEffect, useRef } from 'react';

export const useCanvasSequence = (frameCount: number, pathPrefix: string = '/frames/frame_', padLength: number = 4) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const currentTargetRef = useRef(0);

  useEffect(() => {
    let isCancelled = false;
    const imgArray: HTMLImageElement[] = new Array(frameCount);
    setLoaded(false); 
    
    for (let i = 0; i < frameCount; i++) {
      imgArray[i] = new Image();
    }
    setImages(imgArray);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const MAX_CONCURRENT_LOADS = isMobile ? 2 : 4;
    // On mobile, only keep a smaller window of frames in memory to prevent OOM
    const MEMORY_WINDOW_SIZE = isMobile ? 30 : frameCount; 

    const loadFrame = async (index: number) => {
      if (isCancelled) return;
      const img = imgArray[index];
      if (img.src) return;
      
      const paddedIndex = (index + 1).toString().padStart(padLength, '0');
      
      return new Promise<void>((resolve) => {
        img.onload = async () => {
          if (isCancelled) return resolve();
          try {
            await img.decode();
          } catch (e) {
            // Silently fail
          }
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('frameLoaded', { detail: index }));
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = `${pathPrefix}${paddedIndex}.jpg`;
      });
    };

    const loadSequence = async () => {
      await loadFrame(0);
      if (isCancelled) return;
      setLoaded(true);

      // Listen for scroll target updates
      const handleTargetUpdate = (e: Event) => {
        const target = (e as CustomEvent).detail;
        currentTargetRef.current = target;
      };
      
      if (typeof window !== 'undefined') {
        window.addEventListener('targetFrameUpdate', handleTargetUpdate);
      }

      // Background loading loop based on current target
      const loadLoop = async () => {
        while (!isCancelled) {
          const target = currentTargetRef.current;
          const toLoad: number[] = [];
          
          // Determine which frames to load around the target
          const searchRadius = isMobile ? 15 : frameCount;
          for (let r = 0; r <= searchRadius; r++) {
            const down = target - r;
            const up = target + r;
            
            if (down > 0 && !imgArray[down]?.src) toLoad.push(down);
            if (up < frameCount && !imgArray[up]?.src) toLoad.push(up);
            if (toLoad.length >= MAX_CONCURRENT_LOADS) break;
          }

          if (toLoad.length > 0) {
            await Promise.all(toLoad.slice(0, MAX_CONCURRENT_LOADS).map(loadFrame));
          }

          // Memory Management (Sliding Window)
          if (isMobile) {
            for (let i = 0; i < frameCount; i++) {
              if (Math.abs(i - target) > MEMORY_WINDOW_SIZE && imgArray[i]?.src) {
                imgArray[i].src = ''; // Release memory
                imgArray[i].onload = null;
                imgArray[i].onerror = null;
              }
            }
          }
          
          // Yield to main thread
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      };

      loadLoop();
      
      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('targetFrameUpdate', handleTargetUpdate);
        }
      };
    };

    const cleanupLoadLoop = loadSequence();
    
    return () => {
      isCancelled = true;
      cleanupLoadLoop.then(cleanup => cleanup && cleanup());
      imgArray.forEach(img => {
        img.onload = null;
        img.onerror = null;
        img.src = '';
      });
    };
  }, [frameCount, pathPrefix, padLength]);

  return { images, loaded };
};
