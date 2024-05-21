import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ModuleContainerProps = {
  children?: ReactNode;
  isFullWidth?: boolean;
  className?: string;
};

const ModuleContainer = ({ children, isFullWidth, className }: ModuleContainerProps) => {
  return (
    <div className={twMerge('mb-10 first:mt-10 last:mt-0', className ? className : '', isFullWidth ? ' w-full ' : ' container mx-auto ')}>
      {children}
    </div>
  );
};

export default ModuleContainer;
