import { CardProps } from '@/models/types/card';
import Title from '@/components/common/Title/Title';
import Summary from '@/components/common/Summary/Summary';
import { CustomPromoFields } from '@/models/types/forge.customEntityFields';

const PromoCardInfo = ({ entity, cardDesign }: CardProps) => {
  if (!entity || !cardDesign) {
    return null;
  }
  const style = cardDesign.style;
  const options = cardDesign.options;
  const cardInfoClassName = `${style?.cardInfoClassName} ${style?.hasDivider ? '-divider' : ''}`;

  return (
    <div className={cardInfoClassName}>
      <Title
        title={entity.title}
        hide={options?.hideTitle}
        heading={options?.headingTitle ? options?.headingTitle : ''}
        className={`card__info-title ${style?.headingTitleClass ? style?.headingTitleClass : ''}`}
      ></Title>
      <Summary
        //@ts-ignore
        summary={(entity.fields as CustomPromoFields)?.description}
        hide={options?.hideSummary}
        className={`card__info-summary ${style?.summaryClass ? style?.summaryClass : ''}`}
      ></Summary>
    </div>
  );
};

export default PromoCardInfo;
