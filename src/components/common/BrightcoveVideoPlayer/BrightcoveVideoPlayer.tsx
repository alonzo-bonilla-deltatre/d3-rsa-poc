import { DistributionEntity } from '@/models/types/forge';
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';

type BrightcoveVideoPlayerProps = {
  entity?: DistributionEntity;
  isStoryPart?: boolean;
  containerCss?: string;
};

const BrightcoveVideoPlayer = ({ entity, isStoryPart, containerCss }: BrightcoveVideoPlayerProps) => {
  if (!entity) return null;

  containerCss = getStringProperty(containerCss, 'grid grid-cols-1 relative overflow-hidden w-full pt-[56.25%]');
  const oembedUrl = `https://players.brightcove.net/${entity?.fields['brightcoveAccountId']}/default_default/index.html?videoId=${entity?.fields['brightcoveId']}`;

  return (
    <>
      <div className={containerCss}>
        <iframe
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          src={oembedUrl}
          className="w-full h-full absolute"
        />
      </div>
      {isStoryPart && (
        <>
          <p className="mt-8 mb-3">{entity.createdBy}</p>
          <p className="text-sm font-light text-gray-400">© Copyright</p>
        </>
      )}
    </>
  );
};

export default BrightcoveVideoPlayer;
