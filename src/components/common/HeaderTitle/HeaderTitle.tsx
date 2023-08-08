import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { HeaderTitleProps } from '@/models/types/components';

type HeaderTitleComponentProps = {} & HeaderTitleProps;

const HeaderTitle = ({ ...props }: HeaderTitleComponentProps) => {
  const HeadingTag = `${
    props.headerTitleHeadingLevel ? props.headerTitleHeadingLevel.toLowerCase() : 'h2'
  }` as keyof JSX.IntrinsicElements;
  return props.headerTitle ? (
    <div
      className={`${
        getBooleanProperty(props.hideHeaderTitle)
          ? 'flex justify-end items-center'
          : 'flex justify-between items-center'
      }`}
    >
      <HeadingTag className={`${getBooleanProperty(props.hideHeaderTitle) ? 'hidden' : 'flex'}`}>
        {props.headerTitle}
      </HeadingTag>
      {props.ctaLink && props.ctaTitle && (
        <a
          href={props.ctaLink}
          title={props.ctaTitle}
        >
          {props.ctaTitle}
        </a>
      )}
    </div>
  ) : (
    <></>
  );
};

export default HeaderTitle;
