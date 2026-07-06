import React, { useId } from "react";
import { AvatarBase } from "./AvatarBase";



const HEAD = { cx: 50, cy: 57, r: 26 };
const EYE_L = { cx: 41, cy: 54 };
const EYE_R = { cx: 59, cy: 54 };
const CHEEK_L = { cx: 36, cy: 65 };
const CHEEK_R = { cx: 64, cy: 65 };

/** Premium dot eyes with subtle highlight - clean and modern */
function PremiumEyes({ color = "#1a1a1a", radius = 2.8 }) {
  return (
    <>
      <circle cx={EYE_L.cx} cy={EYE_L.cy} r={radius} fill={color} />
      <circle cx={EYE_R.cx} cy={EYE_R.cy} r={radius} fill={color} />
      <circle
        cx={EYE_L.cx + 0.8}
        cy={EYE_L.cy - 0.8}
        r={radius * 0.35}
        fill="#FFFFFF"
      />
      <circle
        cx={EYE_R.cx + 0.8}
        cy={EYE_R.cy - 0.8}
        r={radius * 0.35}
        fill="#FFFFFF"
      />
    </>
  );
}

/** Soft, subtle blush - adds warmth without being distracting */
function SoftBlush({ color, opacity = 0.25 }) {
  return (
    <>
      <circle
        cx={CHEEK_L.cx}
        cy={CHEEK_L.cy}
        r="5.5"
        fill={color}
        opacity={opacity}
      />
      <circle
        cx={CHEEK_R.cx}
        cy={CHEEK_R.cy}
        r="5.5"
        fill={color}
        opacity={opacity}
      />
    </>
  );
}

/** Minimal curved smile - tiny and elegant */
function TinySmile({ color = "#4a4a4a", y = 68 }) {
  return (
    <path
      d={`M46 ${y} Q50 ${y + 2.5} 54 ${y}`}
      stroke={color}
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
    />
  );
}

/** Subtle forehead highlight for depth */
function SoftHighlight() {
  return (
    <ellipse cx="50" cy="38" rx="8" ry="3" fill="#FFFFFF" opacity="0.15" />
  );
}





