import { DistributionEntity } from "@/models/types/dapi";

type CardProps = {
  entity: DistributionEntity;
  isStoryPart: boolean;
};

const BrightcoveVideoPlayer = ({ ...props }: CardProps) => {
  const { entity, isStoryPart } = props as CardProps;
  const oembedUrl = `https://players.brightcove.net/${entity.fields["brightcoveAccountId"]}/default_default/index.html?videoId=${entity.fields["brightcoveId"]}`;

  return (
    entity && (
      <>
        <div className="grid grid-cols-1 relative overflow-hidden w-full pt-[56.25%]">
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
            <p className="mb-3 text-sm font-light text-[#BEBEBE]">© Copyright</p>
          </>
        )}
      </>
    )
  );
};

export default BrightcoveVideoPlayer;
