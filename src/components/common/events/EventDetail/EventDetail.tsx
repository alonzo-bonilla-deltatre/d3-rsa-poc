import CallToAction from '@/components/common/CallToAction/CallToAction';
import GadAsset from '@/components/common/GadAsset/GadAsset';
import SvgIcon from '@/components/common/SvgIcon/SvgIcon';
import { FacebookRounded, InstagramRounded, YouTubeRounded } from '@/components/icons';
import { EventEntity } from '@/models/types/forge.customEntityFields';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { formatDate } from '@/utilities/dateFormatter';
import HtmlContent from '@/components/common/HtmlContent/HtmlContent';

const headerStyles = {
  container: {},
} as const;

type EventProps = {
  entity?: EventEntity | null;
};

const EventDetail = ({ ...props }: EventProps) => {
  const { entity } = props as EventProps;
  if (!entity) return <></>;
  const socialClassName = 'mr-4 cursor-pointer hover:text-black transition duration-300';
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
        <section className="mt-8">
          <div
            className="grid grid-cols-1 max-h-[790px] min-h-[500px] bg-gray-700 w-full overflow-hidden"
            style={headerStyles?.container}
          >
            {entity.backgroundEventImageAsset && (
              <div className="col-start-1 row-start-1">
                <GadAsset
                  src={entity.backgroundEventImageAsset?.assetUrl}
                  title={entity?.headline ?? ''}
                  width={693}
                  height={390}
                  transformations={transformations.promo}
                />
              </div>
            )}
            <div className="mt-20 mx-40 col-start-1 row-start-1">
              <div className="flex justify-between">
                <div>
                  <header className="max-w-md">
                    {entity.eventLogoAsset && (
                      <div className="col-start-1 row-start-1">
                        <GadAsset
                          src={entity.eventLogoAsset?.assetUrl}
                          title={entity?.headline ?? ''}
                          width={transformations.logos.mobileWidth}
                          height={transformations.logos.mobileHeight}
                          transformations={transformations.logos}
                        />
                      </div>
                    )}
                    <span>{entity.eventType}</span>
                    <h3 className="font-bold text-4xl uppercase">{entity.headline}</h3>

                    {entity.description && (
                      <HtmlContent
                        content={entity.descriptionHtml}
                        classNames={'mt-8'}
                      />
                    )}

                    <div className="inline-flex rounded-md shadow-sm">
                      {entity.dateFrom && (
                        <div className="flex flex-col items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg ">
                          <span>{formatDate(entity.dateFrom, 'DD')}</span>
                          <span>{formatDate(entity.dateFrom, 'MMM')}</span>
                          <span>{formatDate(entity.dateFrom, 'YYYY')}</span>
                        </div>
                      )}
                      {entity.dateTo && (
                        <div className="flex flex-col items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md ">
                          <span>{formatDate(entity.dateTo, 'DD')}</span>
                          <span>{formatDate(entity.dateTo, 'MMM')}</span>
                          <span>{formatDate(entity.dateTo, 'YYYY')}</span>
                        </div>
                      )}
                    </div>

                    <ul className="flex py-2">
                      {entity.facebookProfile && (
                        <a
                          href={entity.facebookProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SvgIcon
                            className={socialClassName}
                            size={30}
                            icon={FacebookRounded}
                          ></SvgIcon>
                        </a>
                      )}
                      {entity.instagramProfile && (
                        <a
                          href={entity.instagramProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SvgIcon
                            className={socialClassName}
                            size={30}
                            icon={InstagramRounded}
                          ></SvgIcon>
                        </a>
                      )}
                      {entity.youtubeChannel && (
                        <a
                          href={entity.youtubeChannel}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SvgIcon
                            className={socialClassName}
                            size={30}
                            icon={YouTubeRounded}
                          ></SvgIcon>
                        </a>
                      )}
                    </ul>
                  </header>

                  <nav className="mt-8">
                    <ul className="list-none flex space-x-5">
                      {entity.url && (
                        <li>
                          <CallToAction
                            url={entity.url}
                            text={entity.eventUrl?.displayText ?? ''}
                            isExternal={!!entity.eventUrl?.openInNewTab}
                            style={'reverse'}
                            hide={false}
                          />
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default EventDetail;
