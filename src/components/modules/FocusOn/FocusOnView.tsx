import React from 'react';
import Picture from '@/components/common/Picture/Picture';
import { DistributionEntity } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { translate } from '@/utilities/i18n';
import Roofline from '@/components/common/Roofline/Roofline';
import CallToAction from '@/components/common/CallToAction/CallToAction';

type FocusOnViewProps = {
  storyEntity?: DistributionEntity;
};

const FocusOnView = ({ storyEntity }: FocusOnViewProps) => {
  if (!storyEntity) {
    return null;
  }
  const { parts, summary } = storyEntity;
  const firstPhotoPart = parts?.find((part) => part.type === 'photo');

  return (
    <>
      <div className={`max-w-[1920px] overflow-hidden mx-auto relative`}>
        <div className="h-[481px] md:h-[617px]">
          <Picture
            className="md:max-w-none md:w-max lg:w-full h-full md:h-fit object-cover object-center opacity-[.50]"
            src={storyEntity?.thumbnail?.templateUrl}
            alt={storyEntity?.title}
            transformations={transformations.focusOnBackground}
          />
        </div>
        <div className="container mx-auto px-4">
          <div className="absolute top-2/3 transform -translate-y-2/3 max-w-[530px] lg:px-0">
            <Roofline
              className={'capitalize mr-2 font-bold bg-white text-black px-1 py-0.5 w-fit mb-2 text-sm'}
              context={storyEntity?.context}
            ></Roofline>
            <h2 className="mb-8 md:text-5xl font-bold">{storyEntity?.title}</h2>
          </div>
        </div>
      </div>
      <div className="container mt-[-6rem] xl:mt-[-8rem] mx-auto">
        <div className="lg:grid relative grid-cols-[586px_minmax(0px,_1fr)] lg:gap-2 xl:gap-6">
          <div className="bg-white text-black mx-4 py-6 px-3 lg:py-10 lg:px-5 xl:p-16 xl:max-w-[586px]">
            <h3 className="md:text-4xl font-bold text-gray-800 mb-0">{storyEntity?.headline}</h3>
            <div className="pt-8 pr-8 pb-6 md:pt-16 md:pr-16 md:pb-12 text-gray-400">
              <p>{summary}</p>
            </div>
            <CallToAction
              url={storyEntity?.url}
              text={translate(`full-article`) + ' >'}
              style={'default'}
              hide={false}
            ></CallToAction>
          </div>
          <div className="max-w-[1024px] mt-4 md:mt-8 lg:mt-12 lg:pr-4">
            {firstPhotoPart && (
              <figure>
                <Picture
                  src={firstPhotoPart.image?.templateUrl}
                  alt={firstPhotoPart.image?.title ?? ''}
                  transformations={transformations.focusOnPhoto}
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
