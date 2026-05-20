import { useState, useEffect } from 'react';

export const useCanvasSequence = (frameCount: number, pathPrefix: string = '/frames/frame_', padLength: number = 4) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];
    setLoaded(false); // Reset loaded state when sequence changes
    
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Pad to the specified length
      const paddedIndex = i.toString().padStart(padLength, '0');
      img.src = `${pathPrefix}${paddedIndex}.jpg`;
      
      // Simple preloading
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      
      // Fallback if image fails to load
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };

      imgArray.push(img);
    }
    
    setImages(imgArray);
    
    // Cleanup if component unmounts
    return () => {
      imgArray.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [frameCount, pathPrefix, padLength]);

  return { images, loaded };
};
