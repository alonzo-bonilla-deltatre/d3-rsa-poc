import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { DistributionEntity } from '@/models/types/forge';
import dynamic from 'next/dynamic';

type YouTubeVideoPlayerProps = {
  entity: DistributionEntity;
  containerCss?: string;
};
// @ts-ignore
const Markdown = dynamic(() => import('@/components/commons/Markdown/Markdown'));

const YouTubeVideoPlayer = ({ ...props }: YouTubeVideoPlayerProps) => {
  const { entity} = props as YouTubeVideoPlayerProps;
  const containerCss = getStringProperty(props.containerCss, 'grid grid-cols-1 relative overflow-hidden w-full');
  const oembedUrl = `https://www.youtube.com/embed/${entity?.fields?.videoId}`;

  if (!entity) {
    return null;
  }

  return (
    <>
      <div className={containerCss}>
        <iframe
          title={entity.title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          src={oembedUrl}
          className="w-full h-full aspect-video"
        />
      </div>
    </>
  );
};

export default YouTubeVideoPlayer;
