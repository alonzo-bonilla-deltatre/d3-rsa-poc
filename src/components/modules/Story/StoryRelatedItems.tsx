import { DistributionEntity, Tag } from '@/models/types/forge';
import Picture from '@/components/commons/Picture/Picture';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import Typography from '@/components/commons/Typography/Typography';

type RelatedItemsProps = {
  relations: any[];
};

const RelatedItems = ({ relations }: RelatedItemsProps) => {
  if (!relations) return null;

  return (
    <>
      {relations.map((relItem: DistributionEntity, index: number) => {
        const description = relItem?.fields?.description ? relItem?.fields?.description : relItem?.headline;

        return (
          <div className={'flex flex-col gap-2 justify-between lg:pb-8 lg:border-b last:border-0'}>
            {relItem?.tags && (
              <div key={index} className={'flex flex-col gap-2'}>
                {relItem?.tags.map((tag: Tag, index: number) => 
                  <Typography variant={'tag-l'} key={index}>{tag.title}</Typography>
                )}
              </div>
            )}
            <Typography variant={'tag-l'}>{relItem.title}</Typography>
            <Typography variant={'body-l'}>{relItem.title}</Typography>
            <Typography variant={'body-s'} className={'text-gray-500'}>{description}</Typography>
            <Picture
              src={relItem?.thumbnail?.templateUrl ? relItem?.thumbnail?.templateUrl : relItem?.image?.templateUrl ? relItem?.image?.templateUrl : ''}
              transformations={transformations.thumbnail_landscape_detail}
              alt={relItem.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        );
      })}
    </>
  );
};

export default RelatedItems;
