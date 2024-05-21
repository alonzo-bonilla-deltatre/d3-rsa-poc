import { ReactNode } from 'react';
import { getOppositeBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type SectionContainerProps = {
  children?: ReactNode;
  isFullWidth?: boolean;
  removeSectionHtmlTag?: boolean;
  className?: string;
};

const SectionContainer = ({ children, isFullWidth, removeSectionHtmlTag, className }: SectionContainerProps) => {
  const keepSectionTag = getOppositeBooleanProperty(removeSectionHtmlTag);
  const SectionContainer = `${!keepSectionTag ? 'div' : 'section'}` as keyof JSX.IntrinsicElements;
  return (
    <SectionContainer className={`mb-10 first:mt-10 last:mt-0 ${className ? className : ''} ${isFullWidth ? ' w-full ' : ' container mx-auto '}`}>
      {children}
    </SectionContainer>
  );
};

export default SectionContainer;
