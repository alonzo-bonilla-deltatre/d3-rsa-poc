import { CardProps } from '@/models/types/card';
import Title from '@/components/commons/Title/Title';
import Summary from '@/components/commons/Summary/Summary';

type CompProps = {
  title?: string;
  summary?: string;
} & CardProps;

const EventCardInfo = ({ title, summary, cardDesign }: CompProps) => {
  if (!cardDesign) {
    return null;
  }
  const style = cardDesign.style;
  const options = cardDesign.options;
  const cardInfoClassName = `${style?.cardInfoClassName} ${style?.hasDivider ? '-divider' : ''}`;

  return (
    <div className={cardInfoClassName}>
      <Title
        title={title}
        hide={options?.hideTitle}
        heading={options?.headingTitle ? options?.headingTitle : ''}
        className={`card__info-title ${style?.headingTitleClass ? style?.headingTitleClass : ''}`}
      ></Title>
      <Summary
        //@ts-ignore
        summary={summary}
        hide={options?.hideSummary}
        className={`card__info-summary ${style?.summaryClass ? style?.summaryClass : ''}`}
      ></Summary>
    </div>
  );
};

export default EventCardInfo;
