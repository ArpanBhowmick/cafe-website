'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';

const statsByDrink = [
  { // Matcha
    title: "Uncompromising Quality",
    subtitle: "Sourced for the perfect cup.",
    stats: [
      { label: 'Origin', value: 'Uji, JP', highlight: true },
      { label: 'Caffeine', value: '70mg' },
      { label: 'Calories', value: '5 kcal' },
      { label: 'Prep Time', value: '2m' }
    ]
  },
  { // Cappuccino
    title: "Expert Precision",
    subtitle: "The perfect ratio in every cup.",
    stats: [
      { label: 'Origin', value: 'Italy', highlight: true },
      { label: 'Caffeine', value: '65mg' },
      { label: 'Calories', value: '120 kcal' },
      { label: 'Prep Time', value: '3m' }
    ]
  },
  { // Taro Bubble Tea
    title: "Signature Indulgence",
    subtitle: "Freshly crafted daily.",
    stats: [
      { label: 'Origin', value: 'Taiwan', highlight: true },
      { label: 'Caffeine', value: '30mg' },
      { label: 'Calories', value: '250 kcal' },
      { label: 'Prep Time', value: '5m' }
    ]
  }
];

interface TechnicalShowcaseProps {
  currentDrinkIndex?: number;
}

export default function TechnicalShowcase({ currentDrinkIndex = 0 }: TechnicalShowcaseProps) {
  const currentContent = statsByDrink[currentDrinkIndex] || statsByDrink[0];

  return (
    <section id="specs" className="py-32 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          key={`header-${currentDrinkIndex}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <p className="text-sm tracking-widest uppercase text-gray-500 mb-4">{currentContent.title}</p>
          <h2 className="text-4xl md:text-6xl font-light">{currentContent.subtitle}</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {currentContent.stats.map((stat, idx) => (
            <motion.div
              key={`stat-${currentDrinkIndex}-${idx}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full"
            >
              <BorderGlow
                className="h-full w-full"
                backgroundColor="#000000"
                borderRadius={16}
              >
                <div className="flex flex-col items-center justify-center p-8 md:p-12 h-full relative group">
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <span className={`text-3xl md:text-5xl font-light mb-2 ${stat.highlight ? 'text-white' : 'text-gray-300'}`}>
                    {stat.value}
                  </span>
                  <span className="text-gray-500 text-sm tracking-wider uppercase">{stat.label}</span>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
