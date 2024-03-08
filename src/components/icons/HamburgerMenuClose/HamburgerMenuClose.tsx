import React, { SVGProps } from 'react';

const HamburgerMenuClose = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Navigation">
        <path
          id="Hamburger Icon Close Color"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.8853 16.0002L23.609 10.2763C24.1303 9.75496 24.1303 8.91231 23.609 8.39099C23.0877 7.86967 22.2451 7.86967 21.7238 8.39099L16 14.1149L10.2762 8.39099C9.75493 7.86967 8.9123 7.86967 8.39098 8.39099C7.86967 8.91231 7.86967 9.75496 8.39098 10.2763L14.1147 16.0002L8.39098 21.724C7.86967 22.2454 7.86967 23.088 8.39098 23.6093C8.65097 23.8693 8.99229 24 9.33361 24C9.67493 24 10.0162 23.8693 10.2762 23.6093L16 17.8855L21.7238 23.6093C21.9838 23.8693 22.3251 24 22.6664 24C23.0077 24 23.349 23.8693 23.609 23.6093C24.1303 23.088 24.1303 22.2454 23.609 21.724L17.8853 16.0002Z"
        />
      </g>
    </svg>
  );
};

export default HamburgerMenuClose;
