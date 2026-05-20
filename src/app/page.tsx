import Navbar from '@/components/Navbar';
import CanvasScroll from '@/components/CanvasScroll';
import FeatureRevealSection from '@/components/FeatureRevealSection';
import TechnicalShowcase from '@/components/TechnicalShowcase';
import FinalReveal from '@/components/FinalReveal';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-white/30">
      <Navbar />
      
      {/* 
        The canvas animation expects a total frame count. 
        We have frames 0001 to 0209. So 209 frames.
      */}
      <CanvasScroll frameCount={209} />
      
      <FeatureRevealSection />
      <TechnicalShowcase />
      <FinalReveal />
      <Footer />
    </main>
  );
}
