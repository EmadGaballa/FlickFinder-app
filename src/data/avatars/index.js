// Avatar metadata and exports
// Each avatar: { id, label, category, gradient, Icon }

import {
  FoxAvatar,
  BunnyAvatar,
  OwlAvatar,
  CatAvatar,
  PandaAvatar,
  PantherAvatar,
} from "./animals.jsx";

import { SaturnAvatar, StarsAvatar, MoonAvatar, CometAvatar, GalaxyAvatar, NebulaAvatar } from "./cosmic.jsx";

import { ReuleauxAvatar, FluidCurvesAvatar, HexaflexagonAvatar, TriquetraAvatar, WaveAvatar, MobiusAvatar } from "./abstract.jsx";

import { NinjaAvatar, SamuraiAvatar, OniAvatar, CyberpunkAvatar, MasqueradeAvatar, SkullAvatar } from "./masks.jsx";

export const avatars = [
  // Animals
  { id: "1", label: "Fox", category: "Animals", gradient: ["#FFB347", "#FF6B35"], Icon: FoxAvatar },
  { id: "2", label: "Bunny", category: "Animals", gradient: ["#FFD6EA", "#FFB3D9"], Icon: BunnyAvatar },
  { id: "3", label: "Owl", category: "Animals", gradient: ["#FFCB84", "#E8862C"], Icon: OwlAvatar },
  { id: "4", label: "Cat", category: "Animals", gradient: ["#C9D3E4", "#8C9AB8"], Icon: CatAvatar },
  { id: "5", label: "Panda", category: "Animals", gradient: ["#E8F5E9", "#A5D6A7"], Icon: PandaAvatar },
  { id: "6", label: "Panther", category: "Animals", gradient: ["#2A2540", "#0B0914"], Icon: PantherAvatar },

  // Geometry
  { id: "7", label: "Reuleaux", category: "Geometry", gradient: ["#FF6B9D", "#C44569"], Icon: ReuleauxAvatar },
  { id: "8", label: "Fluid Curves", category: "Geometry", gradient: ["#667EEA", "#764BA2"], Icon: FluidCurvesAvatar },
  { id: "9", label: "Hexaflexagon", category: "Geometry", gradient: ["#F093FB", "#F5576C"], Icon: HexaflexagonAvatar },
  { id: "10", label: "Triquetra", category: "Geometry", gradient: ["#4FACFE", "#00F2FE"], Icon: TriquetraAvatar },
  { id: "11", label: "Wave", category: "Geometry", gradient: ["#43E97B", "#38F9D7"], Icon: WaveAvatar },
  { id: "12", label: "Möbius", category: "Geometry", gradient: ["#FA709A", "#FEE140"], Icon: MobiusAvatar },

  // Space
  { id: "13", label: "Saturn", category: "Space", gradient: ["#F4D03F", "#E67E22"], Icon: SaturnAvatar },
  { id: "14", label: "Stars", category: "Space", gradient: ["#667EEA", "#764BA2"], Icon: StarsAvatar },
  { id: "15", label: "Moon", category: "Space", gradient: ["#2C3E50", "#4CA1AF"], Icon: MoonAvatar },
  { id: "16", label: "Comet", category: "Space", gradient: ["#FF6B9D", "#C44569"], Icon: CometAvatar },
  { id: "17", label: "Galaxy", category: "Space", gradient: ["#7c5cff", "#ff4da6"], Icon: GalaxyAvatar },
  { id: "18", label: "Nebula", category: "Space", gradient: ["#00d4ff", "#6a5cff"], Icon: NebulaAvatar },

  // Masks
  { id: "19", label: "Ninja", category: "Masks", gradient: ["#2C3E50", "#1a252f"], Icon: NinjaAvatar },
  { id: "20", label: "Samurai", category: "Masks", gradient: ["#DC3545", "#7F1D1D"], Icon: SamuraiAvatar },
  { id: "21", label: "Oni", category: "Masks", gradient: ["#E74C3C", "#C0392B"], Icon: OniAvatar },
  { id: "22", label: "Cyberpunk", category: "Masks", gradient: ["#00F5FF", "#0A0E27"], Icon: CyberpunkAvatar },
  { id: "23", label: "Masquerade", category: "Masks", gradient: ["#9B59B6", "#4A235A"], Icon: MasqueradeAvatar },
  { id: "24", label: "Skull", category: "Masks", gradient: ["#BDC3C7", "#7F8C8D"], Icon: SkullAvatar },
];

export function getAvatarById(id) {
  return avatars.find((a) => a.id === id) || avatars[0];
}

export function getAvatarGradient(id) {
  const avatar = getAvatarById(id);
  return avatar.gradient;
}

export default avatars;