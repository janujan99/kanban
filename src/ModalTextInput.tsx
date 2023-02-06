import React, { useState } from "react";
interface ModalTextInputProps {
  label: string;
  placeholder: string;
  handleChange: (s: string) => void;
}
export default function ModalTextInput(props: ModalTextInputProps) {
  console.log("Placeholder: " + props.placeholder);
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{props.label}</span>
        <span className="label-text-alt"></span>
      </label>

      <input
        type="text"
        placeholder={props.placeholder}
        value={props.placeholder}
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => {
          props.handleChange(e.target.value);
        }}
      />
      <label className="label">
        <span className="label-text-alt"></span>
        <span className="label-text-alt"></span>
      </label>
    </div>
  );
}
