import React, { useState, useEffect, useCallback } from "react";
import { FaRegCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.scss";
import RangeSlider from "../RangeSlider/RangeSlider";
import generatePassword from "../../utils/generatePassword";
import Checkbox from "../Checkbox/Checkbox";

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [constraints, setConstraints] = useState({
    includeLowercase: true,
    includeUppercase: false,
    includeNumbers: false,
    includeSymbols: false,
  });

  const handleGeneratePassword = useCallback(() => {
    const {
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols,
    } = constraints;
    const newPassword = generatePassword({
      length,
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols,
    });
    setPassword(newPassword);
  }, [length, constraints]);

  useEffect(() => {
    handleGeneratePassword();
  }, [handleGeneratePassword]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  const handleCheckboxChange = (
    constraint: keyof typeof constraints,
    isChecked: boolean
  ) => {
    const newConstraints = { ...constraints, [constraint]: isChecked };
    if (!Object.values(newConstraints).some(Boolean)) return;
    setConstraints(newConstraints);
  };

  return (
    <div className="password-generator">
      <div className="output-container">
        <div className="input-with-icon">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Generated Password"
          />
          <button
            onClick={handleCopy}
            className="copy-button"
            aria-label="Copy password to clipboard"
          >
            <FaRegCopy />
          </button>
        </div>
      </div>

      <RangeSlider
        min={8}
        max={25}
        value={length}
        onChange={setLength}
        label="Character length: "
      />

      <div className="controls">
        <Checkbox
          label="Include Lowercase"
          checked={constraints.includeLowercase}
          onChange={(e) =>
            handleCheckboxChange("includeLowercase", e.target.checked)
          }
        />
        <Checkbox
          label="Include Uppercase"
          checked={constraints.includeUppercase}
          onChange={(e) =>
            handleCheckboxChange("includeUppercase", e.target.checked)
          }
        />
        <Checkbox
          label="Include Numbers"
          checked={constraints.includeNumbers}
          onChange={(e) =>
            handleCheckboxChange("includeNumbers", e.target.checked)
          }
        />
        <Checkbox
          label="Include Symbols"
          checked={constraints.includeSymbols}
          onChange={(e) =>
            handleCheckboxChange("includeSymbols", e.target.checked)
          }
        />
      </div>
      <button onClick={handleGeneratePassword} className="generate-btn">
        Generate
      </button>
      <ToastContainer closeButton={false} />
    </div>
  );
};

export default PasswordGenerator;
