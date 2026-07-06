import React, { useId } from "react";
import { AvatarBase } from "./AvatarBase";



// Futuristic Cyber Ninja Mask
export function NinjaAvatar({ size, ...props }) {
  const uid = useId();
  const g = (n) => `ninja-${n}-${uid}`;

  return (
    <AvatarBase
      size={size}
      background={["#090A10", "#16192B"]}
      defs={
        <>
          {/* Matte Stealth Carbon Cowl Gradient */}
          <linearGradient id={g("hood")} x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#2E3545" />
            <stop offset="50%" stopColor="#1E222F" />
            <stop offset="100%" stopColor="#0D0F16" />
          </linearGradient>

          {/* Deep Cavity Void Gradient */}
          <linearGradient id={g("inner")} x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#11141E" />
            <stop offset="100%" stopColor="#05060A" />
          </linearGradient>

          {/* Neural-Link Forehead Band Casing */}
          <linearGradient id={g("band")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Cybernetic Reinforced Poly-Steel Plate */}
          <linearGradient id={g("metal")} x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="30%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Emissive Neon Cyan Laser Optics */}
          <linearGradient id={g("cyan-glow")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#00F5FF" />
          </linearGradient>

          {/* High-Contrast Structural Drop Shadow */}
          <filter id={g("cyber-shadow")} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.8" />
          </filter>

          {/* Emissive Ocular Neon Blur Filter */}
          <filter id={g("laser-bloom")} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00F5FF" floodOpacity="0.9" />
          </filter>
        </>
      }
      {...props}
    >
      {/* 1. Tactical High-Collar & Body Silhouette Base */}
      <g filter={`url(#${g("cyber-shadow")})`}>
        <path d="M 26 70 L 16 92 L 84 92 L 74 70 Z" fill="#0D111A" />
        {/* Armor Plate Segment Lines on Shoulders */}
        <path d="M 32 76 L 24 92 M 68 76 L 76 92" stroke="#1E293B" strokeWidth="1.5" />
      </g>

      {/* 2. Aerodynamic Outer Stealth Cowl */}
      <path
        d="
          M 24 46
          Q 25 16 50 14
          Q 75 16 76 46
          L 73 68
          Q 62 85 50 87
          Q 38 85 27 68
          Z
        "
        fill={`url(#${g("hood")})`}
        filter={`url(#${g("cyber-shadow")})`}
      />

      {/* 3. Outer Armor Plate Facets (Adds angular paneling to cowl) */}
      <path d="M 25 36 Q 36 22 50 20" stroke="#475569" strokeWidth="1" fill="none" opacity="0.25" />
      <path d="M 75 36 Q 64 22 50 20" stroke="#475569" strokeWidth="1" fill="none" opacity="0.25" />

      {/* 4. Deep Face Cavity / Inner Visor Bay */}
      <path
        d="
          M 31 46
          Q 50 34 69 46
          L 66 68
          Q 50 78 34 68
          Z
        "
        fill={`url(#${g("inner")})`}
      />

      {/* 5. Neural-Link Forehead Module Assembly */}
      <g filter={`url(#${g("cyber-shadow")})`}>
        {/* Casing wrap */}
        <path
          d="M 29 34 Q 50 26 71 34 L 69 43 Q 50 36 31 43 Z"
          fill={`url(#${g("band")})`}
        />
        {/* Central Optic Node / Processing Core */}
        <rect
          x="41"
          y="31"
          width="18"
          height="10"
          rx="2"
          fill={`url(#${g("metal")})`}
        />
        {/* Laser-etched alignment sigils */}
        <line x1="50" y1="31" x2="50" y2="41" stroke="#1E293B" strokeWidth="1" opacity="0.5" />
        <circle cx="45" cy="36" r="1" fill="#00F5FF" filter={`url(#${g("laser-bloom")})`} />
        <circle cx="55" cy="36" r="1" fill="#00F5FF" filter={`url(#${g("laser-bloom")})`} />
      </g>

      {/* 6. Razor-Sharp Neon Ocular Visors (The Eyes) */}
      <g filter={`url(#${g("cyber-shadow")})`}>
        {/* Left Threatening Optic Arc */}
        <path
          d="M 35 48 C 39 45, 44 46, 47 49 C 43 51, 38 51, 35 48 Z"
          fill="url(#cyan-glow)"
          filter={`url(#${g("laser-bloom")})`}
        />
        {/* Right Threatening Optic Arc */}
        <path
          d="M 65 48 C 61 45, 56 46, 53 49 C 57 51, 62 51, 65 48 Z"
          fill="url(#cyan-glow)"
          filter={`url(#${g("laser-bloom")})`}
        />
      </g>

      {/* 7. Cybernetic Lower-Face Breather / Filtration Mask */}
      <g filter={`url(#${g("cyber-shadow")})`}>
        {/* Main Lower Mask Plating */}
        <path
          d="M 33 56 Q 50 51 67 56 L 62 73 L 50 81 L 38 73 Z"
          fill="#1E2230"
        />
        {/* Center Triangular Exhaust Vent Grid */}
        <path
          d="M 46 59 L 54 59 L 52 74 L 48 74 Z"
          fill="#090A10"
        />
        {/* High-Tech Horizontal Intake Grille Lines */}
        <line x1="47" y1="62" x2="53" y2="62" stroke="#475569" strokeWidth="1" />
        <line x1="48" y1="66" x2="52" y2="66" stroke="#475569" strokeWidth="1" />
        <line x1="49" y1="70" x2="51" y2="70" stroke="#475569" strokeWidth="1" />
        
        {/* Angular Jawline Accent Overlays */}
        <path d="M 35 58 L 41 68" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M 65 58 L 59 68" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* 8. Premium Micro-Specular Gloss Overlay */}
      {/* Dynamic ambient highlight arc across top left cowl */}
      <path
        d="M 30 22 C 38 18, 48 18, 58 20"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.25"
      />
    </AvatarBase>
  );
}




// Red & Black Cyber Samurai Mask
export function SamuraiAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#0A0A12", "#161520"]} {...props}>
      <defs>
        {/* Tactical Matte Black Armor Gradient */}
        <linearGradient id="mask-black" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="40%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#030712" />
        </linearGradient>

        {/* Glossy Lacquer Crimson Armor Gradient */}
        <linearGradient id="mask-red" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#B91C1C" />
          <stop offset="100%" stopColor="#450A0A" />
        </linearGradient>

        {/* High-Frequency Gold Crest */}
        <linearGradient id="holo-gold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        {/* Cyan Ocular Energy Core */}
        <linearGradient id="laser-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>

        {/* Premium Layer Separation Depth Shadow */}
        <filter id="samurai-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.8" />
        </filter>

        {/* Ocular Visor Laser Bloom Glow */}
        <filter id="laser-bloom" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#22D3EE" floodOpacity="0.95" />
        </filter>
      </defs>

      {/* 1. Tiered Cyber Neck Slats (Shikoro Flaps) */}
      <g filter="url(#samurai-shadow)">
        <path d="M 24 46 Q 10 64 16 80 L 32 76 L 30 56 Z" fill="#111827" />
        <path d="M 20 54 Q 10 68 18 82 L 34 78 L 30 62 Z" fill="url(#mask-red)" opacity="0.4" />
        <path d="M 76 46 Q 90 64 84 80 L 68 76 L 70 56 Z" fill="#111827" />
        <path d="M 80 54 Q 90 68 82 82 L 66 78 L 70 62 Z" fill="url(#mask-red)" opacity="0.4" />
      </g>

      {/* 2. Main Helmet Dome (Kabuto Core - Matte Black with Crimson Crest Trim) */}
      <path
        d="M 22 44 C 22 13, 78 13, 78 44 C 78 50, 73 53, 67 53 C 50 55, 50 55, 33 53 C 27 53, 22 50, 22 44 Z"
        fill="url(#mask-black)"
        filter="url(#samurai-shadow)"
      />

      {/* Heavy Ballistic Brow Visor Rim (Crimson Accent) */}
      <path 
        d="M 21 43 Q 50 49 79 43 L 76 49 Q 50 55 24 49 Z" 
        fill="url(#mask-red)" 
        filter="url(#samurai-shadow)"
      />

      {/* 3. Deep-Set Optical Cavity Backing */}
      <path d="M 28 47 Q 50 52 72 47 L 68 56 Q 50 60 32 56 Z" fill="#090D16" />

      {/* 4. Menpō Face Mask Armor (The Core Red and Black Design) */}
      <g filter="url(#samurai-shadow)">
        {/* Outer Red Flared Cheek Plates */}
        <path
          d="M 29 53 C 29 53, 24 65, 32 78 C 38 88, 62 88, 68 78 C 76 65, 71 53, 71 53 C 65 55, 58 55, 50 55 C 42 55, 35 55, 29 53 Z"
          fill="url(#mask-red)"
        />

        {/* Interlocking Inner Matte-Black Mandible Centerpiece */}
        <path
          d="M 34 56 C 34 56, 31 66, 36 75 C 41 82, 59 82, 64 75 C 69 66, 66 56, 66 56 C 60 58, 55 58, 50 58 C 45 58, 40 58, 34 56 Z"
          fill="url(#mask-black)"
        />
        
        {/* Angular Geometric Nose Guard (Sleek Matte Black) */}
        <path
          d="M 43 55 L 50 46 L 57 55 L 52 64 L 48 64 Z"
          fill="#0F172A"
        />
        {/* Crimson Center Nose Bridge Seam */}
        <path d="M 50 46 L 50 64" stroke="#EF4444" strokeWidth="1.5" />
        
        {/* Cyber Oni Vent Grille (Exhaust Slat System) */}
        <path d="M 41 67 L 44 75 L 56 75 L 59 67 Z" fill="#090D16" />
        {/* Crimson Energy Mesh Fangs */}
        <line x1="45" y1="70" x2="55" y2="70" stroke="#EF4444" strokeWidth="1.5" />
        <line x1="47" y1="73" x2="53" y2="73" stroke="#EF4444" strokeWidth="1.5" />

        {/* Chiseled Hexagonal Crimson Chin Guard */}
        <path d="M 42 79 L 50 86 L 58 79 L 50 80 Z" fill="url(#mask-red)" />
      </g>

      {/* 5. Razor-Sharp Cyan Cyber Optics (Piercing through the Dark Sockets) */}
      <g filter="url(#laser-bloom)">
        {/* Left Targeting Slit */}
        <path d="M 32 49 Q 40 52 46 48" stroke="url(#laser-cyan)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Right Targeting Slit */}
        <path d="M 68 49 Q 60 52 54 48" stroke="url(#laser-cyan)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>

      {/* 6. V-Wing Gold Horn Crest (Maedate Assembly) */}
      <g filter="url(#samurai-shadow)">
        <path
          d="M 50 40 L 72 12 L 62 12 L 50 29 L 38 12 L 28 12 Z"
          fill="url(#holo-gold)"
        />
        <path d="M 50 33 L 64 15 L 61 15 L 50 30 L 39 15 L 36 15 Z" fill="#FFFFFF" opacity="0.3" />
        
        {/* Centerpiece Attachment Hub */}
        <path d="M 50 34 L 54 40 L 50 46 L 46 40 Z" fill="#1E293B" />
        <circle cx="50" cy="40" r="1.5" fill="#22D3EE" filter="url(#laser-bloom)" />
      </g>

      {/* 7. Premium Surface Glare Overlay */}
      {/* Top Left Deflection Highlight */}
      <path
        d="M 30 20 C 40 15, 55 16, 62 19"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.15"
      />
      {/* High-Gleam Cheek Highlights */}
      <path d="M 27 57 L 24 64" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.2" />
      <path d="M 73 57 L 76 64" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.2" />
    </AvatarBase>
  );
}




