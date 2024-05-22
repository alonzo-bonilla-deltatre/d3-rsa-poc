import { ReactNode } from 'react';
import { getOppositeBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { twMerge } from 'tailwind-merge';

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
    <SectionContainer
      className={twMerge('mb-10 first:mt-10 last:mb-0', className, isFullWidth ? 'w-full' : 'container mx-auto')}
    >
      {children}
    </SectionContainer>
  );
};

export default SectionContainer;
