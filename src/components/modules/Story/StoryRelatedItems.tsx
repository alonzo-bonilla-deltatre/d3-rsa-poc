import Title from '@/components/common/Title';
import { DistributionEntity } from '@/models/types/dapi';
import { renderRelatedItem } from '@/services/renderHandlers/renderRelatedItems';

type ModuleProps = {
  relations: any[];
  hide: boolean;
};

const RelatedItems = ({ ...props }: ModuleProps) => {
  return !props.hide && props.relations && props.relations.length > 0 ? (
    <section className="w-full container mx-auto mt-40">
      <Title
        title={'related-items'}
        heading={'h3'}
        hide={false}
      ></Title>
      <div className="grid grid-cols-4 gap-4 px-8">
        {props.relations.map((relItem: DistributionEntity) => {
          return renderRelatedItem(relItem);
        })}
      </div>
    </section>
  ) : (
    <div />
  );
};

export default RelatedItems;
