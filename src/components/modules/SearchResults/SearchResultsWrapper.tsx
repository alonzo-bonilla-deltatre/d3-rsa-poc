import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const SearchResults = dynamic(() => import('@/components/modules/SearchResults/index'));

const SearchResultsWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <SearchResults {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <SearchResultsWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
