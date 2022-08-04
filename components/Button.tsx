import React, { ReactNode } from "react";

type ButtonProps = {
  className?: string;
  children: ReactNode;
  loading?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<ButtonProps> = ({
  className,
  loading = false,
  children,
  ...rest
}) => {
  return (
    <button
      className={`text-skin-inverted bg-color-base
              hover:bg-skin-button-muted flex items-center
              justify-center px-4 py-3 border border-transparent
              text-base font-medium rounded-md shadow-sm sm:px-8 ${className}`}
      {...rest}
    >
      {loading && (
        <>
          <i className="fa-solid fa-spinner animate-spin mr-2 " />
          <p>loading</p>
        </>
      )}
      {!loading && children}
    </button>
  );
};

export default Button;
