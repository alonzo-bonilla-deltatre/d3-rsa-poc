import { DistributionEntity } from '@/models/types/forge';
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';

type BrightcoveVideoPlayerProps = {
  entity?: DistributionEntity;
  containerCss?: string;
};

const BrightcoveVideoPlayer = ({ entity, containerCss }: BrightcoveVideoPlayerProps) => {
  if (!entity) return null;

  containerCss = getStringProperty(containerCss, 'grid grid-cols-1 relative overflow-hidden w-full');
  const brightcoveAccountId = entity?.fields?.brightcoveAccountId ?? '';
  const brightcoveId = entity?.fields?.brightcoveId ?? '';
  const oembedUrl = `https://players.brightcove.net/${brightcoveAccountId}/default_default/index.html?videoId=${brightcoveId}`;

  if (!brightcoveAccountId || !brightcoveId) return null;

  return (
    <>
      <div className={containerCss}>
        <iframe
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
          src={oembedUrl}
          className="aspect-video h-full w-full"
        />
      </div>
    </>
  );
};

export default BrightcoveVideoPlayer;
