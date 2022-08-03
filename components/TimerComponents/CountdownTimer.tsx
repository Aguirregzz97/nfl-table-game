import { ISODateString } from "next-auth";
import React from "react";
import { useCountdown } from "../../hooks/useCountdown";
import ExpiredTimerNotice from "./ExpiredTimerNotice";
import ShowCounter from "./ShowCounter";

type CountdownTimerProps = {
  targetDate: ISODateString;
  TimerExpiredNotice?: React.ReactNode;
  setTimerExpired: () => void;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  TimerExpiredNotice = <ExpiredTimerNotice />,
  setTimerExpired,
}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    setTimerExpired();
    return <>{TimerExpiredNotice}</>;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
