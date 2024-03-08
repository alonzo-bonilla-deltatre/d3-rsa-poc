import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { ReactNode } from 'react';
import CallToActionContent from '@/components/common/CallToAction/CallToActionContent';
import Loader from '@/components/common/Loader/Loader';
import Link from '@/components/common/Link/Link';

type CallToActionProps = {
  url?: string;
  text?: string | null;
  isExternal?: boolean;
  style?: string;
  icon?: string;
  hide?: boolean;
  isCard?: boolean;
  className?: string;
  svgIcon?: ReactNode;
  buttonType?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  isDisabled?: boolean;
  baseUrl?: string;
  onClick?: () => void;
};

const CallToAction = ({
  url,
  text,
  style,
  icon,
  hide,
  className,
  svgIcon,
  buttonType,
  isLoading,
  isDisabled,
  baseUrl,
  onClick,
}: CallToActionProps) => {
  if (hide) {
    return null;
  }
  const displayStyle = getStringProperty(style, '');

  return (
    <>
      {url ? (
        <Link
          href={url}
          baseUrl={baseUrl}
          className={`${getCtaClasses(displayStyle, false)} ${className ?? ''}`}
        >
          <CallToActionContent
            icon={icon}
            text={text}
            svgIcon={svgIcon}
          />
        </Link>
      ) : (
        <button
          onClick={onClick}
          type={buttonType || 'button'}
          className={`${getCtaClasses(displayStyle, false)} relative ${className ?? ''}`}
          disabled={isDisabled}
        >
          {isLoading && <Loader />}
          <CallToActionContent
            icon={icon}
            text={text}
            svgIcon={svgIcon}
          />
        </button>
      )}
    </>
  );
};

export default CallToAction;

export const getCtaClasses = (style: string, isCard: boolean) => {
  const ctaClass = isCard ? 'cta--small' : 'cta';
  const ctaCommonClasses = 'd3-cta d3-ty-cta-small inline-flex items-center gap-2 uppercase';
  const ctaButtonClasses = 'relative py-2 px-5 lg:d3-ty-cta-large before:absolute before:inset-0 before:rounded-full';

  switch (style) {
    case 'primary':
      return `${ctaCommonClasses} ${ctaButtonClasses}
      text-white dark:text-black 
      before:bg-black before:dark:bg-white
      hover:before:bg-grey-900 focus-visible:before:bg-grey-900`;
    case 'primary-outlined':
      return `${ctaCommonClasses} ${ctaButtonClasses}
      text-black dark:text-white
      before:outline before:outline-1 before:-outline-offset-1
      hover:text-grey-900 focus-visible:text-grey-900`;
    case 'secondary':
      return `${ctaCommonClasses}
      text-black dark:text-white
      hover:text-grey-900 focus-visible:text-grey-900`;
    case 'secondary-on-dark':
      return `${ctaCommonClasses}
      text-white  dark:text-black 
      hover:text-grey-200 focus-visible:text-grey-200`;
    default:
      return `${ctaCommonClasses} text-black dark:text-white bg-transparent`;
  }
};
