import React, { ReactNode } from "react";

type ButtonProps = {
  className?: string;
  children: ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button
      className={`text-skin-inverted bg-color-base
              hover:bg-skin-button-muted flex items-center
              justify-center px-4 py-3 border border-transparent
              text-base font-medium rounded-md shadow-sm sm:px-8 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
