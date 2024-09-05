import SocialShare from '@/components/commons/SocialShare/SocialShare';
import StoryHeader from '@/components/modules/Story/StoryHeader';
import StoryParts from '@/components/modules/Story/StoryParts';
import RelatedItems from '@/components/modules/Story/StoryRelatedItems';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import { translate } from '@/helpers/translationHelper';
import logger from '@/utilities/loggerUtility';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { ForgeDapiEntityCode, ForgeEntityType } from '@/models/types/forge';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import Typography from '@/components/commons/Typography/Typography';
import Date from '@/components/commons/Date/Date';
import { DateType } from '@/models/types/date';

const Markdown = dynamic(() => import('@/components/commons/Markdown/Markdown'));

const Story = async ({ data }: { data: ComponentProps }) => {
  const props = data.properties as ModuleProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const storyEntity = await getEntity(ForgeDapiEntityCode.stories, props.slug, {
    hasLinkRulesForRelationsAndParts: true,
    hasThumbnailPlaceholder: true,
    variables: data.variables,
  });
  if (!storyEntity) {
    logger.log(`Cannot find ${ForgeDapiEntityCode.stories} entity with slug ${props.slug} `, LoggerLevel.warning);
    notFound();
  }

  const description = storyEntity?.fields?.description ? storyEntity?.fields?.description : storyEntity?.headline;
  const relatedArticles = storyEntity?.relations?.filter((entity) => entity.type === ForgeEntityType.story) ?? [];

  return (
    <article className="h-full bg-white pb-5 text-black lg:pb-10">
      <StoryHeader storyEntity={storyEntity}></StoryHeader>
      <ModuleContainer>
        <div className="content m-2 flex flex-col lg:m-0 lg:mx-auto lg:grid lg:max-w-full lg:grid-cols-12 lg:gap-6">
          {relatedArticles.length > 0 && (
            <div className="z-10 col-span-3 hidden pe-8 lg:flex ltr:border-r rtl:border-l">
              <div className="flex w-full flex-col">
                <Typography
                  variant="h3"
                  className="mb-6"
                >
                  {translate('related-articles')}
                </Typography>
                <div className="flex flex-col gap-6">
                  <RelatedItems relations={relatedArticles}></RelatedItems>
                </div>
              </div>
            </div>
          )}
          <div className={`${relatedArticles.length > 0 ? 'col-span-9' : 'col-start-3 col-end-11'} flex flex-col`}>
            <div className="mb-8 flex flex-col gap-2 lg:mb-10 lg:gap-4">
              <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-row items-center">
                  <Typography
                    variant="tag-l"
                    as="time"
                    className="uppercase text-grey-100"
                  >
                    <Date
                      date={storyEntity?.contentDate}
                      dateType={DateType.standard}
                    />
                  </Typography>
                </div>
                <SocialShare
                  title={storyEntity?.title}
                  metadata={data.metadata}
                />
              </div>
              <Typography
                variant="h1"
                className="uppercase"
              >
                {storyEntity?.title}
              </Typography>
              {description && (
                <Typography variant="story-description">
                  <Markdown markdownText={description} />
                </Typography>
              )}
            </div>
            <StoryParts storyEntity={storyEntity}></StoryParts>
            {relatedArticles.length > 0 && (
              <div className="flex flex-col border-t lg:hidden">
                <Typography
                  variant="h3"
                  className="mb-6 pt-10"
                >
                  {translate('related-articles')}
                </Typography>
                <div className="grid md:grid-cols-3 md:gap-x-3 lg:gap-x-6">
                  <RelatedItems relations={relatedArticles}></RelatedItems>
                </div>
              </div>
            )}
          </div>
        </div>
      </ModuleContainer>
    </article>
  );
};
export default Story;
