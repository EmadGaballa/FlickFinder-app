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

// Premium Minimalist Celestial Saturn
export function SaturnAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#0B0D1B", "#1E1B4B"]} {...props}>
      <defs>
        {/* Soft Matte Candy Planet Gradient (Peach -> Orange -> Coral) */}
        <linearGradient id="saturn-premium-body" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#FFEAD9" />
          <stop offset="45%" stopColor="#FFA37B" />
          <stop offset="100%" stopColor="#FF5E62" />
        </linearGradient>

        {/* Holographic Pastel Ring System Gradient */}
        <linearGradient id="saturn-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFAEE5" />
          <stop offset="35%" stopColor="#FFE49E" />
          <stop offset="70%" stopColor="#AEE2FF" />
          <stop offset="100%" stopColor="#C4B7FF" />
        </linearGradient>

        {/* Ring Glass-Edge Highlight */}
        <linearGradient id="saturn-ring-rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFF" stopOpacity="0.2" />
        </linearGradient>

        {/* Planet Ambient Aura Backlight */}
        <radialGradient id="saturn-aura" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#FF9E79" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF5E62" stopOpacity="0" />
        </radialGradient>

        {/* Premium UI Element Drop Shadow */}
        <filter id="saturn-depth-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#050510" floodOpacity="0.5" />
        </filter>

        {/* Fine Soft Shadow Cast by Rings onto Planet */}
        <filter id="ring-cast-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#450A0A" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* 1. Magical Ambient Space Environment (Sparkles & Stars) */}
      <g opacity="0.85">
        {/* Top-Left Magic Diamond Sparkle */}
        <path d="M 22 24 L 24 19 L 26 24 L 31 26 L 26 28 L 24 33 L 22 28 L 17 26 Z" fill="#FFF" opacity="0.9" />
        {/* Soft Background Glow Particles */}
        <circle cx="84" cy="26" r="2" fill="#FFE49E" />
        <circle cx="16" cy="74" r="1.5" fill="#FFAEE5" />
        {/* Small Bottom-Right Cross Sparkle */}
        <path d="M 78 76 L 80 73 L 82 76 L 85 78 L 82 80 L 80 83 L 78 80 L 75 78 Z" fill="#AEE2FF" opacity="0.7" />
      </g>

      {/* 2. Cohesive Tilted Planet & Ring System */}
      <g transform="rotate(-13, 50, 53)" filter="url(#saturn-depth-shadow)">
        
        {/* A. Back Section of the Rings (Curves behind the dome) */}
        <g opacity="0.92">
          {/* Outer Ring Ribbon */}
          <path d="M 6 53 A 44 14 0 0 1 94 53" fill="none" stroke="url(#saturn-ring-grad)" strokeWidth="7" strokeLinecap="round" />
          {/* Inner Floating Pin-Stripe Segment */}
          <path d="M 12 53 A 38 12 0 0 1 88 53" fill="none" stroke="url(#saturn-ring-rim)" strokeWidth="1.5" opacity="0.6" />
        </g>

        {/* B. Soft Outer Atmospheric Glow Overlay */}
        <ellipse cx="50" cy="53" rx="27" ry="24" fill="url(#saturn-aura)" />

        {/* C. Squashed Planet Body (Premium Candy/Enamel Texture) */}
        <ellipse cx="50" cy="53" rx="23" ry="20.5" fill="url(#saturn-premium-body)" />

        {/* Elegant Subtle Planet Surface Shading Bands */}
        <path d="M 28 47 Q 50 51.5 72 47" stroke="#FF5E62" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.25" />
        <path d="M 29 59 Q 50 63.5 71 59" stroke="#FFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.2" />

        {/* D. Ring Cast Shadow (Projects depth directly onto the lower half of the planet) */}
        <path d="M 94 53 A 44 14 0 0 1 6 53" fill="none" stroke="#000" strokeWidth="5" opacity="0.12" filter="url(#ring-cast-shadow)" />

        {/* E. Front Section of the Rings (Wraps snugly across the lower third) */}
        <g opacity="0.95">
          {/* Main Thick Holographic Ribbon */}
          <path d="M 94 53 A 44 14 0 0 1 6 53" fill="none" stroke="url(#saturn-ring-grad)" strokeWidth="7" strokeLinecap="round" />
          {/* High-Gloss Glass Core Overlay */}
          <path d="M 88 53 A 38 12 0 0 1 12 53" fill="none" stroke="url(#saturn-ring-rim)" strokeWidth="1.75" strokeLinecap="round" />
        </g>

        {/* F. Premium Upper-Left Specular Gloss Highlight */}
        <ellipse cx="41" cy="38" rx="7.5" ry="3.5" fill="#FFF" opacity="0.38" transform="rotate(-8, 41, 38)" />
      </g>

      {/* 3. Tiny Floating Minimalist Companion Moon */}
      <g filter="url(#saturn-depth-shadow)">
        <circle cx="79" cy="65" r="4" fill="#FFF2DF" />
        {/* Soft ambient gradient match on moonlet */}
        <circle cx="79" cy="65" r="4" fill="url(#saturn-premium-body)" opacity="0.15" />
      </g>
    </AvatarBase>
  );
}







