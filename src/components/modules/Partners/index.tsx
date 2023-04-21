import { ComponentProps } from '@/models/types/components';
import { getSelection } from '@/services/dapiService';
import { DistributionEntity } from '@/models/types/dapi';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
import ModuleTitle from '@/components/common/ModuleTitle';

// @ts-ignore
const Partner = dynamic(() => import('@/components/common/Partner'));

type ModuleProps = {
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
  hideDate: string;
  selectionSlug: string;
  limit: string;
};

const Partners = async ({ ...data }: ComponentProps) => {
  const { moduleTitle, headingLevel, displayModuleTitle, selectionSlug } = data.properties as ModuleProps;
  const defaultItemLimit = 5;

  const selectionFetch = getSelection(selectionSlug);
  const [selection] = await Promise.all([selectionFetch]);
  const items = selection?.items;

  return (
    <section className="relative mx-60 mt-20 col-start-1">
      <ModuleTitle
        canRender={/true/.test(displayModuleTitle)}
        heading="h3"
        text={moduleTitle}
      ></ModuleTitle>
      <div className="grid grid-flow-row-dense lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {items &&
          items.map((entity: DistributionEntity) => {
            return (
              <Partner
                key={nanoid()}
                entity={entity}
                width={100}
                height={50}
              ></Partner>
            );
          })}
      </div>
    </section>
  );
};
export default Partners;
