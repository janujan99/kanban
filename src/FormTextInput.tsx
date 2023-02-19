import React, { useState } from "react";
interface FormTextInputProps {
  value: string;
  placeholder: string;
  index: number;
  handleChange: (val: string, index: number) => void;
  handleExitClick: (index: number) => void;
}
export default function FormTextInput(props: FormTextInputProps) {
  const [placeholder, setPlaceholder] = useState(props.placeholder);
  //const [value, setValue] = useState(props.value);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: 3,
        marginBottom: 5,
      }}
    >
      <input
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => {
          props.handleChange(e.target.value, props.index);
        }}
        className="input input-bordered w-4/5 mr-3"
      />
      <button
        className="btn btn-circle bg-white text-black border-none"
        onClick={() => {
          props.handleExitClick(props.index);
          setPlaceholder(props.placeholder);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
