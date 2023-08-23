import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';
import { AlbumEntity, DistributionEntity } from '@/models/types/forge';
import Picture from '@/components/common/Picture/Picture';
import { transformations } from '@/utilities/cloudinaryTransformations';

// @ts-ignore
const AlbumHeader = dynamic(() => import('@/components/modules/Album/AlbumHeader'));

type ModuleProps = {
  albumEntity?: AlbumEntity;
  hideAuthor?: boolean;
  hideDate?: boolean;
  hideDescription?: boolean;
  hideRoofline?: boolean;
  hideTitle?: boolean;
  hideSocial?: boolean;
};

const AlbumFeatured = ({ ...props }: ModuleProps) => {
  const albumEntity = props.albumEntity;
  const elements = albumEntity?.elements;
  const firstElement = elements?.slice(0, 1)[0];
  const firstRow = elements?.slice(1, 6);
  return (
    <>
      <AlbumHeader
        entity={albumEntity}
        {...props}
      ></AlbumHeader>
      <section className="w-full container mx-auto">
        <div className="grid gap-4 mx-20 col-start-1">
          {elements && firstElement && firstElement?.image && (
            <figure className="flex mx-auto">
              <Picture
                key={nanoid()}
                src={firstElement?.image.templateUrl}
                className="h-auto max-w-full rounded-lg"
                transformations={transformations.albumFeatured}
                alt={firstElement?.title}
              />
            </figure>
          )}
          <div className="grid grid-cols-5 gap-4">
            {elements &&
              firstRow?.map((entity: DistributionEntity) => {
                return (
                  entity.image && (
                    <figure className="flex mx-auto">
                      <Picture
                        key={nanoid()}
                        src={entity.image.templateUrl}
                        className="h-auto max-w-full rounded-lg"
                        transformations={transformations.albumFeaturedThumbnail}
                        alt={entity.title}
                      />
                    </figure>
                  )
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default AlbumFeatured;
