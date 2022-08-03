import React, { HTMLInputTypeAttribute } from "react";

export type InputState = "valid" | "invalid" | "empty";

type TextInputProps = {
  label: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  type: HTMLInputTypeAttribute;
  state: InputState;
};

const getinputClassStyleOnState = (inputState: InputState) => {
  let baseClass = "border text-sm rounded-lg block w-full p-2.5 ";
  if (inputState === "empty") {
    baseClass = baseClass.concat(
      "border-color-base focus:outline-color-base text-color-base",
    );
  }
  if (inputState === "invalid") {
    baseClass = baseClass.concat(
      "border-red-600 focus:outline-red-700 text-red-600",
    );
  }
  if (inputState === "valid") {
    baseClass = baseClass.concat(
      "border-green-600 text-green-600 focus:outline-green-700 text-green-600",
    );
  }
  return baseClass;
};

const getLabelStyleOnState = (inputState: InputState) => {
  let baseClass = "block mb-1 text-md font-medium ";
  if (inputState === "empty") {
    baseClass = baseClass.concat("text-color-base");
  }
  if (inputState === "invalid") {
    baseClass = baseClass.concat("text-red-600");
  }
  if (inputState === "valid") {
    baseClass = baseClass.concat("text-green-600");
  }
  return baseClass;
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  placeholder = "",
  state = "empty",
  required = false,
}) => {
  return (
    <div className="">
      <label htmlFor={id} className={getLabelStyleOnState(state)}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        className={getinputClassStyleOnState(state)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default TextInput;
