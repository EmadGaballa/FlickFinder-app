import React from "react";
import { AvatarBase } from "./AvatarBase";

/**
 * ============================================================
 * Premium Geometry Avatars
 * ============================================================
 * Abstract geometric shapes with depth, lighting, and elegant
 * gradients. Apple app icon quality.
 * ============================================================
 */
// Premium Abstract Identity: Intuition & Focus
export function ReuleauxAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#0C0721", "#1B143F"]} {...props}>
      <defs>
        {/* Core Enamel Gradient: Radiant Coral Pink -> Cosmic Orchid -> Mystic Ultraviolet */}
        <linearGradient
          id="reuleaux-premium-core"
          x1="15%"
          y1="10%"
          x2="85%"
          y2="90%"
        >
          <stop offset="0%" stopColor="#FF6BA5" />
          <stop offset="45%" stopColor="#B366FF" />
          <stop offset="100%" stopColor="#4929A3" />
        </linearGradient>

        {/* Ambient Energy Field Backlight */}
        <radialGradient id="reuleaux-aura" cx="50%" cy="50%" r="50%">
          <stop offset="20%" stopColor="#A855F7" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#6366F1" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#1B143F" stopOpacity="0" />
        </radialGradient>

        {/* High-Gloss Edge Specular Track */}
        <linearGradient
          id="reuleaux-rim-glow"
          x1="30%"
          y1="10%"
          x2="60%"
          y2="90%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Soft Glass Reflection Mask Overlay */}
        <linearGradient
          id="reuleaux-glass-sheen"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Premium UI Element Drop Shadow for 3D Float */}
        <filter
          id="reuleaux-depth-shadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="4.5"
            floodColor="#010105"
            floodOpacity="0.65"
          />
        </filter>
      </defs>

      {/* 1. Background Aura Layer (Energy Field) */}
      <circle cx="50" cy="49" r="35" fill="url(#reuleaux-aura)" />

      {/* 2. Secondary Motion Layers (Resonant Flow Orbits) */}
      <g opacity="0.6" filter="url(#reuleaux-depth-shadow)">
        {/* Outer concentric resonance track */}
        <path
          d="M 50 14 C 74 14, 88 46, 74 72 C 60 98, 40 98, 26 72 C 12 46, 26 14, 50 14 Z"
          fill="none"
          stroke="#B366FF"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.4"
        />
        {/* Elegant fluid swoop cradling the left flank */}
        <path
          d="M 22 36 C 14 54, 26 78, 48 84"
          fill="none"
          stroke="#FF6BA5"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>

      {/* 3. Primary Abstract Shape (Identity Core) */}
      <g filter="url(#reuleaux-depth-shadow)">
        {/* True Mathematically Balanced Reuleaux Curved Triangular Geometry */}
        <path
          d="M 50 24 C 66 32, 78 50, 76 68 C 64 78, 36 78, 24 68 C 22 50, 34 32, 50 24 Z"
          fill="url(#reuleaux-premium-core)"
        />

        {/* 4. Layered Depth Face (Chiseled Inner Core Dimensionality) */}
        <path
          d="M 50 24 C 54 36, 68 62, 76 68 C 64 72, 36 72, 24 68 C 32 62, 46 36, 50 24 Z"
          fill="#1E124C"
          opacity="0.18"
        />

        {/* 5. Highlight Layers (Glass Reflection / Specular Rim) */}
        {/* Razor-Crisp Specular Edge Light Track */}
        <path
          d="M 50 25 C 65 33, 76 49, 75 66"
          fill="none"
          stroke="url(#reuleaux-rim-glow)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Top-Left Pillow Sheen Soft Highlight Overlay */}
        <path
          d="M 50 27 C 60 33, 69 45, 68 56 C 58 52, 42 40, 50 27 Z"
          fill="url(#reuleaux-glass-sheen)"
          opacity="0.9"
        />
        <circle cx="44" cy="38" r="1.5" fill="#FFFFFF" opacity="0.4" />
      </g>

      {/* 6. Micro Particles (Intuition Sparks) */}
      <g opacity="0.85">
        <circle cx="78" cy="34" r="1.2" fill="#FF6BA5" />
        <circle cx="20" cy="58" r="1.5" fill="#B366FF" />
        <circle cx="52" cy="76" r="1" fill="#FFFFFF" opacity="0.7" />

        {/* Central Core Signal Node */}
        <circle
          cx="50"
          cy="51"
          r="2.5"
          fill="#FFFFFF"
          filter="url(#reuleaux-depth-shadow)"
        />
        <circle cx="50" cy="51" r="1" fill="#B366FF" />
      </g>
    </AvatarBase>
  );
}

