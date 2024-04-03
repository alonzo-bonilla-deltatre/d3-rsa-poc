import { getBooleanProperty, getStringProperty } from '@/helpers/pageComponentPropertyHelper';

type CardTitleProps = {
  title?: string;
  heading?: string | null;
  hide?: boolean;
  className?: string;
};

const Title = ({ title, hide, className, heading }: CardTitleProps) => {
  const HeadingTag = `${heading ? heading.toLowerCase() : 'h3'}` as keyof JSX.IntrinsicElements;
  const cssClass = `card__info-title line-clamp-2 ${getStringProperty(className, '')}`;
  hide = getBooleanProperty(hide);

  if (hide || !title) return null;

  return <HeadingTag className={cssClass}>{title}</HeadingTag>;
};

export default Title;
