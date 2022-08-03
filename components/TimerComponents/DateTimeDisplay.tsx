import React from "react";

type DateTimeDisplayProps = {
  value: number;
  type: "Days" | "Hours" | "Mins" | "Seconds";
  isDanger: boolean;
};

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({
  value,
  type,
  isDanger,
}) => {
  return (
    <div
      className={`${
        isDanger ? "bg-red-600" : "bg-color-base"
      } rounded-lg flex flex-col items-center justify-center w-20 h-20 text-white font-bold`}
    >
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