// Premium Abstract Identity: Flow & Adaptability
export function FluidCurvesAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#040316", "#0B113A"]} {...props}>
      <defs>
        {/* Iridescent Liquid Gradient: Neon Mint -> Electric Aqua -> Deep Indigo Violet */}
        <linearGradient
          id="fluid-premium-core"
          x1="0%"
          y1="30%"
          x2="100%"
          y2="70%"
        >
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="25%" stopColor="#06B6D4" />
          <stop offset="65%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#3730A3" />
        </linearGradient>

        {/* Secondary Secondary Ribbon Gradient: Hot Pink to Soft Purple */}
        <linearGradient
          id="fluid-sub-stream"
          x1="100%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0B113A" stopOpacity="0" />
        </linearGradient>

        {/* Deep Background Liquid Luminescence Aura */}
        <radialGradient id="fluid-ambient-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#6366F1" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0B113A" stopOpacity="0" />
        </radialGradient>

        {/* High-Gloss Liquid Surface Rim Light */}
        <linearGradient
          id="fluid-rim-sheen"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Volumetric Drop Shadow for Overlapping Folds */}
        <filter
          id="fluid-depth-shadow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="-1"
            dy="5"
            stdDeviation="4"
            floodColor="#010107"
            floodOpacity="0.65"
          />
        </filter>

        {/* Soft Ethereal Glow for Undercurrent Ripples */}
        <filter
          id="fluid-ripple-blur"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* 1. Background Aura Layer (Liquid Energy Field) */}
      <circle cx="50" cy="50" r="36" fill="url(#fluid-ambient-aura)" />

      {/* 2. Secondary Motion Layers (Undercurrent Resonance Ripples) */}
      <g filter="url(#fluid-ripple-blur)" opacity="0.45">
        {/* Lower echoing current wave */}
        <path
          d="M 20 62 C 30 74, 52 78, 68 64 C 84 50, 82 32, 64 26"
          fill="none"
          stroke="url(#fluid-sub-stream)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Upper echoing current wave */}
        <path
          d="M 32 24 C 50 14, 74 24, 82 44"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>

      {/* 3. Primary Abstract Shape (The Overlapping Snaky Core Spline) */}
      <g filter="url(#fluid-depth-shadow)">
        {/* Deep Background loop of the snake structure */}
        <path
          d="M 24 54 C 20 36, 36 22, 54 24 C 74 26, 82 46, 72 64 C 64 78, 42 78, 34 62"
          fill="none"
          stroke="url(#fluid-premium-core)"
          strokeWidth="11"
          strokeLinecap="round"
        />

        {/* Foreground sweeping crossover ribbon (Creates the 3D optical overlapping depth) */}
        <path
          d="M 34 62 C 28 50, 36 36, 50 38 C 66 40, 70 54, 58 66 C 48 74, 34 68, 30 52"
          fill="none"
          stroke="url(#fluid-premium-core)"
          strokeWidth="11"
          strokeLinecap="round"
        />
      </g>

      {/* 4. Highlight Layer (3D Glass Sheen & Wet Highlights) */}
      <g filter="url(#fluid-depth-shadow)">
        {/* Outer Loop Crisp Specular Ridge */}
        <path
          d="M 26 44 C 25 32, 38 24, 52 26 C 68 28, 76 44, 70 58"
          fill="none"
          stroke="url(#fluid-rim-sheen)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* Inner Foreground Loop Crisp Specular Ridge */}
        <path
          d="M 36 54 C 34 44, 40 39, 48 40 C 58 41, 62 50, 56 60"
          fill="none"
          stroke="url(#fluid-rim-sheen)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Soft Wet Surface Pillow Reflections */}
        <ellipse
          cx="48"
          cy="29"
          rx="4"
          ry="1.5"
          fill="#FFFFFF"
          opacity="0.25"
          transform="rotate(-15, 48, 29)"
        />
        <ellipse
          cx="64"
          cy="42"
          rx="3"
          ry="1"
          fill="#FFFFFF"
          opacity="0.2"
          transform="rotate(35, 64, 42)"
        />
      </g>

      {/* 5. Micro Particles (Suspended Fluid Condensations) */}
      <g opacity="0.9">
        {/* Tiny trailing fluid droplets following the snaky momentum */}
        <circle
          cx="78"
          cy="32"
          r="2"
          fill="#10B981"
          filter="url(#fluid-depth-shadow)"
        />
        <circle cx="78" cy="32" r="0.7" fill="#FFF" />

        <circle cx="20" cy="68" r="1.5" fill="#06B6D4" />
        <circle cx="44" cy="78" r="1" fill="#6366F1" />
        <circle cx="54" cy="52" r="1.2" fill="#FFFFFF" opacity="0.6" />
        <circle cx="32" cy="20" r="1" fill="#FFFFFF" opacity="0.4" />
      </g>
    </AvatarBase>
  );
}

