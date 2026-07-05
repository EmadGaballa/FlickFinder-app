// 24 built-in avatars organized in 4 categories × 6 each
const avatars = [
  // ── Animals (1-6) ──
  { id: "1", category: "Animals", label: "Happy Cat", emoji: "🐱", gradient: "linear-gradient(135deg, #FF6B6B, #FF8E8E)" },
  { id: "2", category: "Animals", label: "Sleepy Dog", emoji: "🐶", gradient: "linear-gradient(135deg, #4ECDC4, #6EE7DE)" },
  { id: "3", category: "Animals", label: "Clever Fox", emoji: "🦊", gradient: "linear-gradient(135deg, #FFA94D, #FFC078)" },
  { id: "4", category: "Animals", label: "Gentle Bear", emoji: "🐻", gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)" },
  { id: "5", category: "Animals", label: "Wise Owl", emoji: "🦉", gradient: "linear-gradient(135deg, #6366F1, #818CF8)" },
  { id: "6", category: "Animals", label: "Playful Rabbit", emoji: "🐰", gradient: "linear-gradient(135deg, #EC4899, #F472B6)" },

  // ── Futuristic People (7-12) ──
  { id: "7", category: "Futuristic", label: "Neon Agent", emoji: "🤖", gradient: "linear-gradient(135deg, #06B6D4, #22D3EE)" },
  { id: "8", category: "Futuristic", label: "Cyber Runner", emoji: "👾", gradient: "linear-gradient(135deg, #D946EF, #E879F9)" },
  { id: "9", category: "Futuristic", label: "Star Pilot", emoji: "👨‍🚀", gradient: "linear-gradient(135deg, #3B82F6, #60A5FA)" },
  { id: "10", category: "Futuristic", label: "Holo Knight", emoji: "🛡️", gradient: "linear-gradient(135deg, #10B981, #34D399)" },
  { id: "11", category: "Futuristic", label: "Matrix Hacker", emoji: "💻", gradient: "linear-gradient(135deg, #00FF88, #00CC6A)" },
  { id: "12", category: "Futuristic", label: "Void Walker", emoji: "🌌", gradient: "linear-gradient(135deg, #7C3AED, #A855F7)" },

  // ── Planets/Space (13-18) ──
  { id: "13", category: "Space", label: "Red Planet", emoji: "🔴", gradient: "linear-gradient(135deg, #E74C3C, #F1948A)" },
  { id: "14", category: "Space", label: "Blue Nebula", emoji: "🟦", gradient: "linear-gradient(135deg, #2980B9, #6BB5F0)" },
  { id: "15", category: "Space", label: "Golden Star", emoji: "⭐", gradient: "linear-gradient(135deg, #F1C40F, #F7DC6F)" },
  { id: "16", category: "Space", label: "Green Aurora", emoji: "🟢", gradient: "linear-gradient(135deg, #27AE60, #58D68D)" },
  { id: "17", category: "Space", label: "Purple Galaxy", emoji: "🟣", gradient: "linear-gradient(135deg, #8E44AD, #BB8FCE)" },
  { id: "18", category: "Space", label: "Cosmic Ring", emoji: "🪐", gradient: "linear-gradient(135deg, #E67E22, #F0B27A)" },

  // ── Abstract/Geometric (19-24) ──
  { id: "19", category: "Abstract", label: "Crystal Diamond", emoji: "💎", gradient: "linear-gradient(135deg, #06B6D4, #67E8F9)" },
  { id: "20", category: "Abstract", label: "Prism Core", emoji: "🔷", gradient: "linear-gradient(135deg, #6366F1, #A5B4FC)" },
  { id: "21", category: "Abstract", label: "Infinity Loop", emoji: "♾️", gradient: "linear-gradient(135deg, #EC4899, #F9A8D4)" },
  { id: "22", category: "Abstract", label: "Hex Grid", emoji: "🔶", gradient: "linear-gradient(135deg, #F59E0B, #FCD34D)" },
  { id: "23", category: "Abstract", label: "Wave Pulse", emoji: "〰️", gradient: "linear-gradient(135deg, #10B981, #6EE7B7)" },
  { id: "24", category: "Abstract", label: "Nexus Point", emoji: "⚡", gradient: "linear-gradient(135deg, #F97316, #FDBA74)" },
];

export function getAvatarById(id) {
  return avatars.find((a) => a.id === id) || avatars[0];
}

export function getAvatarStyle(id) {
  const avatar = getAvatarById(id);
  return {
    background: avatar.gradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    color: "white",
    fontWeight: "bold",
    borderRadius: "50%",
    width: "100%",
    height: "100%",
  };
}

export default avatars;