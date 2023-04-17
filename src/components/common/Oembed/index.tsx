import {StoryPart} from "@/models/types/storyPart";

type OembedProps = {
  entity: StoryPart;
};

const Oembed = ({...props}: OembedProps) => {
  const {entity} = props as OembedProps;
  const content = entity.content as any;

  return (
    entity && (
      <>
        <div className="grid grid-cols-1 relative overflow-hidden w-full">
          <div className="w-full mx-auto" dangerouslySetInnerHTML={{__html: content["html"]}} />
        </div>
      </>
    )
  );
};

export default Oembed;