// Premium Abstract Identity: Logic & Complexity
export function HexaflexagonAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#050518", "#0F0F35"]} {...props}>
      <defs>
        {/* Enamel Facet Gradient A: Kinetic Coral Pink to Deep Rose */}
        <linearGradient id="hexa-grad-warm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7EA5" />
          <stop offset="100%" stopColor="#D12E5F" />
        </linearGradient>

        {/* Enamel Facet Gradient B: Royal Amethyst to Velvet Purple */}
        <linearGradient
          id="hexa-grad-mystic"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#6325C4" />
        </linearGradient>

        {/* Enamel Facet Gradient C: Electric Sapphire to Deep Ocean */}
        <linearGradient id="hexa-grad-cool" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>

        {/* Ambient Mathematical Energy Backlight */}
        <radialGradient id="hexa-ambient-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
          <stop offset="65%" stopColor="#1D4ED8" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0F0F35" stopOpacity="0" />
        </radialGradient>

        {/* High-Gloss Diagonal Sheen Overlay */}
        <linearGradient
          id="hexa-glass-sheen"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Premium UI Component Drop Shadow */}
        <filter
          id="hexa-depth-shadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="4"
            floodColor="#010106"
            floodOpacity="0.7"
          />
        </filter>
      </defs>

      {/* 1. Background Aura Layer (Energy Field) */}
      <circle cx="50" cy="50" r="36" fill="url(#hexa-ambient-glow)" />

      {/* 2. Secondary Motion Layers (Folding Grid & Mathematical Resonance) */}
      <g opacity="0.25">
        {/* Out-of-phase background alignment matrix */}
        <polygon
          points="50 18, 77.7 34, 77.7 66, 50 82, 22.3 66, 22.3 34"
          fill="none"
          stroke="#60A5FA"
          strokeWidth="1"
          transform="rotate(15, 50, 50)"
        />
        <polygon
          points="50 20, 76 35, 76 65, 50 80, 24 65, 24 35"
          fill="none"
          stroke="#7C3AED"
          strokeWidth="1.2"
          strokeDasharray="3 5"
          transform="rotate(-10, 50, 50)"
        />
      </g>

      {/* 3. Primary Abstract Shape (The Interlocking Hexaflexagon Core) */}
      <g filter="url(#hexa-depth-shadow)">
        {/* Facet 1: Top Right */}
        <path
          d="M 50 50 L 50 26 L 70.8 38 Z"
          fill="url(#hexa-grad-warm)"
          stroke="url(#hexa-grad-warm)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Facet 2: Right */}
        <path
          d="M 50 50 L 70.8 38 L 70.8 62 Z"
          fill="url(#hexa-grad-mystic)"
          stroke="url(#hexa-grad-mystic)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Facet 3: Bottom Right */}
        <path
          d="M 50 50 L 70.8 62 L 50 74 Z"
          fill="url(#hexa-grad-cool)"
          stroke="url(#hexa-grad-cool)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Facet 4: Bottom Left */}
        <path
          d="M 50 50 L 50 74 L 29.2 62 Z"
          fill="url(#hexa-grad-warm)"
          stroke="url(#hexa-grad-warm)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Facet 5: Left */}
        <path
          d="M 50 50 L 29.2 62 L 29.2 38 Z"
          fill="url(#hexa-grad-mystic)"
          stroke="url(#hexa-grad-mystic)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Facet 6: Top Left */}
        <path
          d="M 50 50 L 29.2 38 L 50 26 Z"
          fill="url(#hexa-grad-cool)"
          stroke="url(#hexa-grad-cool)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </g>

      {/* 4. Highlight Layer (Glass Enamel Sheen & Specular Track) */}
      <g filter="url(#hexa-depth-shadow)" pointerEvents="none">
        {/* Overall Diagonal Light Sheen Split across the upper geometry */}
        <path
          d="M 29.2 38 L 50 26 L 70.8 38 L 50 50 Z"
          fill="url(#hexa-glass-sheen)"
          opacity="0.85"
        />

        {/* Ultra-Fine White Specular Edge Light on Top Ridges */}
        <path
          d="M 29.2 37.5 L 50 25.5 L 70.8 37.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.4"
        />
      </g>

      {/* 5. Micro Particles & Logic Nodes (Suspended Fragments) */}
      <g opacity="0.9">
        {/* Peripheral floating data nodes */}
        <circle
          cx="50"
          cy="14"
          r="1.5"
          fill="#FF7EA5"
          filter="url(#hexa-depth-shadow)"
        />
        <circle cx="82" cy="32" r="1" fill="#C084FC" />
        <circle cx="82" cy="68" r="1.2" fill="#60A5FA" />
        <circle cx="18" cy="64" r="1.5" fill="#FF7EA5" />
        <circle cx="18" cy="36" r="1" fill="#FFFFFF" opacity="0.5" />

        {/* Glowing Central Intersection Core Anchor */}
        <circle
          cx="50"
          cy="50"
          r="3.5"
          fill="#FFFFFF"
          filter="url(#hexa-depth-shadow)"
        />
        <circle cx="50" cy="50" r="1.2" fill="#7C3AED" />
      </g>
    </AvatarBase>
  );
}






