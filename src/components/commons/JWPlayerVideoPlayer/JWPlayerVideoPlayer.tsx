import { DistributionEntity } from '@/models/types/forge';
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';

type JWPlayerVideoPlayerProps = {
  entity?: DistributionEntity;
  containerCss?: string;
};

const JWPlayerVideoPlayer = ({ entity, containerCss }: JWPlayerVideoPlayerProps) => {
  if (!entity) return null;

  containerCss = getStringProperty(containerCss, 'grid grid-cols-1 relative overflow-hidden w-full');
  const videoId = entity?.fields?.videoId ?? '';
  const oembedUrl = `https://cdn.jwplayer.com/players/${videoId}-3R7PqOD3.html`;

  if (!videoId) return null;

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

export default JWPlayerVideoPlayer;
