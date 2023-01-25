import React, { useState } from "react";
export default function ModalTextInput(props: any) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{props.label}</span>
        <span className="label-text-alt"></span>
      </label>

      <input
        type="text"
        placeholder={props.placeholder}
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => props.handleChange(e.target.value)}
      />
      <label className="label">
        <span className="label-text-alt"></span>
        <span className="label-text-alt"></span>
      </label>
    </div>
  );
}
