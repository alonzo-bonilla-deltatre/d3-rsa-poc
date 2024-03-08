import { DistributionEntity } from '@/models/types/forge';
import EditorialEntity from '@/components/relatedItems/EditorialEntity/EditorialEntity';
import { ReturnComponentRender } from '@/models/types/components';
import { nanoid } from 'nanoid';

const EditorialEntityWrapper = ({ data }: { data: DistributionEntity }): ReturnComponentRender => (
  <EditorialEntity data={data} />
);

const render = ({ ...data }: DistributionEntity): ReturnComponentRender => (
  <EditorialEntityWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
