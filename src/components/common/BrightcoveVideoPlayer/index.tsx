import { DistributionEntity } from "@/models/types/dapi";

type CardProps = {
  entity: DistributionEntity;
};

const BrightcoveVideoPlayer = ({ ...props }: CardProps) => {
  const entity = props.entity;
  const oembedUrl = `https://players.brightcove.net/${entity.fields["brightcoveAccountId"]}/default_default/index.html?videoId=${entity.fields["brightcoveId"]}`;

  return (
    entity && (
      <>
        <iframe
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          src={oembedUrl}
          className="w-full h-full absolute"
        />
      </>
    )
  );
};

export default BrightcoveVideoPlayer;
