import React, { useId } from "react";
import { AvatarBase } from "./AvatarBase";

/**
 * ============================================================
 * Premium Animal Avatar Collection
 * ============================================================
 * Inspired by Apple app icons, SF Symbols, and modern design
 * systems. Each avatar is:
 *
 *   • Minimal and geometric
 *   • Instantly recognizable
 *   • Consistent in style and complexity
 *   • Soft, friendly, and approachable
 *   • Premium gradients with subtle depth
 *
 * Design Philosophy:
 * - Large, soft shapes
 * - Tiny, minimal facial features
 * - Generous negative space
 * - Rounded geometry everywhere
 * - No harsh lines or aggressive features
 * ============================================================
 */

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
      <circle cx={EYE_L.cx + 0.8} cy={EYE_L.cy - 0.8} r={radius * 0.35} fill="#FFFFFF" />
      <circle cx={EYE_R.cx + 0.8} cy={EYE_R.cy - 0.8} r={radius * 0.35} fill="#FFFFFF" />
    </>
  );
}

/** Soft, subtle blush - adds warmth without being distracting */
function SoftBlush({ color, opacity = 0.25 }) {
  return (
    <>
      <circle cx={CHEEK_L.cx} cy={CHEEK_L.cy} r="5.5" fill={color} opacity={opacity} />
      <circle cx={CHEEK_R.cx} cy={CHEEK_R.cy} r="5.5" fill={color} opacity={opacity} />
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
  return <ellipse cx="50" cy="38" rx="8" ry="3" fill="#FFFFFF" opacity="0.15" />;
}

// ======================================================
// FOX 🦊
// Warm amber-orange, cream accents, triangular ears
// ======================================================

export function FoxAvatar({ size, ...props }) {
  const uid = useId();
  const g = (name) => `fox-${name}-${uid}`;

  return (
    <AvatarBase
      size={size}
      background={["#FFB347", "#FF6B35"]}
      defs={
        <>
          <linearGradient id={g("head")} x1="24" y1="31" x2="76" y2="83" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFA040" />
            <stop offset="100%" stopColor="#F06520" />
          </linearGradient>
          <linearGradient id={g("muzzle")} x1="50" y1="58" x2="50" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF8EC" />
            <stop offset="100%" stopColor="#FFE4C4" />
          </linearGradient>
        </>
      }
      {...props}
    >
      {/* Soft triangular ears */}
      <path d="M 28 24 L 18 45 L 38 40 Z" fill="#E85D2C" />
      <path d="M 72 24 L 82 45 L 62 40 Z" fill="#E85D2C" />
      <path d="M 29.5 29 L 23 42 L 35 38 Z" fill="#FFD9BA" />
      <path d="M 70.5 29 L 77 42 L 65 38 Z" fill="#FFD9BA" />

      {/* Head */}
      <circle cx={HEAD.cx} cy={HEAD.cy} r={HEAD.r} fill={`url(#${g("head")})`} />

      <SoftBlush color="#FF8C42" opacity="0.3" />

      {/* Cream muzzle */}
      <ellipse cx="50" cy="67" rx="14" ry="11" fill={`url(#${g("muzzle")})`} />

      <PremiumEyes />

      {/* Tiny nose */}
      <ellipse cx="50" cy="63" rx="2.2" ry="1.8" fill="#2B170C" />

      <TinySmile color="#8B4513" y={70} />

      <SoftHighlight />
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
    <AvatarBase
      size={size}
      background={["#FFD6EA", "#FFB3D9"]}
      defs={
        <>
          <linearGradient id={g("head")} x1="24" y1="31" x2="76" y2="83" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8E8F0" />
          </linearGradient>
          <linearGradient id={g("ear")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F5DDE8" />
          </linearGradient>
        </>
      }
      {...props}
    >
      {/* Long rounded ears */}
      <rect x="27" y="5" width="11" height="32" rx="5.5" fill={`url(#${g("ear")})`} />
      <rect x="62" y="5" width="11" height="32" rx="5.5" fill={`url(#${g("ear")})`} />
      <rect x="29.5" y="10" width="6" height="22" rx="3" fill="#FFC3DE" />
      <rect x="64.5" y="10" width="6" height="22" rx="3" fill="#FFC3DE" />

      {/* Head */}
      <circle cx={HEAD.cx} cy={HEAD.cy} r={HEAD.r} fill={`url(#${g("head")})`} />

      <SoftBlush color="#FFB3D9" opacity="0.35" />

      <PremiumEyes />

      {/* Tiny nose */}
      <ellipse cx="50" cy="63" rx="2" ry="1.6" fill="#F07AA8" />

      <TinySmile color="#C97A9A" y={68} />

      <SoftHighlight />
    </AvatarBase>
  );
}

// ======================================================
// OWL 🦉
// Warm amber-brown, large friendly eyes, tiny beak
// ======================================================

export function OwlAvatar({ size, ...props }) {
  const uid = useId();
  const g = (name) => `owl-${name}-${uid}`;

  return (
    <AvatarBase
      size={size}
      background={["#FFCB84", "#E8862C"]}
      defs={
        <>
          <linearGradient id={g("head")} x1="24" y1="31" x2="76" y2="83" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D4A574" />
            <stop offset="100%" stopColor="#A67C52" />
          </linearGradient>
          <radialGradient id={g("eye")} cx="38%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#FFF8E8" />
            <stop offset="100%" stopColor="#F0C878" />
          </radialGradient>
        </>
      }
      {...props}
    >
      {/* Small feather tufts */}
      <path d="M 32 24 L 38 36 L 26 37 Z" fill="#A67C52" />
      <path d="M 68 24 L 62 36 L 74 37 Z" fill="#A67C52" />

      {/* Head */}
      <circle cx={HEAD.cx} cy={HEAD.cy} r={HEAD.r} fill={`url(#${g("head")})`} />

      {/* Facial disc */}
      <circle cx="50" cy="59" r="20" fill="#F5E6D3" />

      <SoftBlush color="#E8A860" opacity="0.2" />

      {/* Large round eyes (iconic owl feature) */}
      <circle cx={EYE_L.cx} cy={EYE_L.cy} r="9" fill="#FFFFFF" />
      <circle cx={EYE_R.cx} cy={EYE_R.cy} r="9" fill="#FFFFFF" />
      <circle cx={EYE_L.cx} cy={EYE_L.cy} r="5.5" fill={`url(#${g("eye")})`} />
      <circle cx={EYE_R.cx} cy={EYE_R.cy} r="5.5" fill={`url(#${g("eye")})`} />
      <circle cx={EYE_L.cx} cy={EYE_L.cy} r="2.4" fill="#1a1a1a" />
      <circle cx={EYE_R.cx} cy={EYE_R.cy} r="2.4" fill="#1a1a1a" />
      <circle cx={EYE_L.cx + 0.8} cy={EYE_L.cy - 0.8} r="0.9" fill="#FFFFFF" />
      <circle cx={EYE_R.cx + 0.8} cy={EYE_R.cy - 0.8} r="0.9" fill="#FFFFFF" />

      {/* Tiny beak */}
      <path d="M 50 66 L 46.5 70.5 L 50 69 L 53.5 70.5 Z" fill="#E08A2E" />

      <SoftHighlight />
    </AvatarBase>
  );
}

// ======================================================
// CAT 🐱
// Cool gray-blue, triangular ears, minimal features
// ======================================================

export function CatAvatar({ size, ...props }) {
  const uid = useId();
  const g = (name) => `cat-${name}-${uid}`;

  return (
    <AvatarBase
      size={size}
      background={["#C9D3E4", "#8C9AB8"]}
      defs={
        <>
          <linearGradient id={g("head")} x1="24" y1="31" x2="76" y2="83" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C4CEDF" />
            <stop offset="100%" stopColor="#98A5BE" />
          </linearGradient>
          <linearGradient id={g("muzzle")} x1="50" y1="58" x2="50" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EDF0F5" />
          </linearGradient>
        </>
      }
      {...props}
    >
      {/* Triangular ears */}
      <path d="M 30 24 L 20 46 L 39 40 Z" fill="#8894AC" />
      <path d="M 70 24 L 80 46 L 61 40 Z" fill="#8894AC" />
      <path d="M 31 29 L 25 41 L 36 37 Z" fill="#FFD3DE" />
      <path d="M 69 29 L 75 41 L 64 37 Z" fill="#FFD3DE" />

      {/* Head */}
      <circle cx={HEAD.cx} cy={HEAD.cy} r={HEAD.r} fill={`url(#${g("head")})`} />

      <SoftBlush color="#FFFFFF" opacity="0.4" />

      {/* Muzzle */}
      <ellipse cx="50" cy="68" rx="12" ry="9" fill={`url(#${g("muzzle")})`} />

      <PremiumEyes />

      {/* Tiny nose */}
      <ellipse cx="50" cy="63" rx="2" ry="1.6" fill="#F58CA8" />

      <TinySmile color="#6B7690" y={70} />

      <SoftHighlight />
    </AvatarBase>
  );
}

// ======================================================
// PANDA 🐼
// White face, black rounded ears, soft eye patches
// ======================================================

export function PandaAvatar({ size, ...props }) {
  const uid = useId();
  const g = (name) => `panda-${name}-${uid}`;

  return (
    <AvatarBase
      size={size}
      background={["#E8F5E9", "#A5D6A7"]}
      defs={
        <linearGradient id={g("head")} x1="24" y1="31" x2="76" y2="83" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5F5F5" />
        </linearGradient>
      }
      {...props}
    >
      {/* Rounded ears */}
      <circle cx="27" cy="27" r="10" fill="#2a2a2a" />
      <circle cx="73" cy="27" r="10" fill="#2a2a2a" />

      {/* Head */}
      <circle cx={HEAD.cx} cy={HEAD.cy} r={HEAD.r} fill={`url(#${g("head")})`} />

      {/* Soft eye patches */}
      <ellipse cx={EYE_L.cx} cy="55" rx="7.5" ry="9" fill="#2a2a2a" transform={`rotate(-10 ${EYE_L.cx} 55)`} />
      <ellipse cx={EYE_R.cx} cy="55" rx="7.5" ry="9" fill="#2a2a2a" transform={`rotate(10 ${EYE_R.cx} 55)`} />

      {/* Eyes */}
      <circle cx={EYE_L.cx} cy={EYE_L.cy} r="2.8" fill="#FFFFFF" />
      <circle cx={EYE_R.cx} cy={EYE_R.cy} r="2.8" fill="#FFFFFF" />
      <circle cx={EYE_L.cx} cy={EYE_L.cy} r="1.5" fill="#1a1a1a" />
      <circle cx={EYE_R.cx} cy={EYE_R.cy} r="1.5" fill="#1a1a1a" />
      <circle cx={EYE_L.cx + 0.5} cy={EYE_L.cy - 0.5} r="0.5" fill="#FFFFFF" />
      <circle cx={EYE_R.cx + 0.5} cy={EYE_R.cy - 0.5} r="0.5" fill="#FFFFFF" />

      <SoftBlush color="#FFB3C1" opacity="0.3" />

      {/* Nose */}
      <ellipse cx="50" cy="64" rx="3" ry="2.2" fill="#2a2a2a" />

      <TinySmile color="#4a4a4a" y={69} />

      <SoftHighlight />
    </AvatarBase>
  );
}

// ======================================================
// PANTHER 🐈‍⬛
// Dark navy, soft glowing cyan eyes, elegant and calm
// ======================================================

export function PantherAvatar({ size, ...props }) {
  const uid = useId();
  const g = (name) => `panther-${name}-${uid}`;

  return (
    <AvatarBase
      size={size}
      glowColor="#5CF1FF"
      background={["#2A2540", "#0B0914"]}
      defs={
        <>
          <linearGradient id={g("head")} x1="24" y1="31" x2="76" y2="83" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2d2845" />
            <stop offset="100%" stopColor="#0f0d1a" />
          </linearGradient>
          <radialGradient id={g("eye")} cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#E0FFFF" />
            <stop offset="100%" stopColor="#4FD8EC" />
          </radialGradient>
        </>
      }
      {...props}
    >
      {/* Soft rounded ears */}
      <path d="M 30 26 L 22 44 L 40 40 Z" fill="#181432" />
      <path d="M 70 26 L 78 44 L 60 40 Z" fill="#181432" />

      {/* Head */}
      <circle cx={HEAD.cx} cy={HEAD.cy} r={HEAD.r} fill={`url(#${g("head")})`} />

      <SoftBlush color="#5A5580" opacity="0.25" />

      {/* Subtle muzzle */}
      <ellipse cx="50" cy="68" rx="11" ry="8" fill="#191532" opacity="0.6" />

      {/* Soft glowing eyes - rounded and friendly */}
      <ellipse cx={EYE_L.cx} cy={EYE_L.cy} rx="4" ry="3.2" fill={`url(#${g("eye")})`} />
      <ellipse cx={EYE_R.cx} cy={EYE_R.cy} rx="4" ry="3.2" fill={`url(#${g("eye")})`} />
      <circle cx={EYE_L.cx} cy={EYE_L.cy} r="1.4" fill="#0a2226" />
      <circle cx={EYE_R.cx} cy={EYE_R.cy} r="1.4" fill="#0a2226" />
      <circle cx={EYE_L.cx + 0.7} cy={EYE_L.cy - 0.7} r="0.6" fill="#FFFFFF" />
      <circle cx={EYE_R.cx + 0.7} cy={EYE_R.cy - 0.7} r="0.6" fill="#FFFFFF" />

      {/* Nose */}
      <ellipse cx="50" cy="63" rx="2" ry="1.6" fill="#0a0814" />

      <TinySmile color="#3A3560" y={69} />

      <SoftHighlight />
    </AvatarBase>
  );
}