// Premium Celestial Stars Cluster
export function StarsAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#0A0B1A", "#161233"]} {...props}>
      <defs>
        {/* Core Majestic Star: Warm Buttercream to Rich Amber Gold */}
        <linearGradient id="star-grand-grad" x1="15%" y1="15%" x2="85%" y2="85%">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="40%" stopColor="#FDE047" />
          <stop offset="75%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#A16207" />
        </linearGradient>

        {/* Companion Star: Whimsical Pastel Rose to Cosmic Lilac */}
        <linearGradient id="star-luna-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE4E6" />
          <stop offset="50%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>

        {/* Minor Star: Crystal Aurora Cyan */}
        <linearGradient id="star-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        {/* Soft Volumetric Etherial Trail Gradient */}
        <linearGradient id="orbit-trail" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F472B6" stopOpacity="0.6" />
        </linearGradient>

        {/* Ambient Volumetric Star Backlight Aura */}
        <radialGradient id="star-aura-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE047" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#EAB308" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#161233" stopOpacity="0" />
        </radialGradient>

        {/* Smooth Premium Drop Shadow for Floating Sticker Depth */}
        <filter id="premium-depth" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#020208" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* 1. Ambient Background Space Field */}
      <g opacity="0.6">
        <circle cx="22" cy="28" r="1" fill="#FFF" opacity="0.4" />
        <circle cx="80" cy="22" r="1.5" fill="#FFE4E6" opacity="0.5" />
        <circle cx="78" cy="76" r="1" fill="#38BDF8" opacity="0.4" />
        <circle cx="18" cy="72" r="2" fill="#FFF" opacity="0.3" />
      </g>

      {/* 2. Deep Volumetric Background Aura Glow */}
      <circle cx="45" cy="43" r="35" fill="url(#star-aura-glow)" />

      {/* 3. High-End Cosmic Dust Orbit Loop (Weaves around the composition) */}
      <g filter="url(#premium-depth)">
        <ellipse 
          cx="48" 
          cy="48" 
          rx="38" 
          ry="11" 
          fill="none" 
          stroke="url(#orbit-trail)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          transform="rotate(-28, 48, 48)" 
        />
      </g>

      {/* 4. Layered Premium Constellation Grouping */}
      <g filter="url(#premium-depth)">
        
        {/* A. Companion Star (Medium - Bottom Right) */}
        <path 
          d="M 66 46 Q 66 60 80 60 Q 66 60 66 74 Q 66 60 52 60 Q 66 60 66 46 Z" 
          fill="url(#star-luna-grad)" 
        />
        {/* Soft light reflection on companion */}
        <path 
          d="M 66 50 Q 66 60 76 60" 
          fill="none" 
          stroke="#FFF" 
          strokeWidth="1" 
          opacity="0.35" 
          strokeLinecap="round" 
        />

        {/* B. Minor Star (Small Sparkle - Left Ground) */}
        <path 
          d="M 26 57 Q 26 65 34 65 Q 26 65 26 73 Q 26 65 18 65 Q 26 65 26 57 Z" 
          fill="url(#star-cyan-grad)" 
        />

        {/* C. The Majestic Grand Star (Primary Focal Point) */}
        {/* Base Curvature Geometric Body */}
        <path 
          d="M 45 15 Q 45 43 73 43 Q 45 43 45 71 Q 45 43 17 43 Q 45 43 45 15 Z" 
          fill="url(#star-grand-grad)" 
        />

        {/* Premium Geometric Surface Facet (Adds chiseled, sleek 3D depth) */}
        <path 
          d="M 45 15 Q 45 43 73 43 Q 45 43 45 71 Z" 
          fill="#000" 
          opacity="0.06" 
        />

        {/* Top-Left Sophisticated Specular Gloss Highlight Overlay */}
        <path 
          d="M 45 18 Q 45 43 70 43" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          opacity="0.5" 
        />
        <path 
          d="M 45 23 Q 45 43 65 43" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="1" 
          strokeLinecap="round" 
          opacity="0.3" 
        />

        {/* Tiny Floating Light Bead Jewel on Orbit Track */}
        <circle cx="21" cy="38" r="1.5" fill="#FFF" filter="url(#premium-depth)" />
      </g>
    </AvatarBase>
  );
}





