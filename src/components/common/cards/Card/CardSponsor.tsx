import { DistributionEntity } from '@/models/types/forge';
import { getCardSponsor } from '@/components/common/cards/Card/CardHelpers';
import TranslateLabel from '@/components/common/TranslatedLabel/TranslatedLabel';
import GadAsset from '@/components/common/GadAsset/GadAsset';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type CompProps = {
  entity: DistributionEntity;
  hide?: boolean;
};

const CardSponsor = ({ entity, hide }: CompProps) => {
  hide = getBooleanProperty(hide);
  const sponsor = getCardSponsor(entity);
  if (!hide || !sponsor) return null;

  return (
    <div className="card__chip--sponsored-by d3-ty-tag-large">
      <span>
        <TranslateLabel translationTermKey={'sponsored-by'} />
      </span>
      <GadAsset
        src={sponsor?.fields?.partnerLogo?.assetUrl ?? ''}
        height={20}
        width={20}
        title={sponsor?.title ? sponsor?.title : ''}
        transformations={transformations.best_assets}
        className={'object-fill'}
      ></GadAsset>
    </div>
  );
};

export default CardSponsor;
