import { getBooleanProperty, getStringProperty } from '@/helpers/pageComponentPropertyHelper';

type SummaryProps = {
  summary?: string;
  hide?: boolean;
  className?: string;
};

const Summary = ({ summary, hide, className }: SummaryProps) => {
  const cssClass = `card__info-summary  line-clamp-2 ${getStringProperty(className, '')}`;
  hide = getBooleanProperty(hide);

  if (hide || !summary) return null;

  return <span className={cssClass}>{summary}</span>;
};

export default Summary;
