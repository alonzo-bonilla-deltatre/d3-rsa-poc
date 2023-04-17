import {GetSrcFromMarkup} from "@/helpers/storyPartsHelper";
import {StoryPart} from "@/models/types/storyPart";

type OembedProps = {
  entity: StoryPart;
};

const Oembed = ({...props}: OembedProps) => {
  const {entity} = props as OembedProps;
  const content = entity.content as any;
  let src = undefined;

  if (content["provider_name"] && content["provider_name"].toLowerCase() === "youtube") {
    src = GetSrcFromMarkup(content["html"]);
  }

  return (
    entity && (
      <>
        {src ?
          (
            <div className="grid grid-cols-1 relative overflow-hidden w-full pt-[56.25%]">
              <iframe
                allowFullScreen
                src={src}
                className="w-full h-full absolute"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 relative overflow-hidden w-full">
              <div className="w-full mx-auto flex flex-col items-center"
                   dangerouslySetInnerHTML={{__html: content["html"]}}/>
            </div>
          )}

      </>
    )
  );
};

export default Oembed;