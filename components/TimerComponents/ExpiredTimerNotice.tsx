import React from "react";

const ExpiredTimerNotice: React.FC = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

export default ExpiredTimerNotice;
