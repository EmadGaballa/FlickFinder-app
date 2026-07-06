import React from "react";
import { getAvatarById } from "../data/avatars/index";

function Avatar({ id, size = 40, className = "" }) {
  const avatar = getAvatarById(id || "1");
  
  if (!avatar || !avatar.Icon) {
    return null;
  }

  const IconComponent = avatar.Icon;

  return (
    <div
      className={`avatar ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        display: "block",
      }}
      title={avatar.label}
    >
      <IconComponent size={size} />
    </div>
  );
}

export default Avatar;
