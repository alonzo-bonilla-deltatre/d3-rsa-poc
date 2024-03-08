import { getSummary } from '@/components/common/cards/Card/CardHelpers';
import Date from '@/components/common/Date/Date';
import ElementsCount from '@/components/common/ElementsCount/ElementsCount';
import Roofline from '@/components/common/Roofline/Roofline';
import Summary from '@/components/common/Summary/Summary';
import Title from '@/components/common/Title/Title';
import { CardProps } from '@/models/types/card';
import { ForgeDapiEntityCode } from '@/models/types/forge';

const AlbumCardInfo = ({ entity, cardDesign }: CardProps) => {
  if (!entity || !cardDesign) {
    return null;
  }
  const style = cardDesign.style;
  const options = cardDesign.options;
  const cardInfoClassName = style?.cardInfoClassName;

  return (
    <div className={cardInfoClassName}>
      <Roofline
        context={entity.context}
        hide={options?.hideRoofline}
        className={`card__info-roofline ${style?.rooflineClass ? style?.rooflineClass : ''}`}
      ></Roofline>
      <Title
        title={entity.title}
        hide={options?.hideTitle}
        heading={options?.headingTitle ? options?.headingTitle : ''}
        className={`card__info-title ${style?.headingTitleClass ? style?.headingTitleClass : ''}`}
      ></Title>
      <Date
        date={entity.contentDate}
        hide={options?.hideDate}
        className={`card__info-date ${style?.dateClass ? style?.dateClass : ''}`}
      ></Date>
      <Summary
        //@ts-ignore
        summary={getSummary(entity)}
        hide={options?.hideSummary}
        className={`card__info-summary ${style?.summaryClass ? style?.summaryClass : ''}`}
      ></Summary>
      <ElementsCount
        elementsCount={entity.elementsCount}
        type={ForgeDapiEntityCode.photos}
      ></ElementsCount>
    </div>
  );
};

export default AlbumCardInfo;
