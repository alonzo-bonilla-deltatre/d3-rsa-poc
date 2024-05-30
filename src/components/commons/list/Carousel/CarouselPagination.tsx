'use client';

import React, { CSSProperties } from 'react';

export const CarouselPagination = () => {
  return (
    <div
      className="container flex justify-center gap-2 mt-6 lg:mt-10"
      style={
        {
          '--swiper-pagination-color': 'var(--color-red)',
          '--swiper-pagination-color-active': 'var(--color-red)',
          '--swiper-pagination-bullet-width': '40px',
          '--swiper-pagination-bullet-height': '4px',
          '--swiper-pagination-bullet-inactive-color': 'var(--color-gray-300)',
          '--swiper-pagination-bullet-inactive-opacity': '1',
          '.swiper-pagination-bullet': {
            'border-radius': '0',
          },
        } as CSSProperties
      }
      data-js-carousel-pagination
    ></div>
  );
};
