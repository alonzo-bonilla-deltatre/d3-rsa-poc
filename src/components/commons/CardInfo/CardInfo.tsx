import Author from '@/components/commons/Author/Author';
import { getSummary } from '@/components/commons/cards/Card/CardHelpers';
import Date from '@/components/commons/Date/Date';
import Roofline from '@/components/commons/Roofline/Roofline';
import Summary from '@/components/commons/Summary/Summary';
import Title from '@/components/commons/Title/Title';
import { CardProps } from '@/models/types/card';

const CardInfo = ({ entity, cardDesign }: CardProps) => {
  if (!entity || !cardDesign) {
    return null;
  }
  const style = cardDesign.style;
  const options = cardDesign.options;
  const cardInfoClassName = `${style?.cardInfoClassName} ${style?.hasDivider ? '-divider' : ''} 
  ${style?.isInnerInfo ? 'card__info--inner' : 'card__info--outer'}`;

  return (
    <div className={cardInfoClassName}>
      <Roofline
        context={entity.context}
        hide={options?.hideRoofline}
        className={`${style?.rooflineClass ? style?.rooflineClass : ''}`}
      ></Roofline>
      <Title
        title={entity.title}
        hide={options?.hideTitle}
        heading={options?.headingTitle ? options?.headingTitle : ''}
        className={`card__info-title ${style?.headingTitleClass ? style?.headingTitleClass : ''}`}
      ></Title>
      <Summary
        summary={getSummary(entity)}
        hide={options?.hideSummary}
        className={`card__info-summary ${style?.summaryClass ? style?.summaryClass : ''}`}
      ></Summary>
      <Date
        date={entity.contentDate}
        hide={options?.hideDate}
        className={`card__info-date ${style?.dateClass ? style?.dateClass : ''}`}
      ></Date>
      <Author
        author={entity.createdBy}
        hide={options?.hideAuthor}
        className={`card__info-author ${style?.authorClass ? style?.authorClass : ''}`}
      ></Author>
    </div>
  );
};

export default CardInfo;
