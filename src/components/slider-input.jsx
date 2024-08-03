import React from "react";
import { numberWithCommas } from "../utils/functions";

export function SliderInput({
  title,
  underlinedTitle,
  state,
  setState,
  minValue,
  maxValue,
  labelMin,
  labelMax,
}) {
  return (
    <React.Fragment>
      <div className="form-field">
        <span className="sub-title">{title}</span>
        {state > 0 && <span className="totDp">{underlinedTitle}</span>}
        <div>
          <input
            type="range"
            value={state}
            onChange={setState}
            min={minValue}
            max={maxValue}
            className="slider"
          />
          <div className="lables">
            <label>{labelMin ?? numberWithCommas(minValue)}</label>
            <b>{numberWithCommas(state)}</b>
            <label>{labelMax ?? numberWithCommas(maxValue)}</label>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
