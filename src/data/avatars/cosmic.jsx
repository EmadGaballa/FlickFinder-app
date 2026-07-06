import React from "react";
import { AvatarBase } from "./AvatarBase";

/**
 * ============================================================
 * Premium Space Avatars
 * ============================================================
 * Cute, minimal, premium space icons with beautiful gradients.
 * Whimsical and elegant. Apple app icon quality.
 * ============================================================
 */

// Saturn
export function SaturnAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#F4D03F", "#E67E22"]} {...props}>
      <defs>
        <linearGradient id="saturn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7DC6F" />
          <stop offset="100%" stopColor="#F0B27A" />
        </linearGradient>
      </defs>
      {/* Planet body */}
      <circle cx="50" cy="55" r="18" fill="url(#saturn-grad)" />
      {/* Ring back */}
      <ellipse cx="50" cy="55" rx="30" ry="7" fill="none" stroke="rgba(230,180,140,0.7)" strokeWidth="3.5" />
      {/* Highlight */}
      <ellipse cx="45" cy="50" rx="7" ry="5" fill="rgba(255,255,255,0.25)" />
      {/* Ring front */}
      <ellipse cx="50" cy="55" rx="30" ry="7" fill="none" stroke="rgba(200,160,120,0.5)" strokeWidth="2.5" />
    </AvatarBase>
  );
}

// Stars
export function StarsAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#667EEA", "#764BA2"]} {...props}>
      <defs>
        <radialGradient id="star-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE5A0" />
          <stop offset="100%" stopColor="#FFD700" />
        </radialGradient>
      </defs>
      {/* Large central star */}
      <path d="M 50 30 L 53 45 L 68 45 L 56 54 L 60 70 L 50 60 L 40 70 L 44 54 L 32 45 L 47 45 Z" fill="url(#star-grad)" />
      {/* Small stars */}
      <circle cx="25" cy="35" r="2" fill="rgba(255,255,255,0.8)" />
      <circle cx="75" cy="40" r="1.5" fill="rgba(255,255,255,0.7)" />
      <circle cx="30" cy="70" r="1.5" fill="rgba(255,255,255,0.6)" />
      <circle cx="70" cy="65" r="2" fill="rgba(255,255,255,0.7)" />
      {/* Highlight */}
      <circle cx="47" cy="42" r="2" fill="rgba(255,255,255,0.5)" />
    </AvatarBase>
  );
}

// Moon
export function MoonAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#2C3E50", "#4CA1AF"]} {...props}>
      <defs>
        <linearGradient id="moon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5F5DC" />
          <stop offset="100%" stopColor="#E8E4C9" />
        </linearGradient>
      </defs>
      {/* Crescent moon */}
      <path d="M 50 30 Q 65 40 65 55 Q 65 70 50 70 Q 58 60 58 50 Q 58 40 50 30" fill="url(#moon-grad)" />
      {/* Craters */}
      <circle cx="42" cy="45" r="2" fill="rgba(0,0,0,0.1)" />
      <circle cx="45" cy="58" r="1.5" fill="rgba(0,0,0,0.08)" />
      <circle cx="38" cy="55" r="1" fill="rgba(0,0,0,0.06)" />
      {/* Highlight */}
      <ellipse cx="44" cy="42" rx="3" ry="2" fill="rgba(255,255,255,0.3)" />
    </AvatarBase>
  );
}

// Comet
export function CometAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#FF6B9D", "#C44569"]} {...props}>
      <defs>
        <linearGradient id="comet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8FB3" />
          <stop offset="100%" stopColor="#E85580" />
        </linearGradient>
      </defs>
      {/* Comet body */}
      <circle cx="58" cy="48" r="10" fill="url(#comet-grad)" />
      {/* Tail layers */}
      <path d="M 48 48 Q 35 42 22 52 Q 35 48 48 48" fill="url(#comet-grad)" opacity="0.7" />
      <path d="M 48 48 Q 38 45 28 50 Q 38 48 48 48" fill="url(#comet-grad)" opacity="0.5" />
      <path d="M 48 48 Q 42 47 35 48 Q 42 48 48 48" fill="url(#comet-grad)" opacity="0.3" />
      {/* Highlight */}
      <circle cx="55" cy="45" r="3" fill="rgba(255,255,255,0.4)" />
    </AvatarBase>
  );
}

// Galaxy
export function GalaxyAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#7c5cff", "#ff4da6"]} {...props}>
      <defs>
        <radialGradient id="galaxy-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FFE5F0" />
          <stop offset="100%" stopColor="#FFB3D9" />
        </radialGradient>
      </defs>
      {/* Spiral arms */}
      <path d="M 50 55 Q 42 42 55 35 Q 68 28 62 45 Q 56 62 50 55" fill="rgba(255,150,200,0.6)" />
      <path d="M 50 55 Q 58 68 45 75 Q 32 82 38 65 Q 44 48 50 55" fill="rgba(150,100,255,0.5)" />
      {/* Center */}
      <circle cx="50" cy="55" r="7" fill="url(#galaxy-center)" />
      {/* Stars */}
      <circle cx="30" cy="35" r="1.2" fill="rgba(255,255,255,0.9)" />
      <circle cx="70" cy="40" r="1.5" fill="rgba(255,255,255,0.8)" />
      <circle cx="25" cy="70" r="1" fill="rgba(255,255,255,0.7)" />
      <circle cx="75" cy="75" r="1.2" fill="rgba(255,255,255,0.8)" />
    </AvatarBase>
  );
}

// Nebula
export function NebulaAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#00d4ff", "#6a5cff"]} {...props}>
      <defs>
        <radialGradient id="nebula-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#B8E6FF" />
          <stop offset="100%" stopColor="#9B8FFF" />
        </radialGradient>
      </defs>
      {/* Cloud layers */}
      <circle cx="50" cy="55" r="20" fill="url(#nebula-glow)" opacity="0.8" />
      <circle cx="42" cy="48" r="12" fill="rgba(255,255,255,0.25)" />
      <circle cx="60" cy="62" r="10" fill="rgba(180,150,255,0.2)" />
      {/* Stars */}
      <circle cx="32" cy="38" r="1.5" fill="rgba(255,255,255,0.9)" />
      <circle cx="68" cy="42" r="1" fill="rgba(255,255,255,0.8)" />
      <circle cx="28" cy="68" r="1.2" fill="rgba(255,255,255,0.7)" />
      <circle cx="72" cy="70" r="1.5" fill="rgba(255,255,255,0.8)" />
      {/* Center glow */}
      <circle cx="50" cy="55" r="6" fill="rgba(255,255,255,0.3)" />
    </AvatarBase>
  );
}