import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";

type ShowCounterProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const ShowCounter: React.FC<ShowCounterProps> = ({
  days,
  hours,
  minutes,
  seconds,
}) => {
  const isDanger = hours <= 8;

  return (
    <div className="flex items-center gap-10 mb-8">
      <h1
        className={`${
          isDanger ? "text-red-600" : "text-color-base"
        } font-bold text-2xl`}
      >
        Event Starting in:
      </h1>
      <DateTimeDisplay value={days} type={"Days"} isDanger={isDanger} />
      <DateTimeDisplay value={hours} type={"Hours"} isDanger={isDanger} />
      <DateTimeDisplay value={minutes} type={"Mins"} isDanger={isDanger} />
      <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={isDanger} />
    </div>
  );
};

export default ShowCounter;
