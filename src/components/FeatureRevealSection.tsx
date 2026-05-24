'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

// Expanded cinematic data
const featuresByDrink = [
  { // Matcha
    themeColor: '#4ade80',
    about: {
      title: "The Craft of",
      subtitle: "Matcha.",
      desc: "An ancient tradition reimagined for the modern palate. We source our ceremonial grade matcha directly from the shaded hills of Uji, Japan, ensuring a vibrant jade color and unparalleled umami richness. Every bowl represents a mindful pause in your day, blending centuries of traditional stone-ground preparation with contemporary luxury to deliver sustained, clean energy and profound focus."
    },
    sections: [
      {
        title: "The Foundation",
        subtitle: "Premium Ingredients",
        content: "100% Ceremonial Grade Uji Matcha, shade-grown and stone-ground to preserve its vibrant color and delicate nutrients. Blended only with pure hot water or lightly steamed oat milk for the perfect latte.",
        icon: "🍃"
      },
      {
        title: "The Process",
        subtitle: "How It's Made",
        content: "Carefully measured into a warmed bowl, hot water is added at exactly 175°F. It is then vigorously whisked in a 'W' motion using a traditional bamboo chasen until a perfect, jade-green froth forms.",
        icon: "🏺"
      },
      {
        title: "The Wellness",
        subtitle: "Health Benefits",
        content: "Packed with L-theanine for sustained, jitter-free energy and calm focus. Exceptionally rich in antioxidants (EGCG) to support metabolism and overall vitality.",
        icon: "✨"
      },
      {
        title: "The Experience",
        subtitle: "Taste Profile",
        content: "Deeply earthy and umami-rich, balanced with a natural, subtle sweetness. It finishes with a vibrant, grassy note that lingers gently on the palate.",
        icon: "🍵"
      }
    ]
  },
  { // Cappuccino
    themeColor: '#d97706',
    about: {
      title: "The Perfect",
      subtitle: "Cappuccino.",
      desc: "Experience the ultimate expression of coffee craftsmanship. We select only the finest ethically sourced Arabica beans, roasted to perfection to draw out their deepest chocolate and caramel notes. Each cup is a masterful balance of intense, rich double espresso harmonized perfectly with luxuriously textured, sweet microfoam, creating a deeply comforting ritual that awakens the senses."
    },
    sections: [
      {
        title: "The Foundation",
        subtitle: "Premium Ingredients",
        content: "Freshly roasted, ethically sourced Arabica beans ground moments before brewing. Paired with precisely filtered water and your choice of perfectly steamed milk.",
        icon: "☕"
      },
      {
        title: "The Process",
        subtitle: "How It's Made",
        content: "A double ristretto shot is pulled with precise pressure and timing. Simultaneously, milk is micro-aerated to create a dense, velvety foam that is gently folded into the crema.",
        icon: "⚙️"
      },
      {
        title: "The Wellness",
        subtitle: "Health Benefits",
        content: "A natural source of robust energy and mental clarity. Rich in essential antioxidants from the dark roast, supporting heart health and cognitive function.",
        icon: "🔥"
      },
      {
        title: "The Experience",
        subtitle: "Taste Profile",
        content: "A bold, full-bodied espresso foundation perfectly harmonized by the natural, caramelized sweetness of thick microfoam. Rich, warm, and deeply comforting.",
        icon: "🤎"
      }
    ]
  },
  { // Taro Bubble Tea
    themeColor: '#c084fc',
    about: {
      title: "Signature Taro",
      subtitle: "Boba.",
      desc: "Indulge in our sweet, creamy, and distinctively purple Taiwanese classic. We elevate this nostalgic treat by using real, fresh-cooked taro root instead of artificial powders, blending it flawlessly with premium jasmine green tea. Served over our signature slow-simmered, caramelized boba pearls, it offers a beautifully layered texture and a naturally sweet, nutty flavor profile that feels both playful and incredibly premium."
    },
    sections: [
      {
        title: "The Foundation",
        subtitle: "Premium Ingredients",
        content: "Real, fresh Taro root, premium Jasmine Green Tea, rich dairy or oat creamer, and our signature slow-cooked Tapioca Pearls bathed in dark brown sugar.",
        icon: "🍠"
      },
      {
        title: "The Process",
        subtitle: "How It's Made",
        content: "Fresh taro is cooked until tender, then blended smoothly into a creamy tea base. It is then poured over warm, caramelized boba pearls prepared fresh every morning.",
        icon: "🥣"
      },
      {
        title: "The Wellness",
        subtitle: "Health Benefits",
        content: "Taro root provides a healthy dose of dietary fiber, potassium, and complex carbohydrates for sustained energy, while Jasmine tea offers gentle antioxidants.",
        icon: "💜"
      },
      {
        title: "The Experience",
        subtitle: "Taste Profile",
        content: "Incredibly creamy, sweet, and wonderfully nutty with subtle hints of vanilla. The texture is a delightful contrast between smooth milk tea and warm, chewy boba.",
        icon: "🧋"
      }
    ]
  }
];

interface FeatureRevealSectionProps {
  currentDrinkIndex?: number;
}

export default function FeatureRevealSection({ currentDrinkIndex = 0 }: FeatureRevealSectionProps) {
  const currentContent = featuresByDrink[currentDrinkIndex] || featuresByDrink[0];

  return (
    <section id="features" className="bg-black text-white relative pb-5 overflow-x-clip">
      
      {/* Cinematic Intro Block */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <motion.div 
          key={`header-${currentDrinkIndex}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-2/3"
        >
          <h2 className="text-5xl md:text-8xl font-light tracking-tight mb-8">
            {currentContent.about.title} <br/> 
            <span className="font-medium" style={{ color: currentContent.themeColor }}>
              {currentContent.about.subtitle}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
            {currentContent.about.desc}
          </p>
        </motion.div>
      </div>

      {/* Interactive Storytelling Stack */}
      <div className="w-full relative">
        <ScrollStack 
          useWindowScroll={true} 
          itemDistance={30}
          itemStackDistance={50}
          baseScale={0.9}
          scaleEndPosition="5%"
        >
          {currentContent.sections.map((section, idx) => (
            <ScrollStackItem 
              key={`section-${currentDrinkIndex}-${idx}`} 
              itemClassName="w-full h-auto md:h-[400px] my-4 p-0 md:p-0 bg-transparent rounded-[32px] overflow-hidden"
            >
              <BorderGlow
                className="w-full h-full"
                backgroundColor="#0a0a0a"
                borderRadius={32}
              >
                {/* Card Content */}
                <div className="w-full h-full flex flex-col md:flex-row relative">
                  
                  {/* Glassmorphism gradient behind text */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                  
                  {/* Left Side: Icon Container */}
                  <div className="w-full md:w-1/3 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
                    <div className="flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent w-20 h-20 md:w-28 md:h-28 rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                      <span className="text-4xl md:text-6xl drop-shadow-2xl">{section.icon}</span>
                    </div>
                    <div className="mt-8 md:mt-0">
                      <p className="text-sm tracking-[0.2em] uppercase text-gray-500 font-medium">{section.title}</p>
                    </div>
                  </div>

                  {/* Right Side: Copy */}
                  <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl md:text-5xl font-light mb-6 text-white tracking-tight">
                      {section.subtitle}
                    </h3>
                    <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl">
                      {section.content}
                    </p>
                  </div>
                  
                </div>
              </BorderGlow>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
      
    </section>
  );
}