// Oni Mask
export function OniAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#0B0F19", "#1E1B4B"]} {...props}>
      <defs>
        {/* Deep Demonic Crimson Gradient */}
        <linearGradient id="oni-skin-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="40%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>

        {/* Ivory/Bone Horn Gradient */}
        <linearGradient id="horn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDFBF7" />
          <stop offset="60%" stopColor="#E5E7EB" />
          <stop offset="100%" stopColor="#9CA3AF" />
        </linearGradient>

        {/* Gold Accent Gradient */}
        <linearGradient id="oni-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Shadow Filter for App-UI Depth */}
        <filter id="oni-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* 1. Powerful Sweeping Horns (Placed behind head) */}
      <g filter="url(#oni-shadow)">
        {/* Left Horn */}
        <path 
          d="M 34 36 C 26 28, 14 26, 16 10 C 22 18, 30 26, 38 30 Z" 
          fill="url(#horn-grad)" 
        />
        {/* Left Horn Base Shadow */}
        <path d="M 34 36 C 30 32, 24 28, 22 22" stroke="#4B5563" strokeWidth="1" fill="none" opacity="0.3" />

        {/* Right Horn */}
        <path 
          d="M 66 36 C 74 28, 86 26, 84 10 C 78 18, 70 26, 62 30 Z" 
          fill="url(#horn-grad)" 
        />
        {/* Right Horn Base Shadow */}
        <path d="M 66 36 C 70 32, 76 28, 78 22" stroke="#4B5563" strokeWidth="1" fill="none" opacity="0.3" />
      </g>

      {/* 2. Main Face Structure */}
      <g filter="url(#oni-shadow)">
        <path
          d="M 26 38 C 26 38, 22 54, 25 64 C 28 74, 38 84, 50 86 C 62 84, 72 74, 75 64 C 78 54, 74 38, 74 38 C 64 41, 58 41, 50 41 C 42 41, 36 41, 26 38 Z"
          fill="url(#oni-skin-grad)"
        />
      </g>

      {/* 3. Aggressive Furrowed Brow Ridge */}
      <path
        d="M 25 43 Q 50 52 75 43 Q 50 36 25 43 Z"
        fill="#991B1B"
        filter="url(#oni-shadow)"
      />
      {/* Center scowl line lines */}
      <path d="M 48 41 Q 50 46 52 41" stroke="#450A0A" strokeWidth="1.5" fill="none" />

      {/* 4. Menacing Slanted Eyes */}
      {/* Left Eye Recess & Glow */}
      <path d="M 31 48 Q 40 52 45 47 Q 38 46 31 48 Z" fill="#000" />
      <path d="M 34 48.5 Q 39 50.5 43 48" stroke="url(#oni-gold)" strokeWidth="2" strokeLinecap="round" fill="none" />
      
      {/* Right Eye Recess & Glow */}
      <path d="M 69 48 Q 60 52 55 47 Q 62 46 69 48 Z" fill="#000" />
      <path d="M 66 48.5 Q 61 50.5 57 48" stroke="url(#oni-gold)" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* 5. Flared Demonic Nose */}
      <path
        d="M 45 52 L 50 47 L 55 52 L 54 59 Q 50 61 46 59 Z"
        fill="#991B1B"
      />
      {/* Nostril depth */}
      <path d="M 46 58 Q 50 56 54 58" stroke="#450A0A" strokeWidth="1.5" fill="none" />

      {/* 6. Iconic Snarl & Fangs */}
      <g>
        {/* Mouth Background Recess */}
        <path d="M 34 66 Q 50 74 66 66 Q 50 63 34 66 Z" fill="#111827" />

        {/* Top Fangs (Pointing Down) */}
        <path d="M 37 65 L 40 70 L 42 66 Z" fill="#FDFBF7" />
        <path d="M 63 65 L 60 70 L 58 66 Z" fill="#FDFBF7" />

        {/* Bottom Prominent Upward Tusks */}
        <path d="M 35 69 L 38 61 L 42 67 Z" fill="#FDFBF7" filter="url(#oni-shadow)" />
        <path d="M 65 69 L 62 61 L 58 67 Z" fill="#FDFBF7" filter="url(#oni-shadow)" />

        {/* Gold Lip Accent Line */}
        <path d="M 33 66 Q 50 75 67 66" stroke="url(#oni-gold)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
      </g>

      {/* 7. High-End UI Polish & Edge Highlights */}
      {/* Forehead Ambient Glare */}
      <path
        d="M 34 39 Q 50 43 66 39"
        stroke="#F87171"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />
      {/* Cheek Bone Highlights */}
      <path d="M 26 56 Q 24 64 29 70" stroke="#F87171" strokeWidth="1" fill="none" opacity="0.25" />
      <path d="M 74 56 Q 76 64 71 70" stroke="#F87171" strokeWidth="1" fill="none" opacity="0.25" />
    </AvatarBase>
  );
}








