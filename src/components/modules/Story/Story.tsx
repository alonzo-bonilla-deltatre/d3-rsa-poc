import SocialShare from '@/components/commons/SocialShare/SocialShare';
import StoryHeader from '@/components/modules/Story/StoryHeader';
import StoryParts from '@/components/modules/Story/StoryParts';
import RelatedItems from '@/components/modules/Story/StoryRelatedItems';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import { getMetadata } from '@/services/metadataService';
import { translate } from '@/helpers/translationHelper';
import { formatDate } from '@/helpers/dateHelper';
import logger from '@/utilities/loggerUtility';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import {
  ForgeDapiEntityCode,
  ForgeEntityType,
  ForgeMetadataCategoryType,
  ForgeSocialsMetadataKey,
} from '@/models/types/forge';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import Typography from '@/components/commons/Typography/Typography';

const Markdown = dynamic(() => import('@/components/commons/Markdown/Markdown'));

type StoryProps = {
  slug?: string;
} & ModuleProps;

const Story = async ({ data }: { data: ComponentProps }) => {
  const props = data.properties as StoryProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const fbAppId = getMetadata(
    data.metadata || [],
    ForgeMetadataCategoryType.socials,
    ForgeSocialsMetadataKey.fb_app_id,
  )?.value;

  const storyEntity = await getEntity(ForgeDapiEntityCode.stories, props.slug, {
    hasLinkRulesForRelationsAndParts: true,
    hasThumbnailPlaceholder: true,
    variables: data.variables,
  });
  if (!storyEntity) {
    logger.log(`Cannot find Story entity with slug ${props.slug} `, LoggerLevel.warning);
    notFound();
  }

  const description = storyEntity?.fields?.description ? storyEntity?.fields?.description : storyEntity?.headline;
  const relatedArticles = storyEntity?.relations?.filter((entity) => entity.type === ForgeEntityType.story) ?? [];

  return (
    <article>
      <StoryHeader storyEntity={storyEntity}></StoryHeader>
      <ModuleContainer>
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 lg:max-w-full lg:mx-auto content m-2 lg:m-0">
          {relatedArticles.length > 0 && (
            <div className="col-span-3 z-10 hidden lg:flex border-r pe-8">
              <div className="w-full flex flex-col">
                <Typography variant={'h3'} className={'mb-6'}>{translate('related-articles')}</Typography>
                <div className={'flex flex-col gap-6'}>
                  <RelatedItems
                    relations={relatedArticles}
                  ></RelatedItems>
                </div>
              </div>
            </div>
          )}
          <div
            className={`${relatedArticles.length > 0 ? 'col-span-9' : 'col-start-3 col-end-11'} flex flex-col gap-5 lg:gap-10`}>
            <div className="flex flex-col gap-2 lg:gap-4">
              <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-row items-center">
                  <Typography variant={'tag-l'} as={'time'} className="text-gray-500 uppercase">
                    {formatDate(storyEntity?.contentDate, 'DD MMMM YYYY')}
                  </Typography>
                </div>
                <SocialShare
                  title={storyEntity?.title}
                  fbAppId={fbAppId}
                />
              </div>
              <Typography variant={'h1'} className="uppercase">{storyEntity?.title}</Typography>
              {description && (
                <Typography variant={'story-description'}>
                  <Markdown
                    markdownText={description}
                  />
                </Typography>
              )}
            </div>
            <StoryParts storyEntity={storyEntity}></StoryParts>
            {relatedArticles.length > 0 && (
              <div className="flex flex-col lg:hidden border-t">
                <Typography variant={'h3'} className={'pt-10 mb-6'}>{translate('related-articles')}</Typography>
                <div className="grid md:grid-cols-3 md:gap-x-3 lg:gap-x-6">
                  <RelatedItems
                    relations={relatedArticles}
                  ></RelatedItems>
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
