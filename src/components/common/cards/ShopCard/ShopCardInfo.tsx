import { CardProps } from '@/models/types/card';
import Title from '@/components/common/Title/Title';
import Summary from '@/components/common/Summary/Summary';
import { getSummary } from '@/components/common/cards/Card/CardHelpers';

type CompProps = {
  isPromo: boolean;
} & CardProps;

const ShopCardInfo = ({ entity, cardDesign, isPromo }: CompProps) => {
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
        summary={getSummary(entity)}
        hide={options?.hideSummary}
        className={`card__info-summary ${style?.summaryClass ? style?.summaryClass : ''}`}
      ></Summary>
      {isPromo ? (
        <div className={'flex flex-row mt-2 barlowcondensed-bold text-2xl md:text-2.5xl tracking-[0.0175em]'}>
          <div className={'text-grey-300 dark:text-grey-100 mr-2 line-through barlowcondensed '}>
            {entity.fields?.price}
          </div>
          {entity.fields?.salePrice}
        </div>
      ) : (
        <div className={'flex flex-row mt-1 barlowcondensed-bold text-2xl md:text-2.5xl  tracking-[0.0175em]'}>
          {entity.fields?.price}
        </div>
      )}
    </div>
  );
};

export default ShopCardInfo;
