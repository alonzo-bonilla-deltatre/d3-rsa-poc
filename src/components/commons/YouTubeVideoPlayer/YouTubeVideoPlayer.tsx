import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { DistributionEntity } from '@/models/types/forge';

type YouTubeVideoPlayerProps = {
  entity: DistributionEntity;
  containerCss?: string;
};

const YouTubeVideoPlayer = ({ ...props }: YouTubeVideoPlayerProps) => {
  const { entity } = props as YouTubeVideoPlayerProps;
  const containerCss = getStringProperty(props.containerCss, 'grid grid-cols-1 relative overflow-hidden w-full');
  const oembedUrl = `https://www.youtube.com/embed/${entity?.fields?.videoId}`;

  if (!entity) {
    return null;
  }

  return (
    <div className={containerCss}>
      <iframe
        title={entity.title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
        allowFullScreen
        src={oembedUrl}
        className="aspect-video h-full w-full"
      />
    </div>
  );
};

export default YouTubeVideoPlayer;
