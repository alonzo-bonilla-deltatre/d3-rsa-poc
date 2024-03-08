import React, { SVGProps } from 'react';

const HamburgerMenu = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 22.3285C6 21.8156 6.41574 21.3999 6.92857 21.3999H25.0714C25.5843 21.3999 26 21.8156 26 22.3285C26 22.8413 25.5843 23.257 25.0714 23.257H6.92857C6.41574 23.257 6 22.8413 6 22.3285Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 15.6288C6 15.1159 6.41574 14.7002 6.92857 14.7002H25.0714C25.5843 14.7002 26 15.1159 26 15.6288C26 16.1416 25.5843 16.5573 25.0714 16.5573H6.92857C6.41574 16.5573 6 16.1416 6 15.6288Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 8.92857C6 8.41574 6.41574 8 6.92857 8H25.0714C25.5843 8 26 8.41574 26 8.92857C26 9.44141 25.5843 9.85714 25.0714 9.85714H6.92857C6.41574 9.85714 6 9.44141 6 8.92857Z"
      />
    </svg>
  );
};

export default HamburgerMenu;
