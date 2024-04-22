import { ComponentProps } from '@/models/types/components';
import { StructureItem } from '@/models/types/pageStructure';
import { renderItem } from '@/services/renderService';

const NoTemplate = ({ data }: { data: ComponentProps }) => {
  if (!data) return null;
  return (
    <div id="main-container">
      {data?.items?.map((item: StructureItem) => renderItem(item, data.variables, data.metadata, data.previewToken))}
    </div>
  );
};

export default NoTemplate;
