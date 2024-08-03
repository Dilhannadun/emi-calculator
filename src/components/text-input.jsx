import React from "react";

export function TextInput({ title, inputType, state, setState }) {
  return (
    <React.Fragment>
      <div className="form-field">
        <span className="sub-title">{title}</span>
        <input
          type={inputType}
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder={title}
        />
      </div>
    </React.Fragment>
  );
}