// Premium Abstract Identity: Harmony & Equilibrium
export function TriquetraAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#040211", "#0F0B26"]} {...props}>
      <defs>
        {/* Iridescent Quantum Gradient: Neon Mint -> Electric Cyan -> Royal Sapphire */}
        <linearGradient id="triquetra-premium-core" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="40%" stopColor="#0EA5E9" />
          <stop offset="80%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4338CA" />
        </linearGradient>

        {/* Contrasting Inner Binding Ring Gradient: Radiant Magenta to Violet */}
        <linearGradient id="triquetra-ring-grad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#312E81" />
        </linearGradient>

        {/* Ambient Ethereal Energy Backlight */}
        <radialGradient id="triquetra-ambient-aura" cx="50%" cy="52%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#6366F1" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0F0B26" stopOpacity="0" />
        </radialGradient>

        {/* High-Gloss Crisp Specular Edge Track */}
        <linearGradient id="triquetra-specular-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Premium Layer Drop Shadow for Woven Interlocking Depth */}
        <filter id="triquetra-depth-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#010005" floodOpacity="0.75" />
        </filter>

        {/* Soft Aura Glow Filter */}
        <filter id="triquetra-glow-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* 1. Background Aura Layer (Energy Field) */}
      <circle cx="50" cy="52" r="35" fill="url(#triquetra-ambient-aura)" />

      {/* 2. Secondary Motion Layers (Undercurrent Balance Grid) */}
      <g filter="url(#triquetra-glow-blur)" opacity="0.3">
        <circle cx="50" cy="52" r="26" fill="none" stroke="#6366F1" strokeWidth="1" strokeDasharray="4 6" />
        <path d="M 50 16 L 50 88 M 18 52 L 82 52" stroke="#22D3EE" strokeWidth="0.75" strokeDasharray="2 4" />
      </g>

      {/* 3. Primary Interlocking Abstract Shapes (The Trinity Node Assemblies) */}
      {/* Dynamic Layering Order + Shadows creates an organic woven over-under illusion */}
      <g filter="url(#triquetra-depth-shadow)">
        
        {/* The Central Harmonic Binding Ring (Weaves through the leaves) */}
        <circle 
          cx="50" 
          cy="52" 
          r="17" 
          fill="none" 
          stroke="url(#triquetra-ring-grad)" 
          strokeWidth="4.5" 
        />

        {/* Leaf Node 1: Heading North (Base Template Anchor) */}
        <path 
          d="M 50 52 C 64.5 52, 67.5 34, 50 19 C 32.5 34, 35.5 52, 50 52 Z" 
          fill="none" 
          stroke="url(#triquetra-premium-core)" 
          strokeWidth="6.5" 
          strokeLinejoin="round"
        />

        {/* Leaf Node 2: Heading South-East (Rotated perfectly at 120 degrees) */}
        <path 
          d="M 50 52 C 64.5 52, 67.5 34, 50 19 C 32.5 34, 35.5 52, 50 52 Z" 
          fill="none" 
          stroke="url(#triquetra-premium-core)" 
          strokeWidth="6.5" 
          strokeLinejoin="round"
          transform="rotate(120, 50, 52)"
        />

        {/* Leaf Node 3: Heading South-West (Rotated perfectly at 240 degrees) */}
        <path 
          d="M 50 52 C 64.5 52, 67.5 34, 50 19 C 32.5 34, 35.5 52, 50 52 Z" 
          fill="none" 
          stroke="url(#triquetra-premium-core)" 
          strokeWidth="6.5" 
          strokeLinejoin="round"
          transform="rotate(240, 50, 52)"
        />
      </g>

      {/* 4. Highlight Layers (Glass Enamel Sheen & Specular Track) */}
      <g filter="url(#triquetra-depth-shadow)" pointerEvents="none">
        {/* North Leaf Fine Specular Light Stroke */}
        <path 
          d="M 36.5 33.5 C 43 24, 48 20.5, 50 20.5" 
          fill="none" 
          stroke="url(#triquetra-specular-light)" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
        />
        
        {/* South-East Leaf Fine Specular Light Stroke */}
        <path 
          d="M 36.5 33.5 C 43 24, 48 20.5, 50 20.5" 
          fill="none" 
          stroke="url(#triquetra-specular-light)" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          transform="rotate(120, 50, 52)"
        />

        {/* Central Core Soft Overlay Sheen Pinpoint */}
        <circle cx="50" cy="52" r="3.5" fill="#FFFFFF" opacity="0.15" />
      </g>

      {/* 5. Micro Particles (Equilibrium Singularity Nodes) */}
      <g opacity="0.9">
        {/* Outer orbital fragments flanking the triangle vectors */}
        <circle cx="50" cy="11" r="1.5" fill="#22D3EE" filter="url(#triquetra-depth-shadow)" />
        <circle cx="85" cy="72" r="1.2" fill="#F472B6" />
        <circle cx="15" cy="72" r="1.2" fill="#A855F7" />
        <circle cx="34" cy="42" r="0.8" fill="#FFFFFF" opacity="0.5" />
        <circle cx="66" cy="42" r="0.8" fill="#FFFFFF" opacity="0.5" />

        {/* Perfectly centered equilibrium anchor spark */}
        <circle cx="50" cy="52" r="2" fill="#FFFFFF" filter="url(#triquetra-depth-shadow)" />
        <circle cx="50" cy="52" r="0.8" fill="#22D3EE" />
      </g>
    </AvatarBase>
  );
}






