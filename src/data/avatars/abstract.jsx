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

// Reuleaux Triangle
export function ReuleauxAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#FF6B9D", "#C44569"]} {...props}>
      <defs>
        <linearGradient id="reuleaux-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8FB3" />
          <stop offset="100%" stopColor="#E85580" />
        </linearGradient>
      </defs>
      {/* Reuleaux triangle - curved sides */}
      <path d="M 50 28 Q 68 40 50 72 Q 32 40 50 28" fill="url(#reuleaux-grad)" />
      <path d="M 50 28 Q 68 40 50 72 Q 32 40 50 28" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      {/* Highlight */}
      <ellipse cx="45" cy="42" rx="6" ry="4" fill="rgba(255,255,255,0.25)" />
    </AvatarBase>
  );
}

// Fluid Curves
export function FluidCurvesAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#667EEA", "#764BA2"]} {...props}>
      <defs>
        <linearGradient id="fluid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B9EF7" />
          <stop offset="100%" stopColor="#9B6DD7" />
        </linearGradient>
      </defs>
      {/* Flowing curves */}
      <path d="M 25 45 Q 35 35 50 45 T 75 45" stroke="url(#fluid-grad)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 25 55 Q 35 45 50 55 T 75 55" stroke="url(#fluid-grad)" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 30 65 Q 40 58 50 65 T 70 65" stroke="url(#fluid-grad)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* Highlight */}
      <circle cx="38" cy="42" r="2" fill="rgba(255,255,255,0.4)" />
    </AvatarBase>
  );
}

// Hexaflexagon
export function HexaflexagonAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#F093FB", "#F5576C"]} {...props}>
      <defs>
        <linearGradient id="hexa-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5ADFF" />
          <stop offset="100%" stopColor="#F77A8C" />
        </linearGradient>
      </defs>
      {/* Hexaflexagon - hexagonal shape with folded appearance */}
      <path d="M 50 25 L 68 38 L 68 62 L 50 75 L 32 62 L 32 38 Z" fill="url(#hexa-grad)" />
      {/* Fold lines */}
      <path d="M 50 25 L 50 75" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <path d="M 32 38 L 68 62" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <path d="M 68 38 L 32 62" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      {/* Facets */}
      <path d="M 50 25 L 68 38 L 50 50 L 32 38 Z" fill="rgba(255,255,255,0.15)" />
      {/* Highlight */}
      <path d="M 38 35 L 45 32" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
    </AvatarBase>
  );
}

// Triquetra
export function TriquetraAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#4FACFE", "#00F2FE"]} {...props}>
      <defs>
        <linearGradient id="triquetra-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7FC4FF" />
          <stop offset="100%" stopColor="#33F8FF" />
        </linearGradient>
      </defs>
      {/* Triquetra - three interlocking arcs */}
      <path d="M 50 30 Q 65 45 50 60 Q 35 45 50 30" fill="none" stroke="url(#triquetra-grad)" strokeWidth="4" strokeLinecap="round" />
      <path d="M 35 50 Q 50 35 65 50 Q 50 65 35 50" fill="none" stroke="url(#triquetra-grad)" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <path d="M 30 40 Q 45 55 60 40 Q 45 25 30 40" fill="none" stroke="url(#triquetra-grad)" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      {/* Center highlight */}
      <circle cx="50" cy="45" r="3" fill="rgba(255,255,255,0.4)" />
    </AvatarBase>
  );
}

// Wave
export function WaveAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#43E97B", "#38F9D7"]} {...props}>
      <defs>
        <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5CF098" />
          <stop offset="100%" stopColor="#4DFCE5" />
        </linearGradient>
      </defs>
      {/* Smooth wave */}
      <path d="M 20 50 Q 30 40 40 50 T 60 50 T 80 50" stroke="url(#wave-grad)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 20 58 Q 30 48 40 58 T 60 58 T 80 58" stroke="url(#wave-grad)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* Highlight */}
      <path d="M 25 48 Q 35 42 45 48" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </AvatarBase>
  );
}

// Möbius Strip
export function MobiusAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#FA709A", "#FEE140"]} {...props}>
      <defs>
        <linearGradient id="mobius-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FB8FAD" />
          <stop offset="100%" stopColor="#FFEB7A" />
        </linearGradient>
      </defs>
      {/* Möbius strip - twisted loop */}
      <path d="M 30 45 Q 50 30 70 45 Q 70 65 50 70 Q 30 65 30 45" fill="none" stroke="url(#mobius-grad)" strokeWidth="5" strokeLinecap="round" />
      <path d="M 30 45 Q 50 30 70 45 Q 70 65 50 70 Q 30 65 30 45" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
      {/* Highlight */}
      <path d="M 35 42 Q 50 32 65 42" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </AvatarBase>
  );
}