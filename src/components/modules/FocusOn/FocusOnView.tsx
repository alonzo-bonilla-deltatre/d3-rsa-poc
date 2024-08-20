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
      <div className="overflow-hidden mx-auto relative">
        <Picture
          className="w-full h-full md:h-fit object-cover object-center opacity-[.50]"
          src={storyEntity?.thumbnail?.templateUrl ?? ''}
          alt={storyEntity?.title}
          transformations={transformations.focus_on_background}
        />
        <div className="container mx-auto px-4">
          <div className="absolute top-2/3 transform -translate-y-2/3 lg:px-6">
            <Typography
              variant="tag-l"
              className="uppercase text-white mb-1 px-1 py-0.5 w-fit"
            >
              {storyEntity?.context?.title}
            </Typography>
            <Typography
              variant="h2"
              className="font-bold mb-8 md:mt-4 lg:mt-6 "
            >
              {storyEntity?.title}
            </Typography>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-[-6rem] xl:mt-[-8rem]">
        <div className="lg:grid relative grid-cols-[586px_minmax(0px,_1fr)] lg:gap-2 xl:gap-6">
          <div className="bg-black text-white mx-4 py-6 px-3 md:px-6 lg:py-10 lg:px-5 xl:p-16 xl:max-w-[586px]">
            <h3 className="font-heading text-4xl font-bold text-gray-800 dark:text-gray-200 mb-0">
              {storyEntity?.headline}
            </h3>
            <Typography
              variant="body-s"
              className="pt-8 pr-8 pb-6 md:pt-12 md:pr-16 md:pb-12 text-gray-400"
            >
              {summary}
            </Typography>
            <CallToActionFilledLink
              url={storyEntity?.url ?? ''}
              text={translate(`full-article`)}
            ></CallToActionFilledLink>
          </div>
          <div className="max-w-[1024px] mt-4 md:mt-8 lg:mt-12 lg:pr-4">
            {firstPhotoPart && (
              <figure>
                <Picture
                  src={firstPhotoPart.image?.templateUrl ?? ''}
                  alt={firstPhotoPart.image?.title ?? ''}
                  transformations={transformations.focus_on_photo}
                  className="w-full h-full object-cover"
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
