import { ComponentProps } from "@/models/types/components";
import { getEntityList} from "@/services/dapiService";
import { DistributionEntity } from "@/models/types/dapi";
import dynamic from "next/dynamic";
import Card from "@/components/editorial/card/Card";
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
  selectionSlug: string;
};

const PromoGrid = async ({ ...data }: ComponentProps) => {
  const { moduleTitle, headingLevel, displayModuleTitle, skip, limit, tags , selectionSlug} =
    data.properties as ModuleProps;
const entityType = "promos";
  // const queryString = getQueryString({ skip, limit, tags });

  // const promoEntitiesFetch = getAllEntities("promos", queryString);

  // const [promos] = await Promise.all([promoEntitiesFetch]);
  // const dapiItems = promos as PagedResult;
  // const items = dapiItems?.items;

  const items = await getEntityList(selectionSlug, { skip, limit, tags }, entityType);

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
