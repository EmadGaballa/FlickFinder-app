import { useRef } from "react";
import { avatars } from "../data/avatars/index";
import "../css/AvatarPicker.css";

function AvatarPicker({ selectedId, onSelect }) {
  const avatarRefs = useRef([]);

  const categories = [...new Set(avatars.map((a) => a.category))];

  return (
    <div
      className="avatar-picker-inline"
      role="radiogroup"
      aria-label="Choose avatar"
    >
      <div className="avatar-picker-rows">
        {categories.map((category, rowIndex) => (
          <div
            key={category}
            className="avatar-row"
            style={{ animationDelay: `${rowIndex * 50}ms` }}
          >
            {avatars
              .filter((avatar) => avatar.category === category)
              .map((avatar) => {
                const Icon = avatar.Icon;
                const isSelected = selectedId === avatar.id;

                return (
                  <button
                    key={avatar.id}
                    ref={(el) => (avatarRefs.current[avatar.id] = el)}
                    type="button"
                    className={[
                      "avatar-option",
                      isSelected && "avatar-option--selected",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => onSelect(avatar.id)}
                    title={avatar.label}
                    aria-label={avatar.label}
                    aria-checked={isSelected}
                    role="radio"
                  >
                    <div className="avatar-option-tile">
                      <div className="avatar-option-preview">
                        <Icon size={80} />
                      </div>

                      {isSelected && (
                        <div className="avatar-option-check">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M5 10L8 13L15 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvatarPicker;