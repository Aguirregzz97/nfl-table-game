import React from "react";

export type InputState = "valid" | "invalid" | "untouched";

export const getInputState = (touched: boolean, error: boolean): InputState => {
  if (!touched) {
    return "untouched";
  }
  if (!error) {
    return "valid";
  }
  if (error) {
    return "invalid";
  }
  return "untouched";
};

type TextInputProps = {
  label: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  state: InputState;
  errorMessage?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const getinputClassStyleOnState = (inputState: InputState) => {
  let baseClass = "border text-sm rounded-lg block w-full p-2.5 ";
  if (inputState === "untouched") {
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
  if (inputState === "untouched") {
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
  state = "untouched",
  required = false,
  errorMessage = "",
  ...rest
}) => {
  return (
    <div className="">
      <label htmlFor={id} className={getLabelStyleOnState(state)}>
        {label}
      </label>
      <input
        id={id}
        className={getinputClassStyleOnState(state)}
        placeholder={placeholder}
        required={required}
        {...rest}
      />
      <p className={`${getLabelStyleOnState(state)} text-sm`}>{errorMessage}</p>
    </div>
  );
};

export default TextInput;
