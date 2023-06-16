import { ComponentProps } from '@/models/types/components';

type ModuleProps = {
  skip?: number;
  limit?: number;
};

const SearchResults = async ({ ...data }: ComponentProps) => {
  const { skip, limit } = data.properties as ModuleProps;

  return (
    <pre>
      Search results with skip: {skip ?? 0}, limit: {limit ?? 0}
    </pre>
  );
};
export default SearchResults;