// Premium Abstract Identity: Flow & Momentum
export function WaveAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#030C1B", "#08091A"]} {...props}>
      <defs>
        {/* Core Wave Gradient: Shifting Mint Green -> Electric Teal -> Deep Cerulean */}
        <linearGradient id="wave-premium-core" x1="0%" y1="80%" x2="100%" y2="20%">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="30%" stopColor="#10B981" />
          <stop offset="70%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        {/* Secondary Undercurrent Gradient: Deep Indigo to Clear */}
        <linearGradient id="wave-undercurrent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#6366F1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#08091A" stopOpacity="0" />
        </linearGradient>

        {/* Ambient Hydro-Luminescence Backlight */}
        <radialGradient id="wave-ambient-glow" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#3B82F6" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#08091A" stopOpacity="0" />
        </radialGradient>

        {/* High-Gloss Liquid Surface Rim Light */}
        <linearGradient id="wave-rim-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Premium Drop Shadow for Volumetric Overlaps */}
        <filter id="wave-depth-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-1" dy="4" stdDeviation="3.5" floodColor="#010307" floodOpacity="0.7" />
        </filter>

        {/* Diffused Blur for Secondary Currents */}
        <filter id="wave-current-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* 1. Background Aura Layer (Hydro Energy Field) */}
      <circle cx="50" cy="50" r="36" fill="url(#wave-ambient-glow)" />

      {/* 2. Secondary Motion Layers (Undercurrent Resonance) */}
      <g filter="url(#wave-current-blur)" opacity="0.5">
        <path 
          d="M 22 66 C 24 48, 44 42, 60 52 C 76 62, 82 46, 74 36" 
          fill="none" 
          stroke="url(#wave-undercurrent)" 
          strokeWidth="7" 
          strokeLinecap="round" 
        />
      </g>

      {/* 3. Primary Abstract Shape (The Cresting Enamel Wave Body) */}
      <g filter="url(#wave-depth-shadow)">
        {/* Main sweeping dynamic current track */}
        <path 
          d="M 24 60 C 24 38, 42 26, 58 30 C 72 34, 74 48, 64 54 C 52 60, 42 44, 48 36 C 54 28, 66 32, 66 40" 
          fill="none" 
          stroke="url(#wave-premium-core)" 
          strokeWidth="10" 
          strokeLinecap="round" 
        />
        
        {/* Supporting accent flow loop flanking the right wall */}
        <path 
          d="M 76 44 C 76 58, 62 68, 46 64 C 36 61, 32 52, 40 46" 
          fill="none" 
          stroke="#10B981" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          opacity="0.45"
        />
      </g>

      {/* 4. Highlight Layer (Gloss Sheen & Wet Highlights) */}
      <g filter="url(#wave-depth-shadow)" pointerEvents="none">
        {/* Razor-Crisp Specular Rim Light on Wave Crest */}
        <path 
          d="M 27 50 C 27 36, 40 27, 56 31 C 66 33, 69 40, 64 47" 
          fill="none" 
          stroke="url(#wave-rim-sheen)" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
        />
        
        {/* Secondary Internal Light Reflection Node */}
        <ellipse cx="50" cy="33" rx="3" ry="1" fill="#FFFFFF" opacity="0.3" transform="rotate(-12, 50, 33)" />
      </g>

      {/* 5. Micro Particles (Suspended Foam Drops & Condensation Sparks) */}
      <g opacity="0.85">
        <circle cx="74" cy="28" r="1.5" fill="#A7F3D0" filter="url(#wave-depth-shadow)" />
        <circle cx="74" cy="28" r="0.6" fill="#FFF" />
        
        <circle cx="20" cy="42" r="1.2" fill="#06B6D4" />
        <circle cx="34" cy="68" r="1.5" fill="#3B82F6" />
        <circle cx="60" cy="62" r="1" fill="#FFFFFF" opacity="0.6" />
        <circle cx="44" cy="46" r="0.8" fill="#FFFFFF" opacity="0.5" />
      </g>
    </AvatarBase>
  );
}








