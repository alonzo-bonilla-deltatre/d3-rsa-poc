import { ComponentProps } from "@/models/types/components";
import { getAllEntities } from "@/services/dapiService";
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

type QueryStringModuleProps = {
  skip: number;
  limit: number;
  tags: string;
};

const getQueryString = ({ skip, limit, tags }: QueryStringModuleProps) => {
  // Should look like $skip=0&$limit=10&tags.slug=supercars&tags.slug=test
  let queryString: string[] = [];
  if (skip) {
    queryString.push(`$skip=${skip}`);
  }
  if (limit) {
    queryString.push(`$limit=${limit}`);
  }
  if (tags?.length && tags.includes(",")) {
    const tagSlugs = tags.split(",");
    tagSlugs.forEach((tag) => {
      queryString.push(`$tags.slug=${tag}`);
    });
  }
  return queryString.join("&");
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
            <Card  key={nanoid()} entity={entity} ></Card>
          );
        })}
      </div>
    </section>
  ) : (
    <></>
  );
};
export default PromoGrid;
