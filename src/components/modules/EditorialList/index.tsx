import { ComponentProps } from "@/models/types/components";
import { getEntityList } from "@/services/dapiService";
import { DistributionEntity } from "@/models/types/dapi";
import { nanoid } from "nanoid";
import logger from "@/utilities/logger";
import { LoggerLevel } from "@/models/types/logger";
import ModuleTitle from "@/components/common/ModuleTitle";
import Card from "@/components/common/Card";

type ModuleProps = {
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
  skip: number;
  limit: number;
  tags: string;
  entityType: string;
  selectionSlug: string;
};

const EditorialList = async ({ ...data }: ComponentProps) => {
  const { moduleTitle, headingLevel, displayModuleTitle, skip, limit, tags, selectionSlug, entityType } =
    data.properties as ModuleProps;
    if (!Object.hasOwn(data.properties, "entityType") || !entityType.length) {
      logger.log(
        "Cannot render TestList module with empty entityType",
        LoggerLevel.warning
      );
      return null;
    }

  const items = await getEntityList(selectionSlug, { skip, limit, tags }, entityType);


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
    <div />
  );
};
export default EditorialList;
