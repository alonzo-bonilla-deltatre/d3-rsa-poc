import React, { SVGProps } from 'react';

const ArrowRightRounded = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="currentColor"
      {...props}
    >
      <path
        d="M0.500003 25C0.500004 11.469 11.469 0.499993 25 0.499994C38.531 0.499995 49.5 11.469 49.5 25C49.5 38.531 38.531 49.5 25 49.5C11.469 49.5 0.500001 38.531 0.500003 25Z"
        fill="currentColor"
        fillOpacity="0"
        stroke="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.9693 25.0906L20.093 30.9669L22.2143 33.0883L30.2143 25.0883L28.093 22.9669L28.0907 22.9693L22.1213 16.9999L20 19.1213L25.9693 25.0906Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowRightRounded;
