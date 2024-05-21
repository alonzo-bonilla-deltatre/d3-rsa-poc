import React, { SVGProps } from 'react';

const ArrowLeftRounded = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="currentColor"
      {...props}
    >
      <path
        d="M49.5 25C49.5 38.531 38.531 49.5 25 49.5C11.469 49.5 0.5 38.531 0.5 25C0.5 11.469 11.469 0.5 25 0.5C38.531 0.5 49.5 11.469 49.5 25Z"
        fill="currentColor"
        fillOpacity="0"
        stroke="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.2451 24.9977L30.1214 19.1213L28.0001 17L20.0001 25L22.1214 27.1213L22.1238 27.119L28.0931 33.0883L30.2144 30.967L24.2451 24.9977Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowLeftRounded;
