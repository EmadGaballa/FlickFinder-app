import { useState, useEffect, useRef } from "react";
import { avatars } from "../data/avatars/index";
import "../css/AvatarPicker.css";

function AvatarPicker({ selectedId, onSelect, onClose }) {
  const categories = [...new Set(avatars.map((a) => a.category))];

  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const modalRef = useRef(null);
  const avatarRefs = useRef([]);

  // Animate modal entrance
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();

        setFocusedIndex((prev) => {
          const next = (prev + 1) % avatars.length;
          avatarRefs.current[next]?.focus();
          return next;
        });
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();

        setFocusedIndex((prev) => {
          const next = (prev - 1 + avatars.length) % avatars.length;
          avatarRefs.current[next]?.focus();
          return next;
        });
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();

        const avatar = avatars[focusedIndex];

        if (avatar) {
          onSelect(avatar.id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedIndex, onSelect, onClose]);

  // Focus first avatar
  useEffect(() => {
    avatarRefs.current[0]?.focus();
  }, []);

  const handleAvatarClick = (avatarId) => {
    onSelect(avatarId);

    // Small delay for selection animation
    setTimeout(onClose, 150);
  };

  return (
    <div className="avatar-picker-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className={`avatar-picker-modal ${
          isAnimating ? "avatar-picker-modal--entering" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="avatar-picker-header">
          <h2 className="avatar-picker-title">Choose Avatar</h2>

          <button
            className="avatar-picker-close"
            onClick={onClose}
            aria-label="Close avatar picker"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Avatar Categories (visual rows only) */}
        <div className="avatar-categories">
          {categories.map((category, rowIndex) => (
            <div
              key={category}
              className="avatar-row"
              style={{
                animationDelay: `${rowIndex * 50}ms`,
              }}
            >
              {avatars
                .filter((avatar) => avatar.category === category)
                .map((avatar) => {
                  const Icon = avatar.Icon;

                  const globalIndex = avatars.findIndex(
                    (a) => a.id === avatar.id
                  );

                  const isSelected = selectedId === avatar.id;

                  return (
                    <button
                      key={avatar.id}
                      ref={(el) => (avatarRefs.current[globalIndex] = el)}
                      className={[
                        "avatar-option",
                        isSelected && "avatar-option--selected",
                        focusedIndex === globalIndex &&
                          "avatar-option--focused",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => handleAvatarClick(avatar.id)}
                      onFocus={() => setFocusedIndex(globalIndex)}
                      title={avatar.label}
                      aria-label={`${avatar.label}${
                        isSelected ? ", selected" : ""
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div className="avatar-option-tile">
                        <div className="avatar-option-preview">
                          <Icon size={80} />
                        </div>

                        {isSelected && (
                          <div className="avatar-option-check">
                            <svg
                              width="20"
                              height="20"
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
    </div>
  );
}

export default AvatarPicker;