import { ComponentProps } from "@/models/types/components";
import { getAllEntities } from "@/services/dapiService";
import { GraphicAssetsDashboardItem } from "@/models/types/gad";
import { getAssetsByTag } from "@/services/gadService";
import logger from "@/utilities/logger";
import { LoggerLevel } from "@/models/types/logger";
import Title from "@/components/common/Title";
import React from "react";
import TestMosaicContainer from "@/components/modules/TestMosaic/TestMosaicContainer";

type ModuleProps = {
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
  entityType: string;
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

const TestMosaicList = async ({ ...data }: ComponentProps) => {
  const {
    moduleTitle,
    headingLevel,
    displayModuleTitle,
    entityType,
    skip,
    limit,
    tags,
  } = data.properties as ModuleProps;
  if (!Object.hasOwn(data.properties, "entityType") || !entityType.length) {
    logger.log(
      "Cannot render TestMosaicList module with empty entityType",
      LoggerLevel.warning
    );
    return null;
  }

  const queryString = getQueryString({ skip, limit, tags });

  const promoEntitiesFetch = getAllEntities(entityType, queryString);

  const [promos] = await Promise.all([promoEntitiesFetch]);
  const items = promos?.items;

  const gadAssetsPlaceHolderFetch = getAssetsByTag("react-poc-placeholder");

  const [gadThumbnailPlaceHolderAssets] = await Promise.all([
    gadAssetsPlaceHolderFetch,
  ]);
  const thumbnailPlaceHolder: GraphicAssetsDashboardItem | null =
    gadThumbnailPlaceHolderAssets?.length
      ? gadThumbnailPlaceHolderAssets[0]
      : null;

  return items?.length ? (
    <>
      <section className="mt-8">
        <Title
          canRender={/true/.test(displayModuleTitle)}
          heading={headingLevel}
          text={moduleTitle}
        ></Title>
        <div className="flex px-8">
          <TestMosaicContainer items={items} thumbnailPlaceHolder={thumbnailPlaceHolder}></TestMosaicContainer>
        </div>
      </section>
    </>
  ) : (
    <div />
  );
};
export default TestMosaicList;
