import React, { SVGProps } from 'react';

const CaretRightIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      {...props}
    >
      <path
        d="M3.684 16.3148C4.27992 16.9107 5.2461 16.9107 5.84202 16.3148L12.3161 9.84073C12.912 9.24481 12.912 8.27863 12.3161 7.68271C12.3164 7.68306 12.3157 7.68235 12.3161 7.68271L5.84202 1.20866C5.2461 0.612739 4.27992 0.61274 3.684 1.20866C3.08808 1.80458 3.08808 2.77076 3.684 3.36668L9.07904 8.76172L3.684 14.1568C3.08808 14.7527 3.08808 15.7189 3.684 16.3148Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CaretRightIcon;
