import { useState } from "react";
import avatars, { getAvatarById } from "../data/avatars";

function AvatarPicker({ selectedId, onSelect, onClose }) {
  const categories = [...new Set(avatars.map((a) => a.category))];

  return (
    <div className="avatar-picker-overlay" onClick={onClose}>
      <div className="avatar-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="avatar-picker-header">
          <h2>Choose Your Avatar</h2>
          <button className="avatar-picker-close" onClick={onClose}>✕</button>
        </div>

        {categories.map((category) => (
          <div key={category} className="avatar-category">
            <h3 className="avatar-category-title">{category}</h3>
            <div className="avatar-grid">
              {avatars
                .filter((a) => a.category === category)
                .map((avatar) => (
                  <button
                    key={avatar.id}
                    className={`avatar-option ${selectedId === avatar.id ? "avatar-option--selected" : ""}`}
                    onClick={() => onSelect(avatar.id)}
                    style={{ background: avatar.gradient }}
                  >
                    <span className="avatar-option-emoji">{avatar.emoji}</span>
                    <span className="avatar-option-label">{avatar.label}</span>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvatarPicker;