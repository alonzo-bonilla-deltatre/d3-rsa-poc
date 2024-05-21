'use client';

import Link from '@/components/commons/Link/Link';
import { renderSvgIcon } from '@/components/icons';
import { getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { DistributionEntity } from '@/models/types/forge';
import Typography from '@/components/commons/Typography/Typography';
import { useEffect, useState } from 'react';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformationsUtility';

type DocumentProps = {
  entity: DistributionEntity;
  className?: string;
  iconSize?: number;
};

export const Document = ({ entity, className, iconSize }: DocumentProps) => {
  const documentUrl = getSrcWithTransformation(entity?.file?.templateUrl, transformations.good_assets.desktop.transformation);
  const [isIOSMobile, setIsIOSMobile] = useState(false);

  if (!documentUrl) {
    return null;
  }

  const fileTitle = (entity as any)?.title;
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

  return (
    <>
      {isIOSMobile ? (
        <Link
          className={`flex w-full items-center justify-start rounded-lg ${className}`}
          href={documentUrl}
          aria-label={entity.title}
          target="_blank"
          rel="noreferrer"
        >
          {renderSvgIcon('Pdf', {
            width: getNumberProperty(iconSize, 80),
            height: getNumberProperty(iconSize, 80),
            className: 'shrink-0',
          })}
          <Typography variant={'h6'} className="uppercase">{fileTitle}</Typography>
        </Link>
      ) : (
        <iframe
          src={documentUrl}
          className="w-full aspect-video rounded-lg"
        />
      )}
    </>
  );
};
