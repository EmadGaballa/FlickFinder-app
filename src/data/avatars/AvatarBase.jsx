import React from "react";

/**
 * ============================================================
 * AvatarBase
 *
 * Shared rendering engine for every FlickFinder avatar.
 *
 * Responsibilities:
 *
 * • Rounded square background
 * • Premium background gradients
 * • Soft ambient shadow
 * • Optional glow
 * • Shared clip path
 * • Shared defs
 *
 * Individual avatars only draw their own face.
 *
 * ============================================================
 */

export function AvatarBase({
  size = 100,

  children,

  className = "",

  style = {},

  //---------------------------------------
  // Background
  //---------------------------------------

  background = ["#5B8CFF", "#8B5CF6"],

  showBackground = true,

  //---------------------------------------
  // Effects
  //---------------------------------------

  glowColor = null,

  shadow = true,

  //---------------------------------------
  // Extra defs supplied by avatars
  //---------------------------------------

  defs,
}) {
  const id = React.useMemo(() => Math.random().toString(36).slice(2), []);

  const bgGradient = `bg-${id}`;

  const clipId = `clip-${id}`;

  const shadowId = `shadow-${id}`;

  const glowId = `glow-${id}`;

  const innerHighlight = `inner-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-8 -8 116 116"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        display: "block",
        overflow: "visible",
        ...style,
      }}
    >
      <defs>
        {/* =======================================
             Background Gradient
        ======================================== */}

        <linearGradient
          id={bgGradient}
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={background[0]} />

          <stop offset="100%" stopColor={background[1]} />
        </linearGradient>

        {/* =======================================
             Rounded clipping mask
        ======================================== */}
        <clipPath id={clipId}>
          <rect x="0" y="0" width="100" height="100" rx="22" />
        </clipPath>
        {/* =======================================
             Ambient Shadow
        ======================================== */}

        <filter id={shadowId} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.28" />
        </filter>

        {/* =======================================
             Optional Glow
        ======================================== */}

        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="blur" />

          <feMerge>
            <feMergeNode in="blur" />

            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* =======================================
             Soft Top Highlight
        ======================================== */}

        <linearGradient
          id={innerHighlight}
          x1="50"
          y1="4"
          x2="50"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".22" />

          <stop offset="28%" stopColor="#FFFFFF" stopOpacity=".08" />

          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* =======================================
             Avatar-specific defs
        ======================================== */}

        {defs}
      </defs>

      {/* ======================================================
           Optional Background
      ====================================================== */}

      {showBackground && (
        <g filter={shadow ? `url(#${shadowId})` : undefined}>
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="22"
            fill={`url(#${bgGradient})`}
          />

          {/* subtle glass highlight */}

          <path
            d="
              M10 10
              H90
              V28
              Q50 18 10 28
              Z
            "
            fill="white"
            opacity=".08"
          />

          {/* inner rim */}

          <rect
            x="4.5"
            y="4.5"
            width="91"
            height="91"
            rx="21.5"
            fill="none"
            stroke="white"
            strokeOpacity=".12"
          />

          {/* bottom vignette */}

          <ellipse cx="50" cy="88" rx="42" ry="16" fill="#000" opacity=".06" />

          {/* overall lighting */}

          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="22"
            fill={`url(#${innerHighlight})`}
          />
        </g>
      )}

      {/* ======================================================
           Avatar Artwork
      ====================================================== */}

      <g filter={glowColor ? `url(#${glowId})` : undefined}>{children}</g>

      {/* ======================================================
           Optional Glow Tint Overlay
           Gives glowing avatars (Panther, future Neon themes)
           a subtle colored bloom without affecting others.
      ====================================================== */}

      {glowColor && (
        <>
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="22"
            fill={glowColor}
            opacity=".035"
            pointerEvents="none"
          />

          <rect
            x="4.5"
            y="4.5"
            width="91"
            height="91"
            rx="21.5"
            fill="none"
            stroke={glowColor}
            strokeOpacity=".18"
            pointerEvents="none"
          />
        </>
      )}

      {/* ======================================================
           Tiny Specular Highlight
           Small details like this make icons feel less flat.
      ====================================================== */}

      <circle cx="28" cy="22" r="1.6" fill="#FFFFFF" opacity=".35" />

      <circle cx="72" cy="18" r=".8" fill="#FFFFFF" opacity=".22"></circle>
    </svg>
  );
}

export default AvatarBase;
