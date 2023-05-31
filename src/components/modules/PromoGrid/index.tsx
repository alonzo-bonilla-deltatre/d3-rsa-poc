import { ComponentProps } from '@/models/types/components';
import { getEntityList } from '@/services/forgeDistributionService';
import { DistributionEntity } from '@/models/types/forge';
import { nanoid } from 'nanoid';
import ModuleTitle from '@/components/common/ModuleTitle';
import React from 'react';
import Card from '@/components/common/Card';

type ModuleProps = {
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
  skip: number;
  limit: number;
  tags: string;
  selectionSlug: string;
};

const PromoGrid = async ({ ...data }: ComponentProps) => {
  const { moduleTitle, headingLevel, displayModuleTitle, skip, limit, tags, selectionSlug } =
    data.properties as ModuleProps;

  const items = await getEntityList(selectionSlug, 'promos', { skip, limit, tags });

  return items?.length ? (
    <section className="mt-8">
      <ModuleTitle
        canRender={/true/.test(displayModuleTitle)}
        heading={headingLevel}
        text={moduleTitle}
      ></ModuleTitle>
      <div className="grid grid-cols-3 gap-4 px-8">
        {items.map((entity: DistributionEntity) => {
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
    </section>
  ) : (
    <div />
  );
};
export default PromoGrid;
