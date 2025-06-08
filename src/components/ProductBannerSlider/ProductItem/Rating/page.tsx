"use client";

import React, { useState, MouseEvent } from "react";

interface RatingProps {
  max?: number;
  value?: number; // controlled
  defaultValue?: number; // uncontrolled
  onChange?: (value: number) => void;
  allowHalf?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
}

const Rating: React.FC<RatingProps> = ({
  max = 5,
  value,
  defaultValue = 0,
  onChange,
  allowHalf = true,
  readOnly = false,
  disabled = false,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const currentValue = isControlled ? value! : internalValue;

  const getRatingFromMouse = (
    event: MouseEvent<HTMLSpanElement>,
    starIndex: number
  ): number => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const isHalf = allowHalf && x < width / 2;
    return isHalf ? starIndex + 0.5 : starIndex + 1;
  };

  const handleClick = (event: MouseEvent<HTMLSpanElement>, index: number) => {
    if (readOnly || disabled) return;
    const newRating = getRatingFromMouse(event, index);

    const shouldReset = newRating === currentValue;
    const finalRating = shouldReset ? 0 : newRating;

    if (!isControlled) {
      setInternalValue(finalRating);
    }
    onChange?.(finalRating);
  };

  const handleMouseMove = (
    event: MouseEvent<HTMLSpanElement>,
    index: number
  ) => {
    if (readOnly || disabled) return;
    const hoverRating = getRatingFromMouse(event, index);
    setHoverValue(hoverRating);
  };

  const handleMouseLeave = () => {
    if (readOnly || disabled) return;
    setHoverValue(null);
  };

  const displayValue = hoverValue ?? currentValue;

  return (
    <div
      className={`rating-container ${
        readOnly || disabled ? "non-interactive" : ""
      }`}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: max }, (_, index) => {
        const full = index + 1 <= displayValue;
        const half =
          allowHalf && displayValue >= index + 0.5 && displayValue < index + 1;

        return (
          <span
            key={index}
            className={`star ${full ? "filled" : half ? "half-filled" : ""}`}
            onClick={(e) => handleClick(e, index)}
            onMouseMove={(e) => handleMouseMove(e, index)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