// Cyberpunk Mask
export function CyberpunkAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#060214", "#160833"]} {...props}>
      <defs>
        {/* Neon Cyan Emissive Glow */}
        <linearGradient id="neon-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>

        {/* Techwear Matte Dark Hardware */}
        <linearGradient id="techwear-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1F2937" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>

        {/* Cyber Carbon/Plating Gradient */}
        <linearGradient id="cyber-plate" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4B5563" />
          <stop offset="100%" stopColor="#1F2937" />
        </linearGradient>

        {/* UI Glow Filter */}
        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#06B6D4" floodOpacity="0.8" />
        </filter>

        {/* Standard Hardware Drop Shadow */}
        <filter id="tech-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.7" />
        </filter>
      </defs>

      {/* 1. Techwear High-Collar Jacket & Sub-Layers */}
      <g filter="url(#tech-shadow)">
        {/* Inner Cyber-Neck Base */}
        <path d="M 40 65 L 40 85 L 60 85 L 60 65 Z" fill="#0F172A" />
        <path d="M 46 68 L 46 80 M 54 68 L 54 80" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />

        {/* Main Jacket Shoulders/Back Base */}
        <path d="M 15 100 C 20 85, 35 80, 42 82 L 50 90 L 58 82 C 65 80, 80 85, 85 100 Z" fill="#0b0f17" />

        {/* High-Tech Left Collar Flap */}
        <path d="M 22 100 L 36 68 L 46 82 L 36 100 Z" fill="url(#techwear-dark)" />
        <line x1="26" y1="95" x2="36" y2="73" stroke="#374151" strokeWidth="1.5" />

        {/* High-Tech Right Collar Flap */}
        <path d="M 78 100 L 64 68 L 54 82 L 64 100 Z" fill="url(#techwear-dark)" />
        <line x1="74" y1="95" x2="64" y2="73" stroke="#374151" strokeWidth="1.5" />
      </g>

      {/* 2. Cybernetic Face Base (Sleek Undermask Geometry) */}
      <g filter="url(#tech-shadow)">
        <path
          d="M 31 32 C 31 32, 29 55, 34 68 C 38 78, 44 82, 50 83 C 56 82, 62 78, 66 68 C 71 55, 69 32, 69 32 Z"
          fill="url(#cyber-plate)"
        />
        {/* Left Cheek Cybernetic Panel Seam */}
        <path d="M 32 48 Q 40 55 42 68" stroke="#111827" strokeWidth="1.5" fill="none" opacity="0.5" />
        {/* Right Cheek Cybernetic Panel Seam */}
        <path d="M 68 48 Q 60 55 58 68" stroke="#111827" strokeWidth="1.5" fill="none" opacity="0.5" />
      </g>

      {/* 3. Angular Techwear Respirator / Half-Mask */}
      <g filter="url(#tech-shadow)">
        {/* Main Breathing Guard Plate */}
        <path
          d="M 35 56 L 50 63 L 65 56 L 62 74 L 50 83 L 38 74 Z"
          fill="#111827"
        />
        {/* Center Tech Mesh Vent */}
        <path d="M 46 64 L 50 61 L 54 64 L 53 74 L 50 78 L 47 74 Z" fill="#1E2937" />
        {/* Horizontal Vent Grill Lines */}
        <line x1="47" y1="66" x2="53" y2="66" stroke="#000" strokeWidth="1.5" />
        <line x1="48" y1="70" x2="52" y2="70" stroke="#000" strokeWidth="1.5" />
        <line x1="49" y1="74" x2="51" y2="74" stroke="#000" strokeWidth="1.5" />

        {/* Left and Right Emissive Status Indicator Dots */}
        <circle cx="41" cy="63" r="1.5" fill="#22D3EE" filter="url(#neon-glow)" />
        <circle cx="59" cy="63" r="1.5" fill="#22D3EE" filter="url(#neon-glow)" />
      </g>

      {/* 4. High-End Ocular Wrap-Around HUD Visor */}
      <g filter="url(#tech-shadow)">
        {/* Visor Outer Frame Structure */}
        <path d="M 25 38 L 50 42 L 75 38 L 73 53 L 50 57 L 27 53 Z" fill="#030712" />
        
        {/* Glowing Visor Screen Layer */}
        <path 
          d="M 27 40 L 50 44 L 73 40 L 71 51 L 50 55 L 29 51 Z" 
          fill="url(#neon-cyan)" 
          filter="url(#neon-glow)"
          opacity="0.9"
        />

        {/* Digital HUD Elements (Visor Graphics) */}
        {/* Horizontal Boot Scanning Line */}
        <line x1="32" y1="45" x2="68" y2="45" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
        {/* Crosshair / Targeting Bracket Artifacts */}
        <path d="M 36 42 L 34 42 L 34 47" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.8" />
        <path d="M 64 42 L 66 42 L 66 47" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.8" />
        {/* Micro Digital Audio-Wave / Matrix Blocks */}
        <rect x="48" y="48" width="4" height="2" fill="#FFFFFF" opacity="0.7" />
        <rect x="43" y="48" width="2" height="2" fill="#FFFFFF" opacity="0.5" />
        <rect x="55" y="48" width="2" height="2" fill="#FFFFFF" opacity="0.5" />
      </g>

      {/* 5. Sleek Tactical Side Audio/Augmentation Nodes */}
      {/* Left Node */}
      <path d="M 26 40 Q 20 45 25 52 Z" fill="#374151" filter="url(#tech-shadow)" />
      {/* Right Node */}
      <path d="M 74 40 Q 80 45 75 52 Z" fill="#374151" filter="url(#tech-shadow)" />

      {/* 6. Top Head Asymmetric Cyberware Trim */}
      <path
        d="M 31 32 C 38 18, 62 18, 69 32 L 67 34 C 60 22, 40 22, 33 34 Z"
        fill="#1F2937"
        opacity="0.8"
      />
      {/* Premium Top Glare Rim */}
      <path
        d="M 36 24 C 44 20, 56 20, 64 24"
        stroke="#F43F5E"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
    </AvatarBase>
  );
}








