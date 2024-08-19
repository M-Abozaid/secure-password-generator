import React from "react";
import "./index.scss";
type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => (
  <div className="checkbox-container">
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  </div>
);

export default Checkbox;
