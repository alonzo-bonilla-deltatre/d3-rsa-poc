import Card from '@/components/common/Card';
import { nanoid } from 'nanoid';
import { DistributionEntity } from '@/models/types/forge';

type ModuleProps = {
  items: DistributionEntity[] | null;
};

const GridList = ({ ...props }: ModuleProps) => {
  const items = props.items as DistributionEntity[];
  return (
    <div className="grid grid-cols-3 gap-4 px-8">
      {items &&
        items.map((entity: DistributionEntity) => {
          return (
            <Card
              key={nanoid()}
              entity={entity}
              options={{
                hideIcon: true,
                hideRoofline: false,
                hideTitle: false,
                hideDate: false,
                hideAuthor: true,
                hideCta: true,
              }}
            ></Card>
          );
        })}
    </div>
  );
};

export default GridList;