// Masquerade Mask
export function MasqueradeAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#0F051D", "#260E3D"]} {...props}>
      <defs>
        {/* Royal Velvet Purple Gradient */}
        <linearGradient id="velvet-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D946EF" />
          <stop offset="40%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>

        {/* Polished Luxury Gold Gradient */}
        <linearGradient id="masq-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="30%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        {/* Premium Depth Shadow */}
        <filter id="masq-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.65" />
        </filter>
        
        {/* Micro-Shadow for Layered Gold Accents */}
        <filter id="gold-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* 1. Elegant Silk Background Ribbon Ties (Softly floating behind mask) */}
      <g opacity="0.4">
        <path d="M 24 52 C 10 54, 4 68, 8 76" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 76 52 C 90 54, 96 68, 92 76" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>

      {/* 2. Main Venetian Mask Body (Sweeping Butterfly Silhouette) */}
      <path
        d="M 50 42 C 43 32, 34 26, 28 26 C 18 26, 12 34, 14 42 C 16 52, 26 62, 34 66 C 42 70, 47 71, 50 71 C 53 71, 58 70, 66 66 C 74 62, 84 52, 86 42 C 88 34, 82 26, 72 26 C 66 26, 57 32, 50 42 Z"
        fill="url(#velvet-grad)"
        filter="url(#masq-shadow)"
      />

      {/* 3. Intricate Ornate Gold Outer Filigree Rim */}
      <path
        d="M 50 43 C 44 34, 35 28, 29 28 C 20 28, 14 35, 16 42 C 18 51, 27 60, 35 64 C 42 68, 47 69, 50 69 C 53 69, 58 68, 66 64 C 74 60, 83 51, 85 42 C 87 35, 81 28, 71 28 C 65 28, 56 34, 50 43 Z"
        stroke="url(#masq-gold)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.85"
      />

      {/* 4. Elegant Center Brow Crest Ornament */}
      <g filter="url(#gold-shadow)">
        {/* Central Marquee Flourish */}
        <path d="M 50 41 L 55 24 L 50 29 L 45 24 Z" fill="url(#masq-gold)" />
        {/* Secondary side leaf flourishes */}
        <path d="M 50 38 Q 44 30 37 32 Q 44 36 50 38 Z" fill="url(#masq-gold)" opacity="0.9" />
        <path d="M 50 38 Q 56 30 63 32 Q 56 36 50 38 Z" fill="url(#masq-gold)" opacity="0.9" />
        {/* Centerpiece Core Jewel */}
        <circle cx="50" cy="35" r="2" fill="#F472B6" />
      </g>

      {/* 5. Mysterious Almond Eye Cutouts & Shimmer */}
      {/* Left Eye Cavity */}
      <g filter="url(#gold-shadow)">
        <path d="M 26 47 C 30 40, 41 42, 44 49 C 40 54, 30 54, 26 47 Z" fill="#0A0518" />
        {/* Left Mysterious Shimmer Gaze */}
        <path d="M 29 47.5 Q 35 44.5 40 48" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>

      {/* Right Eye Cavity */}
      <g filter="url(#gold-shadow)">
        <path d="M 74 47 C 70 40, 59 42, 56 49 C 60 54, 70 54, 74 47 Z" fill="#0A0518" />
        {/* Right Mysterious Shimmer Gaze */}
        <path d="M 71 47.5 Q 65 44.5 60 48" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>

      {/* 6. Sculpted Nose Bridge Accent */}
      <path
        d="M 50 45 L 47 58 L 50 63 L 53 58 Z"
        fill="url(#masq-gold)"
        filter="url(#gold-shadow)"
      />

      {/* 7. High-End UI Polish & Lace Decals */}
      {/* Subtle laser etched lace textures on cheeks */}
      <path d="M 22 46 Q 26 54 32 54" stroke="#E9D5FF" strokeWidth="0.75" fill="none" opacity="0.25" />
      <path d="M 78 46 Q 74 54 68 54" stroke="#E9D5FF" strokeWidth="0.75" fill="none" opacity="0.25" />

      {/* Top-Left Ambient Highlight */}
      <path
        d="M 26 29 C 32 27, 40 31, 44 36"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
    </AvatarBase>
  );
}




