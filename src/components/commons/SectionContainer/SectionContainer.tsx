import { ReactNode } from 'react';
import { getOppositeBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { twMerge } from 'tailwind-merge';
import { HeaderTitleProps } from '@/models/types/components';

type SectionContainerProps = {
  children?: ReactNode;
  isFullWidth?: boolean;
  removeSectionHtmlTag?: boolean;
  className?: string;
} & HeaderTitleProps;

const SectionContainer = ({ children, isFullWidth, removeSectionHtmlTag, className }: SectionContainerProps) => {
  const keepSectionTag = getOppositeBooleanProperty(removeSectionHtmlTag);
  const SectionContainer = `${!keepSectionTag ? 'div' : 'section'}` as keyof JSX.IntrinsicElements;
  return (
    <SectionContainer
      className={twMerge('mb-5 lg:mb-10 first:mt-5 lg:first:mt-10', className, isFullWidth ? 'w-full' : 'container mx-auto px-2')}
    >
      {children}
    </SectionContainer>
  );
};

export default SectionContainer;
