import React from "react";
import { AvatarBase } from "./AvatarBase";

/**
 * ============================================================
 * Premium Mask Avatars
 * ============================================================
 * Collectible, premium mascot-style icons with minimalist
 * SVG language. Cute rather than intimidating. Apple app
 * icon quality.
 * ============================================================
 */

// Ninja Mask
export function NinjaAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#2C3E50", "#1a252f"]} {...props}>
      <defs>
        <linearGradient id="ninja-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34495E" />
          <stop offset="100%" stopColor="#2C3E50" />
        </linearGradient>
      </defs>
      {/* Head wrap */}
      <path d="M 28 45 Q 50 25 72 45 L 70 65 Q 50 75 30 65 Z" fill="url(#ninja-grad)" />
      {/* Face opening */}
      <ellipse cx="50" cy="55" rx="14" ry="16" fill="#1a252f" />
      {/* Eyes - friendly slits */}
      <path d="M 40 52 L 46 54 L 40 56" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M 60 52 L 54 54 L 60 56" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Headband */}
      <rect x="28" y="42" width="44" height="6" rx="2" fill="#E74C3C" />
      {/* Highlight */}
      <path d="M 32 42 L 38 40" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
    </AvatarBase>
  );
}

// Samurai Mask
export function SamuraiAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#DC3545", "#7F1D1D"]} {...props}>
      <defs>
        <linearGradient id="samurai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E85565" />
          <stop offset="100%" stopColor="#A3152D" />
        </linearGradient>
      </defs>
      {/* Helmet base */}
      <path d="M 30 45 Q 50 25 70 45 L 68 60 Q 50 70 32 60 Z" fill="url(#samurai-grad)" />
      {/* Crest */}
      <path d="M 50 25 L 53 15 L 50 20 L 47 15 Z" fill="rgba(220,220,220,0.9)" />
      {/* Face guard */}
      <rect x="38" y="52" width="24" height="14" rx="3" fill="rgba(180,180,180,0.25)" />
      {/* Eye openings */}
      <path d="M 42 55 L 48 57 L 42 59" stroke="rgba(0,0,0,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M 58 55 L 52 57 L 58 59" stroke="rgba(0,0,0,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Highlight */}
      <path d="M 35 42 L 40 40" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
    </AvatarBase>
  );
}

// Oni Mask
export function OniAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#E74C3C", "#C0392B"]} {...props}>
      <defs>
        <linearGradient id="oni-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC7063" />
          <stop offset="100%" stopColor="#D63031" />
        </linearGradient>
      </defs>
      {/* Mask base */}
      <path d="M 28 45 Q 50 25 72 45 L 70 68 Q 50 78 30 68 Z" fill="url(#oni-grad)" />
      {/* Horns */}
      <path d="M 35 35 L 32 22 L 40 32" fill="#2C3E50" />
      <path d="M 65 35 L 68 22 L 60 32" fill="#2C3E50" />
      {/* Eyes - round and friendly */}
      <circle cx="42" cy="52" r="4" fill="#FFFFFF" />
      <circle cx="58" cy="52" r="4" fill="#FFFFFF" />
      <circle cx="42" cy="52" r="2.5" fill="#2C3E50" />
      <circle cx="58" cy="52" r="2.5" fill="#2C3E50" />
      {/* Smile */}
      <path d="M 42 62 Q 50 68 58 62" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Highlight */}
      <path d="M 32 42 L 38 40" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
    </AvatarBase>
  );
}

// Cyberpunk Mask
export function CyberpunkAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#00F5FF", "#0A0E27"]} {...props}>
      <defs>
        <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#33F7FF" />
          <stop offset="100%" stopColor="#1A1F4E" />
        </linearGradient>
      </defs>
      {/* Mask base */}
      <path d="M 28 45 Q 50 28 72 45 L 70 65 Q 50 75 30 65 Z" fill="url(#cyber-grad)" />
      {/* Visor */}
      <rect x="35" y="50" width="30" height="12" rx="4" fill="#0A0E27" />
      {/* Eyes - glowing */}
      <rect x="40" y="53" width="8" height="6" rx="2" fill="#00F5FF" />
      <rect x="52" y="53" width="8" height="6" rx="2" fill="#00F5FF" />
      {/* Mouth vent */}
      <rect x="44" y="66" width="12" height="3" rx="1" fill="#0A0E27" />
      {/* Circuit lines */}
      <path d="M 32 48 L 35 50" stroke="rgba(0,245,255,0.6)" strokeWidth="1" strokeLinecap="round" />
      <path d="M 68 48 L 65 50" stroke="rgba(0,245,255,0.6)" strokeWidth="1" strokeLinecap="round" />
      {/* Highlight */}
      <path d="M 32 42 L 38 40" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
    </AvatarBase>
  );
}

// Masquerade Helmet
export function MasqueradeAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#9B59B6", "#4A235A"]} {...props}>
      <defs>
        <linearGradient id="mask-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BB8FCE" />
          <stop offset="100%" stopColor="#7D3C98" />
        </linearGradient>
      </defs>
      {/* Mask base */}
      <path d="M 28 42 Q 50 28 72 42 L 70 62 Q 50 72 30 62 Z" fill="url(#mask-grad)" />
      {/* Decorative top */}
      <path d="M 45 28 L 50 20 L 55 28" fill="rgba(255,255,255,0.3)" />
      {/* Eye holes - elegant curves */}
      <path d="M 38 50 Q 44 47 50 50 Q 44 53 38 50" fill="#2C3E50" />
      <path d="M 62 50 Q 56 47 50 50 Q 56 53 62 50" fill="#2C3E50" />
      {/* Nose bridge */}
      <path d="M 50 50 L 50 58" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      {/* Highlight */}
      <path d="M 32 40 L 38 38" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
    </AvatarBase>
  );
}

// Skull Mask
export function SkullAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#BDC3C7", "#7F8C8D"]} {...props}>
      <defs>
        <linearGradient id="skull-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D5DBDB" />
          <stop offset="100%" stopColor="#AAB7B8" />
        </linearGradient>
      </defs>
      {/* Skull shape */}
      <path d="M 28 45 Q 28 28 50 28 Q 72 28 72 45 L 70 62 Q 50 72 30 62 Z" fill="url(#skull-grad)" />
      {/* Eye sockets - cute round */}
      <circle cx="42" cy="48" r="5" fill="#2C3E50" />
      <circle cx="58" cy="48" r="5" fill="#2C3E50" />
      {/* Eye highlights */}
      <circle cx="40" cy="46" r="1.5" fill="rgba(255,255,255,0.6)" />
      <circle cx="56" cy="46" r="1.5" fill="rgba(255,255,255,0.6)" />
      {/* Nose */}
      <path d="M 48 55 L 50 58 L 52 55" fill="#2C3E50" />
      {/* Teeth */}
      <rect x="42" y="62" width="4" height="5" rx="1" fill="#2C3E50" />
      <rect x="48" y="62" width="4" height="5" rx="1" fill="#2C3E50" />
      <rect x="54" y="62" width="4" height="5" rx="1" fill="#2C3E50" />
      {/* Highlight */}
      <ellipse cx="44" cy="38" rx="4" ry="3" fill="rgba(255,255,255,0.3)" />
    </AvatarBase>
  );
}