// Premium Full Celestial Moon Asset
export function MoonAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#080A18", "#141130"]} {...props}>
      <defs>
        {/* Pearlescent Full Moon Sphere Gradient (Glowing Cream -> Lavender -> Soft Periwinkle) */}
        <linearGradient id="moon-full-core" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF5" />
          <stop offset="30%" stopColor="#FFF5E4" />
          <stop offset="65%" stopColor="#D5CFFF" />
          <stop offset="100%" stopColor="#8C86CE" />
        </linearGradient>

        {/* Soft Volumetric Crater Rim & Shadow Gradients */}
        <linearGradient id="crater-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5B5394" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#9E94E4" stopOpacity="0.05" />
        </linearGradient>

        {/* Cosmic Stardust Trajectory Ring */}
        <linearGradient id="moon-dust-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
        </linearGradient>

        {/* Heavy Atmospheric Luminous Aura Backlight */}
        <radialGradient id="moon-full-glow" cx="50%" cy="50%" r="50%">
          <stop offset="30%" stopColor="#A5B4FC" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#818CF8" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#141130" stopOpacity="0" />
        </radialGradient>

        {/* Premium UI Element Drop Shadow */}
        <filter id="moon-heavy-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="4.5" floodColor="#020207" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* 1. Ambient Background Space Field */}
      <g opacity="0.85">
        <circle cx="18" cy="24" r="1" fill="#FFF" opacity="0.3" />
        <circle cx="84" cy="76" r="1.5" fill="#BAE6FD" opacity="0.4" />
        <circle cx="82" cy="26" r="2" fill="#FFE4E6" opacity="0.2" />
        {/* Tiny Cross Sparkle */}
        <path d="M 22 70 L 24 67 L 26 70 L 29 71 L 26 72 L 24 75 L 22 72 L 19 71 Z" fill="#FFF" opacity="0.4" />
      </g>

      {/* 2. Soft Background Volumetric Aura (Makes the full moon pop) */}
      <circle cx="50" cy="53" r="34" fill="url(#moon-full-glow)" />

      {/* 3. Cosmic Dust Ring Circuit (Weaves elegantly behind the moon sphere) */}
      <g filter="url(#moon-heavy-shadow)" opacity="0.75">
        <ellipse 
          cx="50" 
          cy="53" 
          rx="38" 
          ry="13" 
          fill="none" 
          stroke="url(#moon-dust-ring)" 
          strokeWidth="2" 
          strokeLinecap="round"
          transform="rotate(-15, 50, 53)" 
        />
      </g>

      {/* 4. The Premium Full Moon Sphere */}
      <g filter="url(#moon-heavy-shadow)">
        {/* Core Volumetric Round Body (Slightly squashed for that premium toy asset look) */}
        <ellipse cx="50" cy="53" rx="23" ry="21.5" fill="url(#moon-full-core)" />

        {/* 5. Minimalist Deluxe Dimensional Craters (Smoothed out and organic) */}
        <g id="full-moon-craters">
          {/* Crater A (Top Left) */}
          <ellipse cx="40" cy="44" rx="4" ry="3" fill="url(#crater-dark)" />
          <ellipse cx="40" cy="44.5" rx="4" ry="3" stroke="#FFF" strokeWidth="0.4" fill="none" opacity="0.2" />
          
          {/* Crater B (Bottom Right Large) */}
          <ellipse cx="61" cy="61" rx="5" ry="3.8" fill="url(#crater-dark)" transform="rotate(5, 61, 61)" />
          <ellipse cx="61" cy="61.5" rx="5" ry="3.8" stroke="#FFF" strokeWidth="0.5" fill="none" opacity="0.15" transform="rotate(5, 61, 61)" />

          {/* Crater C (Middle Small) */}
          <ellipse cx="52" cy="50" rx="2.5" ry="2" fill="url(#crater-dark)" />

          {/* Crater D (Bottom Left Medium) */}
          <ellipse cx="42" cy="62" rx="3" ry="2.2" fill="url(#crater-dark)" />
          <ellipse cx="42" cy="62.3" rx="3" ry="2.2" stroke="#FFF" strokeWidth="0.4" fill="none" opacity="0.15" />

          {/* Crater E (Top Right Tiny) */}
          <ellipse cx="59" cy="42" rx="2" ry="1.5" fill="url(#crater-dark)" />
        </g>

        {/* Subtle Surface Contour Shading Lines */}
        <path d="M 32 46 Q 50 50.5 68 46" stroke="#8C86CE" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.2" />
        <path d="M 30 59 Q 50 63.5 70 59" stroke="#FFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />

        {/* 6. Premium Upper-Left Specular Gloss Highlight Overlay */}
        <ellipse cx="41" cy="38" rx="8" ry="3.5" fill="#FFF" opacity="0.35" transform="rotate(-8, 41, 38)" />
      </g>

      {/* 7. Floating Magical Diamond Star Accent */}
      <g filter="url(#moon-heavy-shadow)">
        <path d="M 72 38 Q 72 44 78 44 Q 72 44 72 50 Q 72 44 66 44 Q 72 44 72 38 Z" fill="#FFFDF5" />
        {/* Soft underlying neon sparkle dot */}
        <circle cx="72" cy="44" r="1.5" fill="#C4B5FD" opacity="0.6" />
      </g>
    </AvatarBase>
  );
}








