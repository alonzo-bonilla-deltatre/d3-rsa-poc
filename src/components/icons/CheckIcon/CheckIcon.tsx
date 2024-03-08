import React, { SVGProps } from 'react';

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7314 5.489C21.3562 6.14101 21.3562 7.19812 20.7314 7.85013L10.1314 18.911C9.50653 19.563 8.49347 19.563 7.86863 18.911L2.46863 13.2762C1.84379 12.6242 1.84379 11.5671 2.46863 10.9151C3.09347 10.2631 4.10653 10.2631 4.73137 10.9151L9 15.3693L18.4686 5.489C19.0935 4.837 20.1065 4.837 20.7314 5.489Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CheckIcon;
