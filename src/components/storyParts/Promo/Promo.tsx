'use client';

import React, { useEffect, useState } from 'react';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformationsUtility';
import Typography from '@/components/commons/Typography/Typography';
import CallToActionOutlinedLink from '@/components/commons/CallToActionLink/CallToActionOutlinedLink';
import { twMerge } from 'tailwind-merge';
import { StoryPart } from '@/models/types/storyPart';

const Promo = ({ data }: { data: StoryPart }) => {
  const [isIOSMobile, setIsIOSMobile] = useState(false);

  const isIOSMobileWindow =
    typeof window !== 'undefined'
      ? /iPad|iPhone|iPod/.test(navigator.platform) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
      : false;

  useEffect(() => {
    if (isIOSMobileWindow) {
      setIsIOSMobile(true);
    }
  }, [data, isIOSMobileWindow]);

  if (!data) return null;
  const imageUrl = getSrcWithTransformation(
    data.thumbnail?.templateUrl,
    transformations.best_assets.desktop.transformation
  );
  if (!imageUrl) return null;

  return (
    <div
      className={twMerge(
        'text-white bg-cover bg-no-repeat h-svh max-h-[600px] bg-fixed bg-center rounded-lg',
        isIOSMobile ? 'bg-scroll' : ''
      )}
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
    >
      <div className="bg-black/20 rounded-lg flex flex-col w-full h-full items-center justify-center px-6 gap-6">
        <Typography
          variant="h3"
          className="text-white flex items-center justify-center"
        >
          {data.title}
        </Typography>
        <CallToActionOutlinedLink
          text={data?.fields?.url?.displayText}
          url={data?.fields?.url?.url}
        ></CallToActionOutlinedLink>
      </div>
    </div>
  );
};

export default Promo;
