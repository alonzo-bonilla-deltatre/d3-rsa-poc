import { getCardSettings } from '@/components/common/cards/Card/CardHelpers';
import SocialShare from '@/components/common/SocialShare/SocialShare';
import StoryHeader from '@/components/modules/Story/StoryHeader';
import StoryParts from '@/components/modules/Story/StoryParts';
import RelatedItems from '@/components/modules/Story/StoryRelatedItems';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { CardLayout, CardOptions, CardType } from '@/models/types/card';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import { getMetadata } from '@/services/metadataService';
import { translate } from '@/services/translationService';
import { formatDate } from '@/utilities/dateFormatter';
import logger from '@/utilities/logger';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import {
  ForgeDapiEntityCode,
  ForgeEntityType,
  ForgeMetadataCategoryType,
  ForgeSocialsMetadataKey,
} from '@/models/types/forge';
const Markdown = dynamic(() => import('@/components/common/Markdown/Markdown'));

type StoryProps = {
  slug?: string;
} & ModuleProps;

const Story = async ({ data }: { data: ComponentProps }) => {
  const props = data.properties as StoryProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const fbAppId = getMetadata(
    data.metadata || [],
    ForgeMetadataCategoryType.socials,
    ForgeSocialsMetadataKey.fbappid
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

  const cardOptions = {
    hideAuthor: true,
    hideCta: true,
    hideIcon: false,
    hideSummary: true,
    hideTitle: false,
    hideRoofline: true,
    hideDate: false,
  } as CardOptions;
  const cardType = CardType.SmallestNews;
  const cardLayout = CardLayout.SquaredSmallHorizontal;
  const cardDesign = getCardSettings(cardType, cardOptions, cardLayout);

  const description = storyEntity?.fields?.description ? storyEntity?.fields?.description : storyEntity?.headline;
  const relatedArticles = storyEntity?.relations?.filter((entity) => entity.type === ForgeEntityType.story) ?? [];

  return (
    <article>
      <StoryHeader storyEntity={storyEntity}></StoryHeader>
      <div className="container">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 lg:max-w-full mx-auto content">
          {relatedArticles.length > 0 && (
            <div className="col-span-3 z-10 hidden lg:flex">
              <div className="w-full flex flex-col">
                <div className="p-1 mb-6">
                  <div className="d3-ty-heading-3 mt-16 mb-6">{translate('related-articles')}</div>
                  <RelatedItems
                    relations={relatedArticles}
                    hide={false}
                    cardDesign={cardDesign}
                  ></RelatedItems>
                </div>
              </div>
            </div>
          )}
          <div
            className={`${
              relatedArticles.length > 0 ? 'col-span-9' : 'col-start-3 col-end-11'
            } z-10 text-greyscale-dark dark:text-greyscale-pale text-xs barlow-medium not-italic border-b`}
          >
            <div className="mb-10 mt-4">
              <div className="flex flex-col lg:flex-row lg:justify-between mb-6 gap-4">
                <div className="flex flex-row items-center">
                  <time className="d3-ty-tag-large text-gray-400 uppercase">
                    {formatDate(storyEntity?.contentDate, 'DD MMMM YYYY')}
                  </time>
                </div>
                <SocialShare
                  title={storyEntity?.title}
                  fbAppId={fbAppId}
                />
              </div>
              <div className="d3-ty-heading-1 mb-2 lg:mb-4 uppercase">{storyEntity?.title}</div>
              {description && (
                <Markdown
                  classNames="d3-ty-story-description"
                  markdownText={description}
                />
              )}
            </div>
            <StoryParts storyEntity={storyEntity}></StoryParts>
            {relatedArticles.length > 0 && (
              <div className="flex flex-col mb-5 lg:mb-10 lg:hidden border-t">
                <div className="d3-ty-heading-3 pt-10 mb-6">{translate('related-articles')}</div>
                <div className="grid md:grid-cols-3 md:gap-x-3 md:px-4 lg:gap-x-6 lg:px-8">
                  <RelatedItems
                    relations={relatedArticles}
                    hide={false}
                    cardDesign={cardDesign}
                  ></RelatedItems>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
export default Story;
