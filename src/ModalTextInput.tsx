import React, { useState } from "react";
interface ModalTextInputProps {
  label: string;
  placeholder: string;
  handleChange: (s: string) => void;
}
export default function ModalTextInput(props: ModalTextInputProps) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text" style={{ color: "grey" }}>
          {props.label}
        </span>
        <span className="label-text-alt"></span>
      </label>

      <input
        type="text"
        placeholder={props.placeholder}
        value={props.placeholder}
        className="input input-bordered w-5/8"
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
