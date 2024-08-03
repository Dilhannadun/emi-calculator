import React from "react";

export function TextInput({ title, inputType, state, setState, min, max }) {
  const handleChange = (e) => {
    let value = e.target.value;

    // Convert value to a number if the input type is number
    if (inputType === "number") {
      value = parseFloat(value);

      // Prevent negative values
      if (value < (min ?? 0)) {
        value = min ?? 0;
      }

      // Prevent values greater than max if max is provided
      if (max !== undefined && value > max) {
        value = max;
      }

      // If value is not a number (NaN), reset to an empty string
      if (isNaN(value)) {
        value = "";
      }
    }

    setState(value);
  };
  return (
    <React.Fragment>
      <div className="form-field">
        <span className="sub-title">{title}</span>
        <input
          type={inputType}
          value={state}
          onChange={handleChange}
          placeholder={title}
          max={max && max}
          min={min && min}
        />
      </div>
    </React.Fragment>
  );
}