// Premium Celestial Comet Asset
export function CometAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#0A0625", "#131147"]} {...props}>
      <defs>
        {/* Core Nucleus Luminous Gradient (Supernova White -> Hot Magenta -> Deep Cosmic Rose) */}
        <linearGradient id="comet-core-grad" x1="30%" y1="10%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#FF9EE2" />
          <stop offset="70%" stopColor="#FF1A8B" />
          <stop offset="100%" stopColor="#8F054B" />
        </linearGradient>

        {/* Primary Fire/Dust Tail Gradient (Hyper-Saturated Pink to Transparent Purple) */}
        <linearGradient id="comet-dust-tail" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF2E93" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#D946EF" stopOpacity="0.6" />
          <stop offset="75%" stopColor="#6366F1" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#312E81" stopOpacity="0" />
        </linearGradient>

        {/* Secondary High-Energy Ion Tail Gradient (Electric Cyan Ice Streak) */}
        <linearGradient id="comet-ion-tail" x1="90%" y1="20%" x2="0%" y2="90%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
        </linearGradient>

        {/* Gaseous Coma Envelope Radial Glow */}
        <radialGradient id="comet-coma-glow" cx="65%" cy="35%" r="45%">
          <stop offset="0%" stopColor="#FF73C5" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#A855F7" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#131147" stopOpacity="0" />
        </radialGradient>

        {/* Specular High-Gloss Rim Light */}
        <linearGradient id="comet-specular" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>

        {/* Cinematic Blur Filter for Hyper-Speed Tails */}
        <filter id="motion-blur-sm" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>

        {/* Premium Drop Shadow for Object Depth */}
        <filter id="comet-depth-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="-3" dy="5" stdDeviation="4" floodColor="#02010A" floodOpacity="0.65" />
        </filter>
      </defs>

      {/* 1. Ambient Background Stars & Space Friction Sparks */}
      <g opacity="0.75">
        <circle cx="25" cy="20" r="1" fill="#FFF" opacity="0.3" />
        <circle cx="85" cy="80" r="1.5" fill="#38BDF8" opacity="0.4" />
        <circle cx="80" cy="25" r="1" fill="#FFF" opacity="0.2" />
        {/* Distant background galaxy dust */}
        <circle cx="45" cy="28" r="3" fill="#6366F1" opacity="0.15" filter="url(#motion-blur-sm)" />
      </g>

      {/* 2. Luminous Gas Coma (The atmospheric cloud surrounding the head) */}
      <circle cx="64" cy="36" r="28" fill="url(#comet-coma-glow)" />

      {/* 3. The Multi-Tiered Speed Tail System */}
      <g filter="url(#comet-depth-shadow)">
        
        {/* Layer A: Wide Outer Thermodynamic Dust Tail (Swept Curve) */}
        <path 
          d="M 68 27 C 55 24, 26 40, 16 76 C 36 64, 60 48, 72 43 Z" 
          fill="url(#comet-dust-tail)" 
        />

        {/* Layer B: Sharp High-Velocity Inner Ion Gas Stream (Electric Cyan) */}
        <path 
          d="M 66 31 C 56 31, 34 50, 24 82 C 40 68, 56 49, 68 39 Z" 
          fill="url(#url(#comet-ion-tail))" 
          opacity="0.9"
          mixBlendMode="screen"
        />
        {/* Fallback fill definition handling for deep SVG parsers */}
        <path 
          d="M 66 31 C 56 31, 34 50, 24 82 C 40 68, 56 49, 68 39 Z" 
          fill="url(#comet-ion-tail)" 
          opacity="0.8"
        />

        {/* Layer C: Core Thermal Friction Flare (Intense Hot Pink Center Stream) */}
        <path 
          d="M 64 33 Q 48 42, 32 74 Q 50 49, 66 39 Z" 
          fill="url(#comet-dust-tail)" 
          opacity="0.85" 
        />
      </g>

      {/* 4. Thermal Debris & Breakaway Star Sparks (Left in the comet's wake) */}
      <g opacity="0.9" filter="url(#comet-depth-shadow)">
        {/* Sparkle A */}
        <circle cx="42" cy="64" r="1.7" fill="#FF9EE2" />
        {/* Sparkle B */}
        <circle cx="28" cy="78" r="1.2" fill="#38BDF8" />
        {/* Sparkle C (Micro) */}
        <circle cx="53" cy="54" r="1" fill="#FFF" opacity="0.7" />
        
        {/* Micro-Meteorite Fragment breaking off */}
        <path 
          d="M 34 59 Q 31 63, 27 68 Q 32 64, 35 61 Z" 
          fill="url(#comet-dust-tail)" 
          opacity="0.7" 
        />
      </g>

      {/* 5. The Solid Crystallized Nucleus Head */}
      <g filter="url(#comet-depth-shadow)">
        {/* Core Volumetric Solid Spherical Rock */}
        <circle cx="64" cy="36" r="11" fill="url(#comet-core-grad)" />

        {/* Ice Crust Contour Ridge Line */}
        <path 
          d="M 55 39 Q 62 44, 72 39" 
          stroke="#8F054B" 
          strokeWidth="1" 
          strokeLinecap="round" 
          fill="none" 
          opacity="0.35" 
        />

        {/* 3D Curved Crest Shadow Face */}
        <path 
          d="M 53 36 C 54 44, 62 47, 72 42 C 64 41, 56 40, 53 36 Z" 
          fill="#312E81" 
          opacity="0.15" 
        />

        {/* Glassy Front Specular Highlight Overlay */}
        <ellipse 
          cx="60" 
          cy="31" 
          rx="4.5" 
          ry="2.5" 
          fill="url(#comet-specular)" 
          transform="rotate(-25, 60, 31)" 
        />
        
        {/* Tiny intense point-light reflection */}
        <circle cx="58.5" cy="29.5" r="0.8" fill="#FFF" opacity="0.9" />
      </g>

      {/* 6. Front Shockwave Diamond Star Accent */}
      <g filter="url(#comet-depth-shadow)">
        <path d="M 76 21 Q 76 26, 81 26 Q 76 26, 76 31 Q 76 26, 71 26 Q 76 26, 76 21 Z" fill="#FFFDF5" />
        <circle cx="76" cy="26" r="1" fill="#38BDF8" opacity="0.5" />
      </g>
    </AvatarBase>
  );
}







