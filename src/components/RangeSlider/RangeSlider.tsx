import React from "react";
import "./index.scss";

interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  label: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  value,
  onChange,
  label,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };

  return (
    <div className="sliderContainer">
      <label>
        {label} &nbsp; <span>{value}</span>
      </label>
      <div className="range-slider">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          aria-label={label}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
