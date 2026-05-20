'use client';

import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Titanium Shell',
    description: 'Forged from aerospace-grade titanium, providing unparalleled strength-to-weight ratio.',
    delay: 0.1
  },
  {
    title: 'Neural Core',
    description: 'An advanced AI processor predicting your needs before you even realize them.',
    delay: 0.2
  },
  {
    title: 'Quantum Battery',
    description: 'Weeks of sustained energy on a single rapid charge. No compromises.',
    delay: 0.3
  }
];

export default function FeatureRevealSection() {
  return (
    <section id="features" className="py-32 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 md:w-2/3"
        >
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
            Engineering <br/> <span className="font-medium">Masterpiece.</span>
          </h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            We didn't just redesign it; we rethought the fundamental laws of how it should operate. 
            Every component has been engineered to deliver a seamless, intuitive experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
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