// Premium Celestial Galaxy Spiral Asset
export function GalaxyAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#060713", "#110E36"]} {...props}>
      <defs>
        {/* Core Supernova Nucleus: Pure Light out to Vibrant Solar Gold */}
        <radialGradient id="galaxy-supernova-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#FFF4D0" />
          <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </radialGradient>

        {/* Primary Spiral Arm Ribbon: Intense Cosmic Magenta to Deep Purple */}
        <linearGradient id="galaxy-arm-magenta" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#F472B6" />
          <stop offset="65%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#4338CA" stopOpacity="0" />
        </linearGradient>

        {/* Secondary Spiral Arm Ribbon: Icy Aqua Cyan to Midnight Blue */}
        <linearGradient id="galaxy-arm-cyan" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#22D3EE" />
          <stop offset="70%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
        </linearGradient>

        {/* Volumetric Gaseous Background Nebula Cloud */}
        <radialGradient id="nebula-ambient-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#6366F1" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#110E36" stopOpacity="0" />
        </radialGradient>

        {/* Soft Gauzy Blur for Interstellar Gas Fields */}
        <filter id="interstellar-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        {/* Premium Depth Shadow for the Layered Core */}
        <filter id="galaxy-depth-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#010207" floodOpacity="0.7" />
        </filter>
      </defs>

      {/* 1. Ambient Background Cosmic Starfield */}
      <g opacity="0.7">
        <circle cx="20" cy="30" r="1" fill="#FFF" opacity="0.4" />
        <circle cx="82" cy="24" r="1.2" fill="#22D3EE" opacity="0.5" />
        <circle cx="78" cy="78" r="1" fill="#FFF" opacity="0.3" />
        <circle cx="24" cy="74" r="1.5" fill="#F472B6" opacity="0.4" />
      </g>

      {/* 2. Deep Interstellar Background Nebula Dust */}
      <ellipse 
        cx="50" 
        cy="50" 
        rx="38" 
        ry="22" 
        fill="url(#nebula-ambient-glow)" 
        filter="url(#interstellar-blur)"
        transform="rotate(-28, 50, 50)" 
      />

      {/* 3. Main Tilted Galaxy Core Assembly */}
      <g transform="rotate(-28, 50, 50)" filter="url(#galaxy-depth-shadow)">
        
        {/* --- LAYER A: Trailing/Background Star Dust Paths --- */}
        <g opacity="0.4" filter="url(#interstellar-blur)">
          <path d="M 50 50 C 65 40, 85 55, 75 75" fill="none" stroke="#6366F1" strokeWidth="6" strokeLinecap="round" />
          <path d="M 50 50 C 35 60, 15 45, 25 25" fill="none" stroke="#EC4899" strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* --- LAYER B: Smooth Elegant Spiral Arms (Winding Ribbons) --- */}
        {/* Arm 1: The Magenta/Amethyst Arm */}
        <path 
          d="M 50 48 C 58 48, 70 54, 72 64 C 74 78, 54 84, 38 78 C 22 72, 12 52, 20 34 C 26 20, 46 12, 64 18" 
          fill="none" 
          stroke="url(#galaxy-arm-magenta)" 
          strokeWidth="3.2" 
          strokeLinecap="round" 
        />
        
        {/* Arm 2: The Electric Cyan/Sapphire Arm (Perfect 180° Balancing Spiral) */}
        <path 
          d="M 50 52 C 42 52, 30 46, 28 36 C 26 22, 46 16, 62 22 C 78 28, 88 48, 80 66 C 74 80, 54 88, 36 82" 
          fill="none" 
          stroke="url(#galaxy-arm-cyan)" 
          strokeWidth="2.8" 
          strokeLinecap="round" 
        />

        {/* --- LAYER C: Star Condensations & Clusters embedded along the paths --- */}
        <g opacity="0.85">
          {/* Magenta Arm Beads */}
          <circle cx="66" cy="56" r="1.2" fill="#FFF" />
          <circle cx="62" cy="72" r="1.5" fill="#FFE4E6" />
          <circle cx="44" cy="78" r="1" fill="#FFF" />
          <circle cx="24" cy="62" r="1.3" fill="#F472B6" />
          
          {/* Cyan Arm Beads */}
          <circle cx="34" cy="44" r="1.2" fill="#FFF" />
          <circle cx="38" cy="28" r="1.6" fill="#E0F7FA" />
          <circle cx="56" cy="22" r="1" fill="#FFF" />
          <circle cx="76" cy="38" r="1.4" fill="#22D3EE" />
        </g>

        {/* --- LAYER D: High-Intensity Central Galactic Nucleus --- */}
        {/* Wide Volumetric Gravitational Core Glow */}
        <circle cx="50" cy="50" r="12" fill="url(#galaxy-supernova-core)" />
        
        {/* Crisp Central Star-Burst Bead */}
        <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" />
        
        {/* Tiny high-gloss intense point-light anchor */}
        <circle cx="49" cy="49" r="1" fill="#FFF" />
      </g>

      {/* 4. Foreground High-End Diamond Star Anchor (Frames the layout) */}
      <g filter="url(#galaxy-depth-shadow)">
        <path d="M 74 26 Q 74 32, 80 32 Q 74 32, 74 38 Q 74 32, 68 32 Q 74 32, 74 26 Z" fill="#FFFFFF" />
        <circle cx="74" cy="32" r="1" fill="#22D3EE" opacity="0.6" />
      </g>
    </AvatarBase>
  );
}








