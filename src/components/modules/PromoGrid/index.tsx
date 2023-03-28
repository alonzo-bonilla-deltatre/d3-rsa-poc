import { ComponentProps } from "@/models/types/components";
import { getAllEntities, getQueryString } from "@/services/dapiService";
import { DistributionEntity, PagedResult } from "@/models/types/dapi";
import dynamic from "next/dynamic";
import Card from "@/components/common/Card";
import { nanoid } from "nanoid";

// @ts-ignore
const Title = dynamic(() => import("@/components/common/Title"));

type ModuleProps = {
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
  skip: number;
  limit: number;
  tags: string;
};

const PromoGrid = async ({ ...data }: ComponentProps) => {
  const { moduleTitle, headingLevel, displayModuleTitle, skip, limit, tags } =
    data.properties as ModuleProps;

  const queryString = getQueryString({ skip, limit, tags });

  const promoEntitiesFetch = getAllEntities("promos", queryString);

  const [promos] = await Promise.all([promoEntitiesFetch]);
  const dapiItems = promos as PagedResult;
  const items = dapiItems?.items;

  return items?.length ? (
    <section className="mt-8">
      <Title
        canRender={/true/.test(displayModuleTitle)}
        heading={headingLevel}
        text={moduleTitle}
      ></Title>
      <div className="grid grid-cols-3 gap-4 px-8">
        {items.map((entity: DistributionEntity) => {
          return (
            <Card key={nanoid()} entity={entity} options={{
              hideIcon: true,
              hideRoofline: false,
              hideTitle: false,
              hideDate: false,
              hideAuthor: true,
              hideCta: true
            }} ></Card>
          );
        })}
      </div>
    </section>
  ) : (
    <></>
  );
};
export default PromoGrid;
