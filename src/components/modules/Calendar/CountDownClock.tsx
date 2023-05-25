'use client';

import React, { useEffect, useState } from 'react';

type ModuleProps = {
  deadline: string;
  className: string;
};

const CountDownClock = ({ ...data }: ModuleProps) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const { deadline, className } = data;

  const timeItemClasses = 'col-span-2 flex flex-col';
  const timeDividerClasses = 'text-4xl';
  const timeLabelClasses = 'text-sm text-white uppercase';

  const getTimeUntil = (deadline: string) => {
    const time = Date.parse(deadline) - Date.now();
    if (time <= 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
    } else {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
    }
  };

  useEffect(() => {
    setInterval(() => getTimeUntil(deadline), 1000);

    return () => getTimeUntil(deadline);
  }, [deadline]);

  return (
    <div
      className={`${className} grid grid-cols-8 max-w-[270px] text-5xl font-black text-[#EE3123] leading-none text-center`}
    >
      <div className={timeItemClasses}>
        <span>{days?.toString().padStart(2, '0') ?? '-'}</span>
        <span className={timeLabelClasses}>Days</span>
      </div>
      <span className={timeDividerClasses}>:</span>
      <div className={timeItemClasses}>
        <span>{hours?.toString().padStart(2, '0') ?? '-'}</span>
        <span className={timeLabelClasses}>hrs</span>
      </div>
      <span className={timeDividerClasses}>:</span>
      <div className={timeItemClasses}>
        <span>{minutes?.toString().padStart(2, '0') ?? '-'}</span>
        <span className={timeLabelClasses}>min</span>
      </div>
    </div>
  );
};

export default CountDownClock;