// Skull Mask
export function SkullAvatar({ size, ...props }) {
  return (
    <AvatarBase size={size} background={["#0A0A0F", "#171725"]} {...props}>
      <defs>
        {/* Sleek Ballistic Titanium-Bone Plating */}
        <linearGradient id="cyber-bone" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>

        {/* Industrial Dark Mechanical Core */}
        <linearGradient id="chassis-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* Emissive Amber Tactical Glow */}
        <linearGradient id="amber-glow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        {/* High-End UI Component Dropshadow */}
        <filter id="cyber-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.75" />
        </filter>

        {/* Emissive Ocular Neon Glow */}
        <filter id="neon-amber" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#F97316" floodOpacity="0.9" />
        </filter>
      </defs>

      {/* 1. Underlying Mechanical Chassis & Neck Port */}
      <g filter="url(#cyber-shadow)">
        <path d="M 38 65 L 34 88 L 66 88 L 62 65 Z" fill="#090D16" />
        {/* Cybernetic Neck Spine Hydraulic Slat */}
        <rect x="47" y="68" width="6" height="16" rx="1" fill="#475569" opacity="0.5" />
      </g>

      {/* 2. Lower Mechanical Mandible (Segmented Tactical Jaw) */}
      <g filter="url(#cyber-shadow)">
        <path
          d="M 34 62 L 66 62 L 63 81 L 50 87 L 37 81 Z"
          fill="url(#chassis-dark)"
        />
        
        {/* High-Tech Teeth/Grill Vent Matrix */}
        {/* Center Teeth Slats */}
        <rect x="48" y="65" width="4" height="10" rx="1" fill="url(#cyber-bone)" />
        <rect x="42" y="65" width="4" height="8" rx="1" fill="url(#cyber-bone)" />
        <rect x="54" y="65" width="4" height="8" rx="1" fill="url(#cyber-bone)" />
        {/* Outer Laser-Etched Mandible Accent Lines */}
        <path d="M 38 72 L 40 76 M 62 72 L 60 76" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* 3. Main Skull Cranium & Flared Cheekbones (Zygomatic Arch) */}
      <g filter="url(#cyber-shadow)">
        <path
          d="M 26 40 C 26 15, 74 15, 74 40 C 74 52, 71 58, 67 60 L 33 60 C 29 58, 26 52, 26 40 Z"
          fill="url(#cyber-bone)"
        />
        {/* Asymmetric Structural Forehead Armor Panel Seam */}
        <path d="M 50 18 C 46 26, 46 32, 36 36" stroke="#475569" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M 50 18 L 50 28" stroke="#475569" strokeWidth="1" fill="none" opacity="0.4" />
      </g>

      {/* 4. Threatening Angular Eye Sockets & Emissive HUD HUD Cores */}
      {/* Left Deep Eye Socket Wall */}
      <g filter="url(#cyber-shadow)">
        <path d="M 31 38 L 47 42 L 45 52 L 33 48 Z" fill="#0F172A" />
        {/* Left Floating Target Rect Gaze */}
        <path d="M 35 44 L 41 45.5" stroke="url(#amber-glow-grad)" strokeWidth="2.5" strokeLinecap="round" filter="url(#neon-amber)" />
        <circle cx="43" cy="46" r="1" fill="#FFF" filter="url(#neon-amber)" />
      </g>

      {/* Right Deep Eye Socket Wall */}
      <g filter="url(#cyber-shadow)">
        <path d="M 69 38 L 53 42 L 55 52 L 67 48 Z" fill="#0F172A" />
        {/* Right Floating Target Rect Gaze */}
        <path d="M 65 44 L 59 45.5" stroke="url(#amber-glow-grad)" strokeWidth="2.5" strokeLinecap="round" filter="url(#neon-amber)" />
        <circle cx="57" cy="46" r="1" fill="#FFF" filter="url(#neon-amber)" />
      </g>

      {/* 5. Geometric Inverted-V Nose Air Bypass Filtration Port */}
      <g filter="url(#cyber-shadow)">
        <path
          d="M 45 49 L 50 43 L 55 49 L 53 58 L 47 58 Z"
          fill="#1E2937"
        />
        {/* Inner Carbon Honeycomb Mesh Line Split */}
        <line x1="50" y1="45" x2="50" y2="56" stroke="#000000" strokeWidth="1.5" opacity="0.7" />
        <line x1="47" y1="52" x2="53" y2="52" stroke="#000000" strokeWidth="1" opacity="0.5" />
      </g>

      {/* 6. Premium Specular Highlights & App-UI Glare Rim */}
      {/* Top Left Shell Highlight */}
      <path
        d="M 32 22 C 42 17, 58 17, 66 21"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />

      {/* Right Temporal Shadow Accent Overlay */}
      <path
        d="M 66 24 C 71 30, 72 40, 70 48"
        stroke="#94A3B8"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />

      {/* Cheekbone Flare Highlights */}
      <path d="M 28 50 Q 26 56 32 58" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M 72 50 Q 74 56 68 58" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.3" />
    </AvatarBase>
  );
}