import React from 'react';
import Picture from '@/components/commons/Picture/Picture';
import { DistributionEntity, ForgeEntityType } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { translate } from '@/helpers/translationHelper';
import Roofline from '@/components/commons/Roofline/Roofline';
import CallToAction from '@/components/commons/CallToAction/CallToAction';

type FocusOnViewProps = {
  storyEntity?: DistributionEntity;
  darkClassName?: string;
};

const FocusOnView = ({ storyEntity, darkClassName }: FocusOnViewProps) => {
  if (!storyEntity) return null;

  const { parts, summary } = storyEntity;

  const firstPhotoPart = parts?.find((part) => part.type === ForgeEntityType.photo);
  const defaultClasses = 'bg-white text-black dark:bg-black dark:text-white';
  return (
    <>
      <div className={`max-w-[1920px] overflow-hidden mx-auto relative ${darkClassName}`}>
        <div className="h-[481px] md:h-[617px]">
          <Picture
            className="md:max-w-none md:w-max lg:w-full h-full md:h-fit object-cover object-center opacity-[.50]"
            src={storyEntity?.thumbnail?.templateUrl ?? ''}
            alt={storyEntity?.title}
            transformations={transformations.focus_on_background}
          />
        </div>
        <div className="container px-4">
          <div className="absolute top-2/3 transform -translate-y-2/3 lg:px-6">
            <Roofline
              className={`d3-ty-tag-large uppercase ${defaultClasses} mb-1 px-1 py-0.5 w-fit`}
              context={storyEntity?.context}
            ></Roofline>
            <h2 className="d3-ty-heading-2 font-bold mb-8 md:mt-4 lg:mt-6 ">{storyEntity?.title}</h2>
          </div>
        </div>
      </div>
      <div className={`container mt-[-6rem] xl:mt-[-8rem] ${darkClassName}`}>
        <div className="lg:grid relative grid-cols-[586px_minmax(0px,_1fr)] lg:gap-2 xl:gap-6">
          <div className={`${defaultClasses} mx-4 py-6 px-3 md:px-6 lg:py-10 lg:px-5 xl:p-16 xl:max-w-[586px]`}>
            <h3 className="font-heading text-4xl font-bold text-gray-800 dark:text-gray-200 mb-0">
              {storyEntity?.headline}
            </h3>
            <div className="d3-ty-body-small pt-8 pr-8 pb-6 md:pt-12 md:pr-16 md:pb-12 text-gray-400">
              <p>{summary}</p>
            </div>
            <CallToAction
              url={storyEntity?.url}
              text={translate(`full-article`) + ' >'}
              style={'primary-on-dark'}
              hide={false}
            ></CallToAction>
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
