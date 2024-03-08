import PromoButtons from '@/components/common/cards/PromoCard/PromoButtons';
import Picture from '@/components/common/Picture/Picture';
import Sponsored from '@/components/common/Sponsored/Sponsored';
import { CardLayout } from '@/models/types/card';
import { DistributionEntity } from '@/models/types/forge';
import { CustomPromoFields } from '@/models/types/forge.customEntityFields';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { transformations } from '@/utilities/cloudinaryTransformations';

type PromoViewProps = {
  entity: DistributionEntity;
  sponsor: GraphicAssetsDashboardItem | null;
};
const PromoView = ({ entity, sponsor }: PromoViewProps) => {
  if (!entity) return null;

  return (
    <div className="relative grid grid-cols-1 max-h-[790px] min-h-[500px] bg-gray-700 w-full overflow-hidden">
      {entity.thumbnail && (
        <div className="col-start-1 row-start-1">
          <Picture
            src={entity.thumbnail.templateUrl}
            transformations={transformations.promo_detail}
            alt={entity.thumbnail.title ?? ''}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="m-4 my-auto xl:mx-40 col-start-1 row-start-1 z-10">
        <div className="flex flex-col-reverse md:flex-row justify-between ">
          <div>
            <header className="max-w-lg">
              <h3 className="text-heading-bold text-5xl md:text-6xl xl:text-8xl uppercase text-center md:text-left">
                {entity.title}
              </h3>
              <p className="mt-2 barlow text-xl text-center md:text-left line-clamp-2">
                {(entity.fields as CustomPromoFields)?.description}
              </p>
            </header>
            <PromoButtons
              entity={entity}
              isCard={false}
            ></PromoButtons>
          </div>

          {sponsor && (
            <div className="absolute top-2 right-2 md:relative md:col-start-10 md:row-start-10">
              {/* mb-8 mt-0 md:col-start-10 md:row-start-10 text-right */}
              <Sponsored
                hide={false}
                name={sponsor.name}
                width={70}
                height={20}
                assetUrl={sponsor.assetUrl}
              ></Sponsored>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PromoView;