// Premium Celestial Nebula Asset
export function NebulaAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#050414", "#120B29"]} {...props}>
      <defs>
        {/* Deep Background Plasma Layer (Deep Indigo to Twilight Violet) */}
        <radialGradient id="nebula-base-plasma" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4338CA" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#2E1065" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#120B29" stopOpacity="0" />
        </radialGradient>

        {/* Hot High-Energy Gas Layer: Vibrant Fuchsia/Magenta */}
        <linearGradient id="nebula-gas-magenta" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="10%" stopColor="#F472B6" stopOpacity="0.75" />
          <stop offset="60%" stopColor="#D946EF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#4C1D95" stopOpacity="0" />
        </linearGradient>

        {/* Cold Ionized Gas Ridge Layer: Magical Aurora Teal/Cyan */}
        <linearGradient id="nebula-gas-teal" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#0D9488" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#111827" stopOpacity="0" />
        </linearGradient>

        {/* Central Stellar Hatchery Ignition Center (Pure White to Glowing Cream) */}
        <radialGradient id="nebula-core-ignition" cx="48%" cy="48%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="35%" stopColor="#FEF08A" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#120B29" stopOpacity="0" />
        </radialGradient>

        {/* Heavy Atmospheric Blur to make standard vector paths look gaseous */}
        <filter id="cosmic-gas-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>

        {/* Medium Blur for secondary structural definition */}
        <filter id="mid-gas-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>

        {/* Premium Depth Shadow for foreground infant stars */}
        <filter id="nebula-star-depth" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#010105" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* 1. Deep Space Ambient Starfield */}
      <g opacity="0.65">
        <circle cx="16" cy="28" r="1" fill="#FFF" opacity="0.4" />
        <circle cx="84" cy="34" r="1.5" fill="#22D3EE" opacity="0.5" />
        <circle cx="76" cy="74" r="1" fill="#FFF" opacity="0.3" />
        <circle cx="22" cy="78" r="1.2" fill="#F472B6" opacity="0.4" />
      </g>

      {/* 2. Base Plasma Foundation Glow */}
      <circle cx="50" cy="50" r="35" fill="url(#nebula-base-plasma)" />

      {/* 3. The Fluid Volumetric Nebula Cloud Formations */}
      {/* Layer A: Deep Organic Wavy Core (Teal Side) */}
      <path 
        d="M 28 42 C 32 22, 68 26, 74 38 C 80 50, 72 74, 54 70 C 36 66, 24 62, 28 42 Z" 
        fill="url(#nebula-gas-teal)" 
        filter="url(#cosmic-gas-blur)" 
      />

      {/* Layer B: Intersecting Thermodynamic Cloud (Magenta Side) */}
      <path 
        d="M 34 58 C 24 40, 48 30, 66 42 C 84 54, 76 68, 62 74 C 48 80, 44 76, 34 58 Z" 
        fill="url(#nebula-gas-magenta)" 
        filter="url(#cosmic-gas-blur)" 
      />

      {/* Layer C: High-Density Gaseous Filaments & Tendrils (Sharper Definition) */}
      <g filter="url(#mid-gas-blur)" opacity="0.85">
        {/* Swirling inner dust lane filament 1 */}
        <path d="M 35 46 Q 52 36, 68 52" fill="none" stroke="#67E8F9" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
        {/* Swirling inner dust lane filament 2 */}
        <path d="M 32 54 Q 48 68, 64 56" fill="none" stroke="#F06292" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* Layer D: Core Stellar Nursery Ignition Center */}
      <circle cx="48" cy="50" r="16" fill="url(#nebula-core-ignition)" filter="url(#cosmic-gas-blur)" />
      <circle cx="48" cy="50" r="7" fill="url(#nebula-core-ignition)" filter="url(#mid-gas-blur)" />

      {/* 4. Embedded Newborn Stars (Hatching inside the nebula cloud) */}
      <g filter="url(#nebula-star-depth)">
        
        {/* Infant Protostar A (Primary Center-Left Sparkle) */}
        <path 
          d="M 44 44 Q 44 49, 49 49 Q 44 49, 44 54 Q 44 49, 39 49 Q 44 49, 44 44 Z" 
          fill="#FFFFFF" 
        />
        <circle cx="44" cy="49" r="1" fill="#FFF" />
        
        {/* Infant Protostar B (Secondary Minor Top-Right Sparkle) */}
        <path 
          d="M 58 38 Q 58 42, 62 42 Q 58 42, 58 46 Q 58 42, 54 42 Q 58 42, 58 38 Z" 
          fill="#E0F7FA" 
          opacity="0.9"
        />

        {/* Tiny Floating Diamond Jewel Accent (Foreground Anchor) */}
        <path 
          d="M 28 32 Q 28 36, 32 36 Q 28 36, 28 40 Q 28 36, 24 36 Q 28 36, 28 32 Z" 
          fill="#FFFDF5" 
          opacity="0.85"
        />
        <circle cx="28" cy="36" r="0.8" fill="#22D3EE" opacity="0.5" />
      </g>
    </AvatarBase>
  );
}