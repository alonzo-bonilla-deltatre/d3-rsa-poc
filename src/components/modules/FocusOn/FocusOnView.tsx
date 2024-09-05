import React from 'react';
import { DistributionEntity, ForgeEntityType } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { translate } from '@/helpers/translationHelper';
import CallToActionFilledLink from '@/components/commons/CallToActionLink/CallToActionFilledLink';
import Typography from '@/components/commons/Typography/Typography';
import Picture from '@/components/commons/Picture/Picture';

type FocusOnViewProps = {
  storyEntity?: DistributionEntity;
};

const FocusOnView = ({ storyEntity }: FocusOnViewProps) => {
  if (!storyEntity) return null;

  const { parts, summary } = storyEntity;

  const firstPhotoPart = parts?.find((part) => part.type === ForgeEntityType.photo);
  return (
    <>
      <div className="relative mx-auto overflow-hidden">
        <Picture
          className="h-full w-full object-cover object-center opacity-[.50] md:h-fit"
          src={storyEntity?.thumbnail?.templateUrl ?? ''}
          alt={storyEntity?.title}
          transformations={transformations.focus_on_background}
        />
        <div className="container mx-auto px-4">
          <div className="absolute top-2/3 -translate-y-2/3 transform lg:px-6">
            <Typography
              variant="tag-l"
              className="mb-1 w-fit px-1 py-0.5 uppercase text-white"
            >
              {storyEntity?.context?.title}
            </Typography>
            <Typography
              variant="h2"
              className="mb-8 font-bold md:mt-4 lg:mt-6"
            >
              {storyEntity?.title}
            </Typography>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-[-6rem] xl:mt-[-8rem]">
        <div className="relative grid-cols-[586px_minmax(0px,_1fr)] lg:grid lg:gap-2 xl:gap-6">
          <div className="mx-4 bg-black px-3 py-6 text-white md:px-6 lg:px-5 lg:py-10 xl:max-w-[586px] xl:p-16">
            <h3 className="mb-0 font-heading text-4xl font-bold text-gray-800 dark:text-gray-200">
              {storyEntity?.headline}
            </h3>
            <Typography
              variant="body-s"
              className="pb-6 pr-8 pt-8 text-gray-400 md:pb-12 md:pr-16 md:pt-12"
            >
              {summary}
            </Typography>
            <CallToActionFilledLink
              url={storyEntity?.url ?? ''}
              text={translate(`full-article`)}
            ></CallToActionFilledLink>
          </div>
          <div className="mt-4 max-w-[1024px] md:mt-8 lg:mt-12 lg:pr-4">
            {firstPhotoPart && (
              <figure>
                <Picture
                  src={firstPhotoPart.image?.templateUrl ?? ''}
                  alt={firstPhotoPart.image?.title ?? ''}
                  transformations={transformations.focus_on_photo}
                  className="h-full w-full object-cover"
                ></Picture>
              </figure>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FocusOnView;
