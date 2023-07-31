import CallToAction from '@/components/common/CallToAction/CallToAction';
import GadAsset from '@/components/common/GadAsset/GadAsset';
import { StoryPart } from '@/models/types/storyPart';
import { getEventEntity } from '@/services/eventService';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { formatDate } from '@/utilities/dateFormatter';
import HtmlContent from '@/components/common/HtmlContent/HtmlContent';

type EventProps = {
  storyPart?: StoryPart;
};

const EventBanner = async ({ ...props }: EventProps) => {
  const { storyPart } = props as EventProps;
  if (!storyPart) return <></>;
  const entity = await getEventEntity(storyPart);
  if (!entity) return <></>;
  const headerStyles = entity.headerColor
    ? {
        container: {
          backgroundColor: `${entity.headerColor}`,
        },
      }
    : ({
        container: {},
      } as const);

  return (
    entity && (
      <>
        <section
          className="mb-32 text-gray-800 text-center lg:text-left background-radial-gradient"
          style={headerStyles?.container}
        >
          <div className="grid grid-cols-1 w-full overflow-hidden">
            {entity.backgroundEventImageAsset && (
              <div className="col-start-1 row-start-1 w-full flex justify-center items-center h-full">
                <GadAsset
                  src={entity.backgroundEventImageAsset.assetUrl}
                  title={entity?.headline ?? ''}
                  width={transformations.banner.mobileWidth}
                  height={transformations.banner.mobileHeight}
                  transformations={transformations.banner}
                />
              </div>
            )}
            <div className="mt-2 col-start-1 row-start-1 w-full h-full overflow-hidden bg-fixed">
              <div className="flex justify-center items-center h-full">
                <div className="text-center text-white px-6 py-6 md:py-0 md:px-12 max-w-[800px]">
                  <div className="inline-flex rounded-md shadow-sm">
                    {entity.dateFrom && (
                      <div className="flex flex-col items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md ">
                        <span className="inline-flex">
                          {formatDate(entity.dateFrom, 'DD MMM')}
                          {entity.dateTo ? ` - ${formatDate(entity.dateTo, 'DD MMM YYYY')}` : ''}
                        </span>
                      </div>
                    )}
                  </div>
                  {entity.eventLogoAsset && (
                    <div className="col-start-1 row-start-1">
                      <GadAsset
                        src={entity.eventLogoAsset.assetUrl}
                        title={entity?.headline ?? ''}
                        width={transformations.logos.mobileWidth}
                        height={transformations.logos.mobileHeight}
                        transformations={transformations.logos}
                      />
                    </div>
                  )}
                  <h3 className="text-5xl md:text-6xl xl:text-7xl uppercase first-line:font-bold tracking-tight leading-tight mb-6">
                    {entity.headline}
                  </h3>
                  {entity.description && (
                    <HtmlContent
                      content={entity.descriptionHtml}
                      classNames={'text-lg'}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <nav className="mt-8">
            <ul className="list-none flex space-x-5">
              {entity.url && (
                <li>
                  <CallToAction
                    url={entity.url}
                    text={entity.eventUrl?.displayText ?? ''}
                    isExternal={!!entity.eventUrl?.openInNewTab}
                    style={'link'}
                    hide={false}
                  />
                </li>
              )}
            </ul>
          </nav>
        </section>
      </>
    )
  );
};

export default EventBanner;
