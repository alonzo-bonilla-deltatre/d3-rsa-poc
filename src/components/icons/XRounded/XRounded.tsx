import React, { SVGProps } from 'react';

const XRounded = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 35 34"
      fill="none"
      {...props}
    >
      <circle
        cx="17"
        cy="17"
        r="16.3"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M11.0286 12L15.5662 18.0671L11 23H12.0278L16.0256 18.6811L19.2556 23H22.7528L17.9598 16.5917L22.21 12H21.1823L17.5006 15.9775L14.5258 12H11.0286ZM12.54 12.757H14.1466L21.2413 22.243H19.6346L12.54 12.757Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default XRounded;
