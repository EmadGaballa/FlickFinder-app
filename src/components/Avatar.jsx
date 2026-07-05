import { getAvatarById } from "../data/avatars";

function Avatar({ id, size = 40, className = "" }) {
  const avatar = getAvatarById(id || "1");

  return (
    <div
      className={`avatar ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: avatar.gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.5,
        flexShrink: 0,
        overflow: "hidden",
      }}
      title={avatar.label}
    >
      <span style={{ lineHeight: 1 }}>{avatar.emoji}</span>
    </div>
  );
}

export default Avatar;