"use client";

import Picture from "@/components/common/Picture";
import { DistributionEntity } from "@/models/types/dapi";
import { GraphicAssetsDashboardItem } from "@/models/types/gad";
import { ImageTransformations } from "@/models/types/images";
import { transformations } from "@/utilities/cloudinaryTransformations";
import { formatDate } from "@/utilities/dateFormatter";
import { nanoid } from "nanoid";

type TestMosaicItemProps = {
  item: DistributionEntity;
  thumbnailPlaceHolder: GraphicAssetsDashboardItem | null;
  transformation: ImageTransformations;
  hasTextOverlap: boolean;
};

const TestMosaicItem = ({ ...data }: TestMosaicItemProps) => {
  const { item, thumbnailPlaceHolder, transformation, hasTextOverlap } =
    data as TestMosaicItemProps;

  return (
    <>
      {hasTextOverlap ? (
        <>
          <div className=" grid grid-cols-1">
            {item.thumbnail ? (
              <figure className="p-2 col-start-1 row-start-1">
                <Picture
                  src={item.thumbnail.templateUrl}
                  transformations={transformation}
                  width={416}
                  height={234}
                  alt={item.thumbnail.title ?? ""}
                  className="w-full h-full object-cover opacity-[.50]"
                />
              </figure>
            ) : (
              <figure className="p-2 col-start-1 row-start-1">
                <Picture
                  src={thumbnailPlaceHolder?.assetUrl ?? ""}
                  transformations={transformation}
                  width={416}
                  height={234}
                  alt={thumbnailPlaceHolder?.publicId ?? ""}
                  className="w-full h-full object-cover opacity-[.50]"
                />
              </figure>
            )}

            <div className="p-5 col-start-1 row-start-1 flex justify-end flex-col z-10">
              {item.tags && (
                <div className="flex">
                  {item.tags.map((tag) => {
                    return (
                      <span
                        key={nanoid()}
                        className="uppercase mr-2 font-bold text-base bg-[#EE3123] p-2 w-fit"
                      >
                        {tag.title}
                      </span>
                    );
                  })}
                </div>
              )}
              <h3 className="my-2 mt-4 text-xl font-bold tracking-tight dark:text-white">
                {item.title}
              </h3>
              <time className="mb-3 text-sm font-light text-[#BEBEBE]">
                {formatDate(item.contentDate)}
              </time>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          {item.thumbnail ? (
            <figure className="p-2">
              <Picture
                className="w-full h-full object-cover"
                src={item.thumbnail.templateUrl}
                transformations={transformation}
                width={416}
                height={234}
                alt={item.thumbnail.title ?? ""}
              />
            </figure>
          ) : (
            <figure className="p-2">
              <Picture
                className="w-full h-full object-cover"
                src={thumbnailPlaceHolder?.assetUrl ?? ""}
                transformations={transformation}
                width={416}
                height={234}
                alt={thumbnailPlaceHolder?.publicId ?? ""}
              />
            </figure>
          )}
          <div className="p-2 py-5">
            {item.tags && (
              <div className="flex">
                {item.tags.map((tag) => {
                  return (
                    <span
                      key={nanoid()}
                      className="uppercase mr-2 font-bold text-base bg-[#EE3123] p-2 w-fit"
                    >
                      {tag.title}
                    </span>
                  );
                })}
              </div>
            )}
            <h3 className="my-2 mt-4 text-xl font-bold tracking-tight dark:text-white">
              {item.title}
            </h3>
            <time className="mb-3 text-sm font-light text-[#BEBEBE]">
              {formatDate(item.contentDate)}
            </time>
          </div>
        </>
      )}
    </>
  );
};

export default TestMosaicItem;
