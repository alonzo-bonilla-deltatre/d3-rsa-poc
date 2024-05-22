import { StoryPart } from '@/models/types/storyPart';
import { renderSvgIcon } from '@/components/icons';
import Typography from '@/components/commons/Typography/Typography';

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
        {renderSvgIcon('QuoteLeft', { className: 'text-link', width: 25, height: 21 })}
        <div className="w-full flex flex-col mx-4">
          <Typography
            variant={'quote'}
            as={'span'}
            className={'text-center'}
          >
            {quote}
          </Typography>
          <Typography
            variant={'h6'}
            as={'cite'}
            className={'mt-4 uppercase not-italic mx-auto'}
          >
            {author}
          </Typography>
        </div>
        {renderSvgIcon('QuoteRight', { className: 'text-link', width: 25, height: 21 })}
      </div>
    </div>
  );
};

export default Quote;
