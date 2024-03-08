import { StoryPart } from '@/models/types/storyPart';
import { renderSvgIcon } from '@/components/icons';

type QuoteProps = {
  entity?: StoryPart;
};

const Quote = ({ entity }: QuoteProps) => {
  if (!entity) return null;
  const content = entity?.content;
  const quote = content['quote'];
  const author = content['author'];
  return (
    <div className="grid grid-cols-1 relative overflow-hidden w-full p-2">
      <div className={'flex'}>
        {renderSvgIcon('QuoteLeft', { className: 'text-accent', width: 25, height: 21 })}
        <div className="w-full flex flex-col mx-4">
          <span className={'d3-ty-quote text-center'}>{quote}</span>
          <cite className={'d3-ty-heading-6 mt-4 uppercase not-italic'}>{author}</cite>
        </div>
        {renderSvgIcon('QuoteRight', { className: 'text-accent', width: 25, height: 21 })}
      </div>
    </div>
  );
};

export default Quote;
