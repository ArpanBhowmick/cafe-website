'use client';

import React from 'react';
import { motion } from 'framer-motion';

const featuresByDrink = [
  { // Matcha
    title: "The Craft of",
    subtitle: "Matcha.",
    description: "Discover the meticulous process and premium ingredients that go into every ceremonial bowl.",
    features: [
      {
        title: 'How It\'s Made',
        description: 'Stone-ground into a fine powder from specially grown, shade-covered green tea leaves. Whisked with a bamboo chasen to perfect frothiness.',
        delay: 0.1
      },
      {
        title: 'Ingredients',
        description: '100% Ceremonial Grade Uji Matcha, pure hot water. Optionally paired with lightly steamed oat or almond milk for lattes.',
        delay: 0.2
      },
      {
        title: 'Taste Profile',
        description: 'Earthy, umami-rich, and naturally sweet with a vibrant, grassy finish. A refined balance of depth and smooth texture.',
        delay: 0.3
      }
    ]
  },
  { // Cappuccino
    title: "The Perfect",
    subtitle: "Cappuccino.",
    description: "Experience the ultimate expression of coffee, combining bold espresso with velvety textured milk.",
    features: [
      {
        title: 'How It\'s Made',
        description: 'Pulled as a rich, robust espresso shot, then immediately topped with deeply textured steamed milk and a thick layer of microfoam.',
        delay: 0.1
      },
      {
        title: 'Ingredients',
        description: 'Freshly roasted premium Arabica espresso beans, filtered water, and precisely steamed milk.',
        delay: 0.2
      },
      {
        title: 'Taste Profile',
        description: 'Bold, full-bodied coffee flavor perfectly balanced by the natural creamy sweetness of the thick milk foam.',
        delay: 0.3
      }
    ]
  },
  { // Taro Bubble Tea
    title: "Signature Taro",
    subtitle: "Boba.",
    description: "Indulge in our sweet, creamy, and distinctively purple Taiwanese classic.",
    features: [
      {
        title: 'How It\'s Made',
        description: 'Fresh taro root is cooked and blended with milk and tea, then poured over slow-simmered, caramelized tapioca pearls.',
        delay: 0.1
      },
      {
        title: 'Ingredients',
        description: 'Fresh Taro Root, premium Jasmine Green Tea, rich creamer, brown sugar, and daily-cooked Tapioca Pearls (Boba).',
        delay: 0.2
      },
      {
        title: 'Taste Profile',
        description: 'Sweet, creamy, and nutty with hints of vanilla, perfectly complemented by the chewy texture of warm boba.',
        delay: 0.3
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
    <section id="features" className="py-32 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          key={`header-${currentDrinkIndex}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 md:w-2/3"
        >
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
            {currentContent.title} <br/> <span className="font-medium">{currentContent.subtitle}</span>
          </h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            {currentContent.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {currentContent.features.map((feature, idx) => (
            <motion.div
              key={`feature-${currentDrinkIndex}-${idx}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: feature.delay, ease: "easeOut" }}
              className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-colors"
            >
              <h3 className="text-2xl font-medium mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
