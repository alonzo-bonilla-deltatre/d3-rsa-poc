import { DistributionEntity } from '@/models/types/forge';
import { CustomPromoFields } from '@/models/types/forge.customEntityFields';
import CallToAction from '@/components/common/CallToAction/CallToAction';
import { getBooleanPropertyDefault } from '@/helpers/pageComponentPropertyHelper';
import UseTranslate from '@/hooks/useTranslate';

type CompProps = {
  entity: DistributionEntity;
  isCard?: boolean;
};

const PromoButtons = ({ entity, isCard }: CompProps) => {
  const translate = UseTranslate();
  const cta1Url = entity && (entity.fields as CustomPromoFields).callToAction1Link?.url;
  const cta1Text = entity && (entity.fields as CustomPromoFields).callToAction1Link?.displayText;
  const cta1Ext = (entity && (entity.fields as CustomPromoFields).callToAction1Link?.openInNewTab) ?? false;
  const cta2Url = entity && (entity.fields as CustomPromoFields).callToAction2Link?.url;
  const cta2Text = entity && (entity.fields as CustomPromoFields).callToAction2Link?.displayText;
  const cta2Ext = (entity && (entity.fields as CustomPromoFields).callToAction2Link?.openInNewTab) ?? false;
  isCard = getBooleanPropertyDefault(isCard, false);
  const hasButtons =
    (cta1Url !== undefined && cta1Text !== undefined) || (cta2Url !== undefined && cta2Text !== undefined);
  const buttonsClass = isCard ? 'promo-buttons--card' : 'promo-buttons';
  if (!hasButtons) return null;
  return (
    <nav
      className={buttonsClass}
      aria-label={translate('promo-navigation')}
    >
      <ul>
        {cta1Url && (
          <li>
            <CallToAction
              url={cta1Url}
              text={cta1Text}
              isExternal={cta1Ext}
              style={'primary'}
              hide={false}
              isCard={isCard}
            ></CallToAction>
          </li>
        )}
        {cta2Url && (
          <li>
            <CallToAction
              url={cta2Url}
              text={cta2Text}
              isExternal={cta2Ext}
              style={'secondary'}
              hide={false}
              isCard={isCard}
            ></CallToAction>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default PromoButtons;
