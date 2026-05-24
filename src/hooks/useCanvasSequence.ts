import { useState, useEffect } from 'react';

export const useCanvasSequence = (frameCount: number, pathPrefix: string = '/frames/frame_', padLength: number = 4) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    // Pre-allocate the array
    const imgArray: HTMLImageElement[] = new Array(frameCount);
    setLoaded(false); 
    
    // Create image objects immediately
    for (let i = 0; i < frameCount; i++) {
      imgArray[i] = new Image();
    }
    setImages(imgArray);

    const loadFrame = async (index: number) => {
      if (isCancelled) return;
      const img = imgArray[index];
      const paddedIndex = (index + 1).toString().padStart(padLength, '0');
      
      return new Promise<void>((resolve) => {
        img.onload = async () => {
          if (isCancelled) return resolve();
          try {
            // Off-thread decoding to prevent main thread jank when drawn to canvas
            await img.decode();
          } catch (e) {
            // Silently fail, it will just decode on the main thread later
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = `${pathPrefix}${paddedIndex}.jpg`;
      });
    };

    const loadSequence = async () => {
      // 1. Prioritize ONLY the first frame for instant visual feedback and NO_FCP fix
      await loadFrame(0);
      
      if (isCancelled) return;
      setLoaded(true); // Reveal the canvas INSTANTLY

      // 2. Load the rest sequentially in chunks in the background without blocking
      const loadRemaining = async () => {
        const chunkSize = 5;
        for (let i = 1; i < frameCount; i += chunkSize) {
          if (isCancelled) break;
          const chunkPromises = [];
          for (let j = 0; j < chunkSize && i + j < frameCount; j++) {
            chunkPromises.push(loadFrame(i + j));
          }
          await Promise.all(chunkPromises);
          
          // Yield to main thread between chunks to prevent jank and maintain 60fps scrolling
          await new Promise(resolve => setTimeout(resolve, 5));
        }
      };

      // Fire and forget - do not await so we don't block the UI
      loadRemaining();
    };

    loadSequence();
    
    return () => {
      isCancelled = true;
      imgArray.forEach(img => {
        img.onload = null;
        img.onerror = null;
        // Optionally empty src to free memory if unmounted quickly
        img.src = '';
      });
    };
  }, [frameCount, pathPrefix, padLength]);

  return { images, loaded };
};
