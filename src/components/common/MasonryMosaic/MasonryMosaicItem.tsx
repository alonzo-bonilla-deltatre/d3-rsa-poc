import Picture from '@/components/common/Picture/Picture';
import { DistributionEntity } from '@/models/types/forge';
import { ImageTransformations } from '@/models/types/images';
import { formatDate } from '@/utilities/dateFormatter';
import { nanoid } from 'nanoid';

type MosaicItemProps = {
  item: DistributionEntity;
  transformation: ImageTransformations;
  hasTextOverlap: boolean;
};

const MosaicItem = ({ ...data }: MosaicItemProps) => {
  const { item, transformation, hasTextOverlap } = data as MosaicItemProps;
  const entityImage = item.image ?? item.thumbnail;

  return (
    <div>
      {hasTextOverlap ? (
        <div>
          <div className=" grid grid-cols-1">
            {entityImage && (
              <figure className="p-2 col-start-1 row-start-1">
                <Picture
                  src={entityImage.templateUrl}
                  transformations={transformation}
                  alt={entityImage.title ?? ''}
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
              <h3 className="my-2 mt-4 text-xl font-bold tracking-tight dark:text-white">{item.title}</h3>
              <time className="mb-3 text-sm font-light text-[#BEBEBE]">{formatDate(item.contentDate)}</time>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {entityImage && (
            <figure className="p-2">
              <Picture
                className="w-full h-full object-cover"
                src={entityImage.templateUrl}
                transformations={transformation}
                alt={entityImage.title ?? ''}
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
            <h3 className="my-2 mt-4 text-xl font-bold tracking-tight dark:text-white">{item.title}</h3>
            <time className="mb-3 text-sm font-light text-[#BEBEBE]">{formatDate(item.contentDate)}</time>
          </div>
        </div>
      )}
    </div>
  );
};

export default MosaicItem;
