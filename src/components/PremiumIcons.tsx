'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PremiumIconProps {
  color: string;
  size?: number;
}

// 1. MATCH: Leaf (Foundation)
export const PremiumLeaf = ({ color, size = 64 }: PremiumIconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ y: 0 }}
    animate={{ y: [-4, 4, -4] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    style={{ filter: `drop-shadow(0px 10px 20px ${color}60)` }}
  >
    <defs>
      <linearGradient id="leafGrad" x1="10" y1="10" x2="90" y2="90">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor={color} />
        <stop offset="100%" stopColor="#000000" />
      </linearGradient>
      <radialGradient id="leafFill" cx="30" cy="30" r="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="100%" stopColor={color} stopOpacity="0.1" />
      </radialGradient>
      <filter id="blurGlow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Glow base */}
    <path d="M50 90C25 90 20 60 20 40C20 20 45 10 50 10C55 10 80 20 80 40C80 60 75 90 50 90Z" fill={color} opacity="0.2" filter="url(#blurGlow)" />
    {/* Glass Body */}
    <path d="M50 90C25 90 20 60 20 40C20 20 45 10 50 10C55 10 80 20 80 40C80 60 75 90 50 90Z" fill="url(#leafFill)" stroke="url(#leafGrad)" strokeWidth="2" />
    {/* Inner Highlight */}
    <path d="M48 15C30 25 25 50 25 60" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
    {/* Stem & Veins */}
    <path d="M50 95V40 M50 70L35 60 M50 60L65 50 M50 50L35 40" stroke="url(#leafGrad)" strokeWidth="2" strokeLinecap="round" />
  </motion.svg>
);

// 2. PROCESS: Drops/Liquid (How it's made)
export const PremiumDrop = ({ color, size = 64 }: PremiumIconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ y: 0 }}
    animate={{ y: [-3, 3, -3] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    style={{ filter: `drop-shadow(0px 10px 20px ${color}60)` }}
  >
    <defs>
      <linearGradient id="dropGrad" x1="20" y1="10" x2="80" y2="90">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor={color} />
        <stop offset="100%" stopColor="#111111" />
      </linearGradient>
      <radialGradient id="dropFill" cx="40" cy="30" r="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="100%" stopColor={color} stopOpacity="0.1" />
      </radialGradient>
    </defs>
    {/* Drop Shape */}
    <path d="M50 10C50 10 20 45 20 65C20 81.5 33.5 95 50 95C66.5 95 80 81.5 80 65C80 45 50 10 50 10Z" fill="url(#dropFill)" stroke="url(#dropGrad)" strokeWidth="2" />
    {/* Specular Highlight */}
    <path d="M35 55C35 40 45 30 50 25" stroke="#ffffff" strokeWidth="3" opacity="0.7" strokeLinecap="round" />
    {/* Inner Ripple */}
    <circle cx="50" cy="70" r="10" stroke={color} strokeWidth="1" opacity="0.5" />
  </motion.svg>
);

// 3. WELLNESS: Sparkle / Glow (Health Benefits)
export const PremiumSparkle = ({ color, size = 64 }: PremiumIconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.95, opacity: 0.8 }}
    animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.8, 1, 0.8] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    style={{ filter: `drop-shadow(0px 0px 25px ${color}80)` }}
  >
    <defs>
      <radialGradient id="sparkleGrad" cx="50" cy="50" r="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor={color} />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <linearGradient id="starLine" x1="0" y1="50" x2="100" y2="50">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="50%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
    </defs>
    {/* Core Glow */}
    <circle cx="50" cy="50" r="30" fill="url(#sparkleGrad)" opacity="0.6" />
    {/* Star Points */}
    <path d="M50 10C50 40 40 50 10 50C40 50 50 60 50 90C50 60 60 50 90 50C60 50 50 40 50 10Z" fill="url(#sparkleGrad)" stroke="#ffffff" strokeWidth="1" opacity="0.9" />
    {/* Highlight Cross */}
    <rect x="49" y="5" width="2" height="90" fill="url(#starLine)" />
    <rect x="5" y="49" width="90" height="2" fill="url(#starLine)" />
  </motion.svg>
);

