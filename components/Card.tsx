import React, { ReactNode } from "react";

const Card: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="p-5 flex flex-col justify-center max-w-sm rounded overflow-hidden shadow-sm border-color-base shadow-color-base mt-6">
      {children}
    </div>
  );
};

export default Card;