// Premium Abstract Identity: Infinity & Paradox
export function MobiusAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#090416", "#160A2B"]} {...props}>
      <defs>
        {/* Primary Enamel Loop Gradient: Neon Rose -> Sunset Orange -> Deep Amber */}
        <linearGradient id="mobius-premium-core" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4B72" />
          <stop offset="40%" stopColor="#EC4899" />
          <stop offset="85%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Ambient Backlight Energy Field */}
        <radialGradient id="mobius-ambient-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.25" />
          <stop offset="65%" stopColor="#7C3AED" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#160A2B" stopOpacity="0" />
        </radialGradient>

        {/* High-Gloss Outer Surface Specular Light */}
        <linearGradient id="mobius-rim-glow" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Premium UI Element Drop Shadow for 3D Intersecting Flips */}
        <filter id="mobius-depth-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#010005" floodOpacity="0.75" />
        </filter>
      </defs>

      {/* 1. Background Aura Layer (Infinity Energy Field) */}
      <circle cx="50" cy="50" r="35" fill="url(#mobius-ambient-aura)" />

      {/* 2. Secondary Motion Layers (Concentric Geometric Orbit Grid) */}
      <g opacity="0.25">
        <ellipse cx="50" cy="50" rx="34" ry="22" fill="none" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 6" />
        <ellipse cx="50" cy="50" rx="28" ry="16" fill="none" stroke="#FF4B72" strokeWidth="0.75" strokeDasharray="2 4" transform="rotate(-15, 50, 50)" />
      </g>

      {/* 3. Primary Abstract Shape (The Interlocking Möbius Loop Topology) */}
      {/* Layer separation creates the structural physical over-under loop layout */}
      <g>
        {/* BACK LAYER: Underpass wing looping from bottom-right back up towards center */}
        <path 
          d="M 50 50 C 64 34, 78 34, 78 50 C 78 66, 64 66, 50 50" 
          fill="none" 
          stroke="url(#mobius-premium-core)" 
          strokeWidth="9" 
          strokeLinecap="round" 
        />

        {/* FOREGROUND LAYER: Overpass wing looping from center down around left wall with drop shadow */}
        <path 
          d="M 50 50 C 36 34, 22 34, 22 50 C 22 66, 36 66, 50 50" 
          fill="none" 
          stroke="url(#mobius-premium-core)" 
          strokeWidth="9" 
          strokeLinecap="round" 
          filter="url(#mobius-depth-shadow)"
        />
      </g>

      {/* 4. Highlight Layers (3D Glass Sheen & Edge Specular Tracks) */}
      <g filter="url(#mobius-depth-shadow)" pointerEvents="none">
        {/* Left Lobe Crisp Edge Specular Curve */}
        <path 
          d="M 32 38 C 24 40, 23 48, 23 52 C 23 60, 31 64, 42 55" 
          fill="none" 
          stroke="url(#mobius-rim-glow)" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
        />

        {/* Right Lobe Soft Contrast Balance Curve */}
        <path 
          d="M 68 62 C 76 60, 77 52, 77 48" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="1" 
          strokeLinecap="round" 
          opacity="0.3" 
        />

        {/* Center Twist Geometric Gloss Pinpoint */}
        <circle cx="50" cy="50" r="1.5" fill="#FFFFFF" opacity="0.5" />
      </g>

      {/* 5. Micro Particles (Suspended Paradox Fragments) */}
      <g opacity="0.9">
        {/* Orbiting particles charting the structural path */}
        <circle cx="26" cy="30" r="1.5" fill="#FF4B72" filter="url(#mobius-depth-shadow)" />
        <circle cx="74" cy="70" r="1.2" fill="#F59E0B" />
        <circle cx="16" cy="58" r="1" fill="#7C3AED" />
        <circle cx="84" cy="42" r="1" fill="#FFFFFF" opacity="0.4" />
        <circle cx="48" cy="64" r="0.8" fill="#FFFFFF" opacity="0.5" />
      </g>
    </AvatarBase>
  );
}