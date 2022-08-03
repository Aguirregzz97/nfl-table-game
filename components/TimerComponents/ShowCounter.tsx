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
  return (
    <div className="flex items-center gap-10 mb-8">
      <h1 className="text-color-base font-bold text-2xl">Event Starting in:</h1>
      <DateTimeDisplay value={days} type={"Days"} isDanger={false} />
      <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
      <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
      <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
    </div>
  );
};

export default ShowCounter;
