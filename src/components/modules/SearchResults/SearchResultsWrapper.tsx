import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const SearchResults = dynamic(() => import('@/components/modules/SearchResults/SearchResults'), { ssr: false });

const SearchResultsWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <SearchResults data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <SearchResultsWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
