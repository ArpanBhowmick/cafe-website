'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Top Speed', value: 'Mach 2.5', highlight: true },
  { label: '0-60 mph', value: '1.2s' },
  { label: 'Range', value: '1200mi' },
  { label: 'Charge Time', value: '15m' }
];

export default function TechnicalShowcase() {
  return (
    <section id="specs" className="py-32 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <p className="text-sm tracking-widest uppercase text-gray-500 mb-4">Uncompromising Performance</p>
          <h2 className="text-4xl md:text-6xl font-light">Pushing the boundaries<br/>of what's possible.</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-8 md:p-12 rounded-2xl bg-black border border-white/5 shadow-2xl relative overflow-hidden group"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className={`text-4xl md:text-6xl font-light mb-2 ${stat.highlight ? 'text-white' : 'text-gray-300'}`}>
                {stat.value}
              </span>
              <span className="text-gray-500 text-sm tracking-wider uppercase">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
