'use client';

import React, { useEffect, useState } from 'react';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { DistributionEntity } from '@/models/types/forge';
import Typography from '@/components/commons/Typography/Typography';
import CallToActionOutlinedLink from '@/components/commons/CallToActionLink/CallToActionOutlinedLink';
import { twMerge } from 'tailwind-merge';

type PromoProps = {
  entity?: DistributionEntity;
};

const Promo = ({ entity }: PromoProps) => {
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
  }, [entity, isIOSMobileWindow]);

  if (!entity) return null;
  const imageUrl = getSrcWithTransformation(
    entity.thumbnail?.templateUrl,
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
      <div className={'bg-black/20 rounded-lg flex flex-col w-full h-full items-center justify-center px-6 gap-6'}>
        <Typography
          variant={'h3'}
          className={'text-white flex items-center justify-center'}
        >
          {entity.title}
        </Typography>
        <CallToActionOutlinedLink
          text={entity?.fields?.url?.displayText}
          url={entity?.fields?.url?.url}
        ></CallToActionOutlinedLink>
      </div>
    </div>
  );
};

export default Promo;