export function FoxAvatar({ size, ...props }) {
  const uid = useId();
  const g = (name) => `fox-${name}-${uid}`;

  return (
    <AvatarBase size={size} background={["#FFE29A", "#FFB85C"]} {...props}>
      <defs>
        {/* Core Amber-Orange Head Gradient */}
        <linearGradient id={g("head")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9F43" />
          <stop offset="60%" stopColor="#F06520" />
          <stop offset="100%" stopColor="#D44A0C" />
        </linearGradient>

        {/* Cream Enamel Muzzle Gradient */}
        <linearGradient id={g("muzzle")} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFBF4" />
          <stop offset="100%" stopColor="#F5DFCA" />
        </linearGradient>

        {/* Deep Ear Shadow Well */}
        <linearGradient id={g("ear-dark")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B33600" />
          <stop offset="100%" stopColor="#732200" />
        </linearGradient>

        {/* Glossy Top-Left Specular Sheen */}
        <linearGradient id={g("specular")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Component Shadow for Toy-Like Depth */}
        <filter id={g("depth-shadow")} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#662200" floodOpacity="0.3" />
        </filter>

        {/* Soft Blush Blur Filter */}
        <filter id={g("blush-blur")}>
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* 1. Background Environmental Aura Halo */}
      <circle cx="50" cy="54" r="34" fill="#FFFFFF" opacity="0.15" />

      {/* 2. Secondary Features: Stylized Ears */}
      <g filter={`url(#${g("depth-shadow")})`}>
        {/* Left Ear Base */}
        <path d="M 14 50 C 12 34, 20 12, 34 20 C 30 32, 26 44, 24 48 Z" fill="url(#reuleaux-premium-core)" fillPath="#F06520" />
        <path d="M 14 50 C 12 34, 20 12, 34 20 C 30 32, 26 44, 24 48 Z" fill={`url(#${g("head")})`} />
        {/* Left Inner Ear Well */}
        <path d="M 17 46 C 16 36, 21 21, 30 25 C 27 34, 23 42, 21 45 Z" fill={`url(#${g("ear-dark")})`} />
        
        {/* Right Ear Base */}
        <path d="M 86 50 C 88 34, 80 12, 66 20 C 70 32, 74 44, 76 48 Z" fill={`url(#${g("head")})`} />
        {/* Right Inner Ear Well */}
        <path d="M 83 46 C 84 36, 79 21, 70 25 C 73 34, 77 42, 79 45 Z" fill={`url(#${g("ear-dark")})`} />
      </g>

      {/* 3. Primary Head Silhouette (With Expressive Cheek Flares) */}
      <path 
        d="M 16 54 C 16 34, 30 24, 50 24 C 70 24, 84 34, 84 54 C 84 70, 72 78, 50 78 C 28 78, 16 70, 16 54 Z" 
        fill={`url(#${g("head")})`} 
        filter={`url(#${g("depth-shadow")})`}
      />

      {/* 4. Soft Toy-Plush Ambient Blush */}
      <g filter={`url(#${g("blush-blur")})`} opacity="0.6">
        <circle cx="28" cy="60" r="5" fill="#FF4E21" />
        <circle cx="72" cy="60" r="5" fill="#FF4E21" />
      </g>

      {/* 5. Facial Structure: Cream Muzzle Patch */}
      <path 
        d="M 32 60 C 32 50, 68 50, 68 60 C 68 72, 58 76, 50 76 C 42 76, 32 72, 32 60 Z" 
        fill={`url(#${g("muzzle")})`} 
      />

      {/* 6. Expression System: Witty / Sly Eyes */}
      <g filter={`url(#${g("depth-shadow")})`}>
        {/* Left Clever Eye Segment */}
        <path d="M 28 48 Q 36 43, 40 50 Q 34 53, 28 48 Z" fill="#23130B" />
        <circle cx="34" cy="48.5" r="1.5" fill="#FFFFFF" />
        
        {/* Right Clever Eye Segment */}
        <path d="M 72 48 Q 64 43, 60 50 Q 66 53, 72 48 Z" fill="#23130B" />
        <circle cx="66" cy="48.5" r="1.5" fill="#FFFFFF" />
      </g>

      {/* 7. Tiny Soft Nose & Playful Side Smirk */}
      <path d="M 47 58 C 47 56, 53 56, 53 58 C 53 60, 50 62, 50 62 C 50 62, 47 60, 47 58 Z" fill="#3D1D08" />
      <path d="M 45 66 Q 48 69, 52 66 Q 55 64, 57 66" fill="none" stroke="#66310F" strokeWidth="2" strokeLinecap="round" />

      {/* 8. Premium Highlight Layer (Specular Reflection Overlay) */}
      <path 
        d="M 18 50 C 18 36, 30 26, 50 26 C 56 26, 40 38, 30 52 C 24 60, 18 58, 18 50 Z" 
        fill={`url(#${g("specular")})`} 
        pointerEvents="none"
      />
    </AvatarBase>
  );
}

// ======================================================
// BUNNY 🐰
// Soft white-pink, long rounded ears, gentle expression
// ======================================================


export function BunnyAvatar({ size, ...props }) {
  const uid = useId();
  const g = (name) => `bunny-${name}-${uid}`;

  return (
    <AvatarBase size={size} background={["#FFD6EA", "#FFB3D9"]} {...props}>
      <defs>
        {/* Smooth White Plush/Enamel Head Gradient */}
        <linearGradient id={g("head")} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FFF3FA" />
          <stop offset="100%" stopColor="#F6E2EE" />
        </linearGradient>

        {/* Soft Pastel Pink Inner Ear Well */}
        <linearGradient id={g("ear-pink")} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFAECF" />
          <stop offset="100%" stopColor="#F58EB6" />
        </linearGradient>

        {/* Vertical Ear Lighting Template */}
        <linearGradient id={g("ear-body")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EDD8E5" />
        </linearGradient>

        {/* High-End Deep Component Ambient Shadow */}
        <filter id={g("depth-shadow")} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#C793B0" floodOpacity="0.4" />
        </filter>

        {/* Flawless Blush Blur Formula */}
        <filter id={g("blush-blur")}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* 1. Background Halo Ring */}
      <circle cx="50" cy="56" r="33" fill="#FFFFFF" opacity="0.3" />

      {/* 2. Secondary Features: Balanced Asymmetrical Alert Ears */}
      <g filter={`url(#${g("depth-shadow")})`}>
        {/* Left Ear (Standing straight up, listening intently) */}
        <path d="M 26 42 C 24 26, 24 6, 33 6 C 42 6, 40 26, 38 42 Z" fill={`url(#${g("ear-body")})`} />
        <path d="M 29 38 C 28 26, 28 11, 33 11 C 38 11, 37 26, 35 38 Z" fill={`url(#${g("ear-pink")})`} />

        {/* Right Ear (Slightly cocked sideways to convey cute anxious energy) */}
        <path d="M 62 42 C 60 26, 58 8, 67 10 C 76 12, 74 28, 74 42 Z" fill={`url(#${g("ear-body")})`} transform="rotate(8, 67, 42)" />
        <path d="M 65 38 C 64 26, 62 13, 67 15 C 72 17, 71 28, 69 38 Z" fill={`url(#${g("ear-pink")})`} transform="rotate(8, 67, 42)" />
      </g>

      {/* 3. Primary Head Silhouette (Chubby Horizontal Geometry) */}
      <path 
        d="M 20 56 C 20 40, 32 30, 50 30 C 68 30, 80 40, 80 56 C 80 71, 67 78, 50 78 C 33 78, 20 71, 20 56 Z" 
        fill={`url(#${g("head")})`} 
        filter={`url(#${g("depth-shadow")})`}
      />

      {/* 4. Large Innocent Glass-Enamel Eyes */}
      <g>
        {/* Left Eye Base & Twin Specular Sparkle Beads */}
        <circle cx="36" cy="51" r="5" fill="#2E1B26" />
        <circle cx="34.5" cy="49.2" r="1.6" fill="#FFFFFF" />
        <circle cx="37.8" cy="53" r="0.7" fill="#FFFFFF" />

        {/* Right Eye Base & Twin Specular Sparkle Beads */}
        <circle cx="64" cy="51" r="5" fill="#2E1B26" />
        <circle cx="62.5" cy="49.2" r="1.6" fill="#FFFFFF" />
        <circle cx="65.8" cy="53" r="0.7" fill="#FFFFFF" />

        {/* Subtle Anxious Expressive Brow Ticks */}
        <path d="M 32 43 Q 36 41, 40 44" fill="none" stroke="#A67B94" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 68 43 Q 64 41, 60 44" fill="none" stroke="#A67B94" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* 5. Soft Toy-Plush Blush Plates */}
      <g filter={`url(#${g("blush-blur")})`} opacity="0.55">
        <ellipse cx="27" cy="61" rx="5.5" ry="4" fill="#FF6BB0" />
        <ellipse cx="73" cy="61" rx="5.5" ry="4" fill="#FF6BB0" />
      </g>

      {/* 6. Tiny Button Nose & Classic "w" Mouth Shape */}
      <ellipse cx="50" cy="59" rx="2" ry="1.4" fill="#E0538E" />
      <path d="M 44 65 Q 47 68, 50 65 Q 53 68, 56 65" fill="none" stroke="#8A4F71" strokeWidth="1.75" strokeLinecap="round" />

      {/* 7. Micro Accent: Gentle Chin Depth Rim */}
      <path d="M 38 74 Q 50 78, 62 74" fill="none" stroke="#E6CADB" strokeWidth="1.5" strokeLinecap="round" />
    </AvatarBase>
  );
}










// Premium Abstract Identity: Wisdom & Observation
export function OwlAvatar({ size, ...props }) {
  const uid = useId();
  const g = (name) => `owl-${name}-${uid}`;

  return (
    <AvatarBase size={size} background={["#FFCB84", "#E8862C"]} {...props}>
      <defs>
        {/* Rich Amber-Brown Silhouette Gradient */}
        <linearGradient id={g("head")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A574" />
          <stop offset="55%" stopColor="#A67C52" />
          <stop offset="100%" stopColor="#78532E" />
        </linearGradient>

        {/* Hypnotic Outer Iris Radial Glow */}
        <radialGradient id={g("eye-iris")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDF5" />
          <stop offset="60%" stopColor="#F5D078" />
          <stop offset="100%" stopColor="#D99E32" />
        </radialGradient>

        {/* Polished Enamel Beak Gradient */}
        <linearGradient id={g("beak")} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFA336" />
          <stop offset="100%" stopColor="#D65E00" />
        </linearGradient>

        {/* Premium Depth Blur for Facial Disc Shadows */}
        <filter id={g("depth-shadow")} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#422913" floodOpacity="0.35" />
        </filter>

        {/* Soft Blush Bloom Filter */}
        <filter id={g("blush-blur")}>
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* 1. Background Environmental Aura Halo */}
      <circle cx="50" cy="54" r="34" fill="#FFFFFF" opacity="0.2" />

      {/* 2. Secondary Features: Curved Feather Tufts */}
      <g filter={`url(#${g("depth-shadow")})`}>
        {/* Left Horn/Feather Tuft */}
        <path d="M 22 38 C 20 22, 34 14, 40 28 Z" fill="#91663B" />
        {/* Right Horn/Feather Tuft */}
        <path d="M 78 38 C 80 22, 66 14, 60 28 Z" fill="#91663B" />
      </g>

      {/* 3. Primary Head Silhouette (Tapered Sub-Circular Matrix) */}
      <path 
        d="M 20 54 C 20 35, 30 24, 50 24 C 70 24, 80 35, 80 54 C 80 71, 68 79, 50 79 C 32 79, 20 71, 20 54 Z" 
        fill={`url(#${g("head")})`} 
        filter={`url(#${g("depth-shadow")})`}
      />

      {/* 4. Facial Structure: Sculpted Interlocking Goggle Disc */}
      <path 
        d="M 50 63 C 34 63, 25 56, 25 44 C 25 34, 37 32, 50 42 C 63 32, 75 34, 75 44 C 75 56, 66 63, 50 63 Z" 
        fill="#FDF8F2" 
        filter={`url(#${g("depth-shadow")})`}
      />

      {/* 5. Soft Toy-Plush Ambient Blush */}
      <g filter={`url(#${g("blush-blur")})`} opacity="0.5">
        <circle cx="28" cy="56" r="4.5" fill="#E8862C" />
        <circle cx="72" cy="56" r="4.5" fill="#E8862C" />
      </g>

      {/* 6. Iconic Expression System: Observant Wide-Angle Lenses */}
      <g>
        {/* Left Eye Stack (Sclera -> Iris -> Pupil -> Twins Reflect) */}
        <circle cx="37" cy="45" r="9.5" fill="#FFFFFF" filter={`url(#${g("depth-shadow")})`} />
        <circle cx="37" cy="45" r="7.5" fill={`url(#${g("eye-iris")})`} />
        <circle cx="37" cy="45" r="4" fill="#1C120C" />
        <circle cx="35.5" cy="43.5" r="1.5" fill="#FFFFFF" />
        <circle cx="38.5" cy="46.5" r="0.6" fill="#FFFFFF" />

        {/* Right Eye Stack (Sclera -> Iris -> Pupil -> Twins Reflect) */}
        <circle cx="63" cy="45" r="9.5" fill="#FFFFFF" filter={`url(#${g("depth-shadow")})`} />
        <circle cx="63" cy="45" r="7.5" fill={`url(#${g("eye-iris")})`} />
        <circle cx="63" cy="45" r="4" fill="#1C120C" />
        <circle cx="61.5" cy="43.5" r="1.5" fill="#FFFFFF" />
        <circle cx="64.5" cy="46.5" r="0.6" fill="#FFFFFF" />
      </g>

      {/* 7. Tiny Dynamic Droop Beak */}
      <path 
        d="M 46.5 45 C 46.5 45, 50 42, 50 42 C 50 42, 53.5 45, 53.5 45 C 53.5 52, 50 56, 50 56 C 50 56, 46.5 52, 46.5 45 Z" 
        fill={`url(#${g("beak")})`} 
        filter={`url(#${g("depth-shadow")})`}
      />

      {/* 8. Specular High-Gloss Sheen Arc */}
      <path 
        d="M 23 46 C 23 34, 34 26, 50 26 C 54 26, 42 34, 32 44 C 27 49, 23 50, 23 46 Z" 
        fill="#FFFFFF" 
        opacity="0.15" 
        pointerEvents="none"
      />
    </AvatarBase>
  );
}







// Premium Abstract Identity: Curiosity & Elegance
export function CatAvatar({ size, ...props }) {
  const uid = useId();
  const g = (name) => `cat-${name}-${uid}`;

  return (
    <AvatarBase size={size} background={["#E7F1FF", "#BCD5FF"]} {...props}>
      <defs>
        {/* Sleek Gray-Blue Feline Base Gradient */}
        <linearGradient id={g("head")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="60%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>

        {/* Crisp White Porcelain Muzzle Mask */}
        <linearGradient id={g("muzzle")} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>

        {/* Deep Rose Ear Well Core */}
        <linearGradient id={g("ear-well")} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>

        {/* Volumetric Structural Shadow Track */}
        <filter id={g("depth-shadow")} x="-12%" y="-12%" width="124%" height="124%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#334155" floodOpacity="0.3" />
        </filter>

        {/* Blush Gaussian Diffusion Node */}
        <filter id={g("blush-blur")}>
          <feGaussianBlur stdDeviation="2.8" />
        </filter>
      </defs>

      {/* 1. Background Ambient Aura Light Field */}
      <circle cx="50" cy="55" r="34" fill="#FFFFFF" opacity="0.3" />

      {/* 2. Secondary Features: Elegant Upright Triangle Ears */}
      <g filter={`url(#${g("depth-shadow")})`}>
        {/* Left Ear Frame & Core Lining */}
        <path d="M 16 46 C 14 26, 24 10, 36 18 C 32 30, 26 40, 24 44 Z" fill={`url(#${g("head")})`} />
        <path d="M 20 42 C 19 29, 26 18, 33 23 C 30 31, 25 38, 23 41 Z" fill={`url(#${g("ear-well")})`} />

        {/* Right Ear Frame & Core Lining */}
        <path d="M 84 46 C 86 26, 76 10, 64 18 C 68 30, 74 40, 76 44 Z" fill={`url(#${g("head")})`} />
        <path d="M 80 42 C 81 29, 74 18, 67 23 C 70 31, 75 38, 77 41 Z" fill={`url(#${g("ear-well")})`} />
      </g>

      {/* 3. Primary Head Silhouette (Premium Organic Feline Curve) */}
      <path 
        d="M 18 54 C 18 36, 30 26, 50 26 C 70 26, 82 36, 82 54 C 82 70, 69 77, 50 77 C 31 77, 18 70, 18 54 Z" 
        fill={`url(#${g("head")})`} 
        filter={`url(#${g("depth-shadow")})`}
      />

      {/* 4. Soft Toy-Plush Cheek Blush Orbs */}
      <g filter={`url(#${g("blush-blur")})`} opacity="0.6">
        <circle cx="27" cy="59" r="4" fill="#FB7185" />
        <circle cx="73" cy="59" r="4" fill="#FB7185" />
      </g>

      {/* 5. Facial Structure: Layered Porcelain Muzzle Plate */}
      <path 
        d="M 35 63 C 35 55, 65 55, 65 63 C 65 71, 58 74, 50 74 C 42 74, 35 71, 35 63 Z" 
        fill={`url(#${g("muzzle")})`} 
        filter={`url(#${g("depth-shadow")})`}
      />

      {/* 6. Expression System: Curious / Tilted Almond Eyes */}
      <g>
        {/* Left Elegant Eye & Specular Gem Pinpoint */}
        <path d="M 28 49 C 31 44, 39 44, 41 49 C 37 52, 31 52, 28 49 Z" fill="#1E293B" />
        <circle cx="34.5" cy="47.8" r="1.2" fill="#FFFFFF" />

        {/* Right Elegant Eye & Specular Gem Pinpoint */}
        <path d="M 72 49 C 69 44, 61 44, 59 49 C 63 52, 69 52, 72 49 Z" fill="#1E293B" />
        <circle cx="65.5" cy="47.8" r="1.2" fill="#FFFFFF" />
      </g>

      {/* 7. Soft Rose Button Nose & Refined Micro Cat-Smile Spline */}
      <polygon points="48 57, 52 57, 50 59.5" fill="#FB7185" filter={`url(#${g("depth-shadow")})`} />
      <path d="M 44 64 Q 47 67, 50 64 Q 53 67, 56 64" fill="none" stroke="#475569" strokeWidth="1.75" strokeLinecap="round" />

      {/* 8. Luxury Edge Specular Pillow Light */}
      <path 
        d="M 21 48 C 21 36, 32 28, 50 28 C 55 28, 41 38, 31 50 C 26 55, 21 54, 21 48 Z" 
        fill="#FFFFFF" 
        opacity="0.2" 
        pointerEvents="none"
      />
    </AvatarBase>
  );
}


// Premium Abstract Identity: Warm / Gentle / Strong Guardian
export function PandaAvatar({ size, ...props }) {
  const uid = useId();
  const g = (name) => `panda-${name}-${uid}`;

  return (
    <AvatarBase size={size} background={["#E8F5E9", "#A5D6A7"]} {...props}>
      <defs>
        {/* Soft Volumetric White Enamel Head Gradient */}
        <linearGradient id={g("head")} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#F6F8F5" />
          <stop offset="100%" stopColor="#E3EAE2" />
        </linearGradient>

        {/* Premium Dark Obsidian Gradient for Ears & Patches */}
        <linearGradient id={g("dark-fur")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3A3845" />
          <stop offset="60%" stopColor="#22202A" />
          <stop offset="100%" stopColor="#14131A" />
        </linearGradient>

        {/* Dynamic Toy Drop Shadow Filter */}
        <filter id={g("depth-shadow")} x="-12%" y="-12%" width="124%" height="124%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#3F4E40" floodOpacity="0.25" />
        </filter>

        {/* Soft Pastel Blush Blur Formula */}
        <filter id={g("blush-blur")}>
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* 1. Background Environmental Light Aura */}
      <circle cx="50" cy="55" r="34" fill="#FFFFFF" opacity="0.3" />

      {/* 2. Secondary Features: Perfectly Radiused Collective Ears */}
      <g filter={`url(#${g("depth-shadow")})`}>
        <circle cx="25" cy="29" r="11" fill={`url(#${g("dark-fur")})`} />
        <circle cx="75" cy="29" r="11" fill={`url(#${g("dark-fur")})`} />
      </g>

      {/* 3. Primary Head Silhouette (Chubby Rounded Proportions) */}
      <path 
        d="M 18 55 C 18 37, 30 26, 50 26 C 70 26, 82 37, 82 55 C 82 71, 69 78, 50 78 C 31 78, 18 71, 18 55 Z" 
        fill={`url(#${g("head")})`} 
        filter={`url(#${g("depth-shadow")})`}
      />

      {/* 4. Soft Toy-Plush Radiant Pink Blush */}
      <g filter={`url(#${g("blush-blur")})`} opacity="0.6">
        <circle cx="26" cy="62" r="5" fill="#FF8FA3" />
        <circle cx="74" cy="62" r="5" fill="#FF8FA3" />
      </g>

      {/* 5. Custom Tilted Soft-Edge Eye Patches */}
      <g filter={`url(#${g("depth-shadow")})`}>
        <ellipse cx="36" cy="51" rx="8.5" ry="10.5" fill={`url(#${g("dark-fur")})`} transform="rotate(-12, 36, 51)" />
        <ellipse cx="64" cy="51" rx="8.5" ry="10.5" fill={`url(#${g("dark-fur")})`} transform="rotate(12, 64, 51)" />
      </g>

      {/* 6. Expression System: Bright, Friendly Eyes with Twin Sparkles */}
      <g>
        {/* Left Eye Stack */}
        <circle cx="37" cy="50" r="3.2" fill="#FFFFFF" />
        <circle cx="37" cy="50" r="1.8" fill="#14131A" />
        <circle cx="36.3" cy="49.3" r="0.6" fill="#FFFFFF" />

        {/* Right Eye Stack */}
        <circle cx="63" cy="50" r="3.2" fill="#FFFFFF" />
        <circle cx="63" cy="50" r="1.8" fill="#14131A" />
        <circle cx="62.3" cy="49.3" r="0.6" fill="#FFFFFF" />
      </g>

      {/* 7. Dimensional Muzzle Overlay & Nose Plate */}
      <ellipse cx="50" cy="67" rx="10" ry="7" fill="#FFFFFF" opacity="0.5" />
      <ellipse cx="50" cy="61" rx="3" ry="2" fill="#14131A" />
      <path d="M 45 66 Q 50 69, 55 66" fill="none" stroke="#4A4A5A" strokeWidth="1.5" strokeLinecap="round" />

      {/* 8. Luxury Edge Specular Refraction Pillow Light */}
      <path 
        d="M 21 49 C 21 37, 32 28, 50 28 C 55 28, 41 38, 31 51 C 26 56, 21 55, 21 49 Z" 
        fill="#FFFFFF" 
        opacity="0.25" 
        pointerEvents="none"
      />
    </AvatarBase>
  );
}





// Premium Abstract Identity: Loyal / Calm / Independent Mystery
export function PantherAvatar({ size, ...props }) {
  const uid = useId();
  const g = (name) => `panther-${name}-${uid}`;

  return (
    <AvatarBase size={size} glowColor="#5CF1FF" background={["#554C86", "#2C254A"]} {...props}>
      <defs>
        {/* Deep Sleek Cosmic Velvet Base Gradient */}
        <linearGradient id={g("head")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#322C54" />
          <stop offset="60%" stopColor="#1E1936" />
          <stop offset="100%" stopColor="#100C21" />
        </linearGradient>

        {/* Bioluminescent Radiant Cyan Eye Core */}
        <radialGradient id={g("eye-glow")} cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#E0FFFF" />
          <stop offset="45%" stopColor="#5CF1FF" />
          <stop offset="100%" stopColor="#00A2B3" />
        </radialGradient>

        {/* High-End Dark Violet Muzzle Plate */}
        <linearGradient id={g("muzzle")} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1F1A3A" />
          <stop offset="100%" stopColor="#141126" />
        </linearGradient>

        {/* Drop Shadow Formula for Striking Contrast Against Dark BG */}
        <filter id={g("depth-shadow")} x="-12%" y="-12%" width="124%" height="124%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0B0818" floodOpacity="0.5" />
        </filter>

        {/* Mystical Ambient Cheek Highlight Blur */}
        <filter id={g("blush-blur")}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* 1. Background Cyan Environmental Aurora Light Rim */}
      <circle cx="50" cy="54" r="34" fill="#5CF1FF" opacity="0.12" />

      {/* 2. Secondary Features: Sleek Curved Midnight Feline Ears */}
      <g filter={`url(#${g("depth-shadow")})`}>
        {/* Left Ear Frame & Shadow Well */}
        <path d="M 17 46 C 15 27, 24 11, 36 19 C 32 31, 26 41, 24 45 Z" fill="#1A1530" />
        <path d="M 21 42 C 19 29, 26 18, 32 23 C 29 31, 25 38, 23 41 Z" fill="#100C21" />

        {/* Right Ear Frame & Shadow Well */}
        <path d="M 83 46 C 85 27, 76 11, 64 19 C 68 31, 74 41, 76 45 Z" fill="#1A1530" />
        <path d="M 79 42 C 81 29, 74 18, 68 23 C 71 31, 75 38, 77 41 Z" fill="#100C21" />
      </g>

      {/* 3. Primary Head Silhouette (Elegant Organic Taper) */}
      <path 
        d="M 18 54 C 18 36, 30 25, 50 25 C 70 25, 82 36, 82 54 C 82 70, 69 77, 50 77 C 31 77, 18 70, 18 54 Z" 
        fill={`url(#${g("head")})`} 
        filter={`url(#${g("depth-shadow")})`}
      />

      {/* 4. Ambient Nebular Face Highlights (Replaces standard pink blush) */}
      <g filter={`url(#${g("blush-blur")})`} opacity="0.3">
        <circle cx="28" cy="60" r="4.5" fill="#5CF1FF" />
        <circle cx="72" cy="60" r="4.5" fill="#5CF1FF" />
      </g>

      {/* 5. Facial Structure: Seamless Muzzle Basin */}
      <path 
        d="M 35 63 C 35 55, 65 55, 65 63 C 65 71, 58 74, 50 74 C 42 74, 35 71, 35 63 Z" 
        fill={`url(#${g("muzzle")})`} 
      />

      {/* 6. Expression System: Calm, Glowing Round Cyan Lenses */}
      <g filter={`url(#${g("depth-shadow")})`}>
        {/* Left Eye Segment */}
        <ellipse cx="36" cy="49" rx="5.5" ry="4.5" fill={`url(#${g("eye-glow")})`} />
        <circle cx="36" cy="49" r="1.8" fill="#0C091A" />
        <circle cx="34.8" cy="47.8" r="1.2" fill="#FFFFFF" />

        {/* Right Eye Segment */}
        <ellipse cx="64" cy="49" rx="5.5" ry="4.5" fill={`url(#${g("eye-glow")})`} />
        <circle cx="64" cy="49" r="1.8" fill="#0C091A" />
        <circle cx="62.8" cy="47.8" r="1.2" fill="#FFFFFF" />
      </g>

      {/* 7. Obsidian Nose & Calm Feline Mouth Vector */}
      <polygon points="48 57, 52 57, 50 59.5" fill="#0C091A" />
      <path d="M 45 64 Q 50 67, 55 64" fill="none" stroke="#4A4475" strokeWidth="1.75" strokeLinecap="round" />

      {/* 8. Luxury Edge Specular Reflection Crescent */}
      <path 
        d="M 21 48 C 21 36, 32 27, 50 27 C 55 27, 41 37, 31 49 C 26 54, 21 53, 21 48 Z" 
        fill="#FFFFFF" 
        opacity="0.15" 
        pointerEvents="none"
      />
    </AvatarBase>
  );
}