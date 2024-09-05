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
        'h-svh max-h-[600px] rounded-lg bg-cover bg-fixed bg-center bg-no-repeat text-white',
        isIOSMobile ? 'bg-scroll' : ''
      )}
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 rounded-lg bg-black/20 px-6">
        <Typography
          variant="h3"
          className="flex items-center justify-center text-white"
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