// 4. TASTE: Cup (Taste Profile)
export const PremiumCup = ({ color, size = 64 }: PremiumIconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ y: 0 }}
    animate={{ y: [-2, 2, -2] }}
    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
    style={{ filter: `drop-shadow(0px 15px 15px ${color}50)` }}
  >
    <defs>
      <linearGradient id="cupGrad" x1="10" y1="20" x2="90" y2="80">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor={color} />
        <stop offset="100%" stopColor="#222222" />
      </linearGradient>
      <linearGradient id="liquidGrad" x1="20" y1="30" x2="80" y2="30">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {/* Saucer */}
    <ellipse cx="50" cy="85" rx="40" ry="8" fill="transparent" stroke="url(#cupGrad)" strokeWidth="2" />
    {/* Cup Body */}
    <path d="M20 25C20 25 20 75 50 75C80 75 80 25 80 25Z" fill="#1a1a1a" stroke="url(#cupGrad)" strokeWidth="2" />
    <path d="M20 25C20 25 20 75 50 75C80 75 80 25 80 25Z" fill="url(#cupGrad)" opacity="0.1" />
    {/* Liquid Surface */}
    <ellipse cx="50" cy="25" rx="30" ry="8" fill="url(#liquidGrad)" />
    {/* Handle */}
    <path d="M80 40C95 40 95 60 80 60" fill="transparent" stroke="url(#cupGrad)" strokeWidth="2" strokeLinecap="round" />
    {/* Steam */}
    <motion.path 
      d="M40 15C45 10 40 5 45 0" 
      stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.5"
      animate={{ opacity: [0.2, 0.6, 0.2], pathLength: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.path 
      d="M60 15C55 10 60 5 55 0" 
      stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.5"
      animate={{ opacity: [0.6, 0.2, 0.6], pathLength: [1, 0, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    />
  </motion.svg>
);

// 5. FOUNDATION: Bean (Cappuccino)
export const PremiumBean = ({ color, size = 64 }: PremiumIconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ rotate: 0, y: 0 }}
    animate={{ rotate: [0, 5, -5, 0], y: [-3, 3, -3] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    style={{ filter: `drop-shadow(0px 10px 20px ${color}60)` }}
  >
    <defs>
      <linearGradient id="beanGrad" x1="15" y1="15" x2="85" y2="85">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="30%" stopColor={color} />
        <stop offset="100%" stopColor="#111111" />
      </linearGradient>
      <radialGradient id="beanFill" cx="40" cy="40" r="50">
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
      </radialGradient>
    </defs>
    <ellipse cx="50" cy="50" rx="35" ry="45" transform="rotate(20 50 50)" fill="url(#beanFill)" stroke="url(#beanGrad)" strokeWidth="2" />
    {/* Bean Crack */}
    <path d="M35 25C50 40 40 60 65 75" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
    <path d="M35 25C50 40 40 60 65 75" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    {/* Specular Highlight */}
    <path d="M30 35C25 45 30 65 40 75" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
  </motion.svg>
);

// 6. PROCESS: Gear (Cappuccino / Craftsmanship)
export const PremiumGear = ({ color, size = 64 }: PremiumIconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    style={{ filter: `drop-shadow(0px 0px 15px ${color}50)` }}
  >
    <defs>
      <linearGradient id="gearGrad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor={color} />
        <stop offset="100%" stopColor="#333333" />
      </linearGradient>
    </defs>
    <path d="M50 10 A40 40 0 1 0 50 90 A40 40 0 1 0 50 10 Z" fill="#111" stroke="url(#gearGrad)" strokeWidth="4" />
    {/* Teeth */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <rect key={i} x="44" y="0" width="12" height="15" fill="url(#gearGrad)" transform={`rotate(${angle} 50 50)`} rx="2" />
    ))}
    {/* Inner detail */}
    <circle cx="50" cy="50" r="20" fill="transparent" stroke="url(#gearGrad)" strokeWidth="3" />
    <circle cx="50" cy="50" r="10" fill="url(#gearGrad)" />
  </motion.svg>
);

// 7. WELLNESS: Flame/Energy (Cappuccino)
export const PremiumFlame = ({ color, size = 64 }: PremiumIconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.95, y: 2 }}
    animate={{ scale: [0.95, 1.05, 0.95], y: [2, -2, 2] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    style={{ filter: `drop-shadow(0px 0px 25px ${color}80)` }}
  >
    <defs>
      <linearGradient id="flameGrad" x1="50" y1="10" x2="50" y2="90">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="30%" stopColor={color} />
        <stop offset="100%" stopColor="#ff0000" />
      </linearGradient>
    </defs>
    <path d="M50 10C50 10 20 40 20 65C20 85 35 95 50 95C65 95 80 85 80 65C80 40 50 10 50 10Z" fill="url(#flameGrad)" opacity="0.3" />
    <path d="M50 10C50 10 20 40 20 65C20 85 35 95 50 95C65 95 80 85 80 65C80 40 50 10 50 10Z" stroke="url(#flameGrad)" strokeWidth="2" />
    {/* Inner Flame */}
    <path d="M50 35C50 35 35 55 35 70C35 80 42 85 50 85C58 85 65 80 65 70C65 55 50 35 50 35Z" fill="url(#flameGrad)" opacity="0.8" />
  </motion.svg>
);

// 8. TASTE: Boba / Texture (Taro)
export const PremiumBoba = ({ color, size = 64 }: PremiumIconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ y: 0 }}
    animate={{ y: [-5, 5, -5] }}
    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    style={{ filter: `drop-shadow(0px 10px 20px ${color}60)` }}
  >
    <defs>
      <linearGradient id="bobaGrad" x1="10" y1="10" x2="90" y2="90">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor={color} />
        <stop offset="100%" stopColor="#222222" />
      </linearGradient>
    </defs>
    {/* Cup */}
    <path d="M25 15L35 90C35 93 37 95 40 95H60C63 95 65 93 65 90L75 15H25Z" fill="transparent" stroke="url(#bobaGrad)" strokeWidth="2" />
    <path d="M25 15L35 90C35 93 37 95 40 95H60C63 95 65 93 65 90L75 15H25Z" fill="url(#bobaGrad)" opacity="0.1" />
    {/* Boba Pearls */}
    <circle cx="45" cy="85" r="5" fill="#111" stroke={color} strokeWidth="1" />
    <circle cx="55" cy="80" r="5" fill="#111" stroke={color} strokeWidth="1" />
    <circle cx="48" cy="72" r="5" fill="#111" stroke={color} strokeWidth="1" />
    <circle cx="58" cy="88" r="5" fill="#111" stroke={color} strokeWidth="1" />
    <circle cx="40" cy="78" r="5" fill="#111" stroke={color} strokeWidth="1" />
    {/* Straw */}
    <path d="M70 5L60 90" stroke="url(#bobaGrad)" strokeWidth="4" strokeLinecap="round" />
  </motion.svg>
);
