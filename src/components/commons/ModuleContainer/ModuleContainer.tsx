import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ModuleContainerProps = {
  children?: ReactNode;
  isFullWidth?: boolean;
  className?: string;
};

const ModuleContainer = ({ children, isFullWidth, className }: ModuleContainerProps) => {
  return (
    <div className={twMerge('mb-5 lg:mb-10 first:mt-5 lg:first:mt-10', className, isFullWidth ? 'w-full' : 'container mx-auto px-2')}>
      {children}
    </div>
  );
};

export default ModuleContainer;
