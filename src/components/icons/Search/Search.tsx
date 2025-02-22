﻿import React, { SVGProps } from 'react';

const Search = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      {...props}
    >
      <path
        d="M27.757 18.9782C27.757 22.7217 24.7222 25.7565 20.9787 25.7565C17.2352 25.7565 14.2005 22.7217 14.2005 18.9782C14.2005 15.2347 17.2352 12.2 20.9787 12.2C24.7222 12.2 27.757 15.2347 27.757 18.9782Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <line
        x1="25.3352"
        y1="24.9082"
        x2="30.7299"
        y2="30.3029"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Search;
