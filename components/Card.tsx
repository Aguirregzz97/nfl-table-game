import React, { ReactNode } from "react";

const Card: React.FC<{ children: ReactNode; clickable?: boolean }> = ({
  children,
  clickable = false,
}) => {
  return (
    <div
      className={`p-5 flex flex-col justify-center max-w-sm rounded
       overflow-hidden shadow-sm border-color-bas
       shadow-color-base mt-6 ${
         clickable
           ? "hover:scale-105 hover:transition hover:cursor-pointer"
           : ""
       }`}
    >
      {children}
    </div>
  );
};

export default Card;
