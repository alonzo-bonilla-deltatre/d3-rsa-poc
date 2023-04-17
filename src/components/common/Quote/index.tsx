import {StoryPart} from "@/models/types/storyPart";

type QuoteProps = {
  entity: StoryPart;
};

const Oembed = ({...props}: QuoteProps) => {
  const {entity} = props as QuoteProps;
  const content = entity.content as any;
  const quote = content["quote"];
  const author = content["author"];

  return (
    entity && (
      <>
        <div className="grid grid-cols-1 relative overflow-hidden w-full">
          <div className="w-full mx-auto flex flex-col items-center">
            <span>{quote}</span>
            <cite>{author}</cite>
          </div>
        </div>
      </>
    )
  );
};

export default Oembed;