import React, { useState } from "react";
interface ModalTextInputProps {
  label: string;
  placeholder: string;
  handleChange: (s: string) => void;
}
export default function ModalTextInput(props: ModalTextInputProps) {
  const [value, setValue] = useState<string>(props.placeholder);
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{props.label}</span>
        <span className="label-text-alt"></span>
      </label>

      <input
        type="text"
        placeholder={value}
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => {
          setValue(e.target.value);
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
