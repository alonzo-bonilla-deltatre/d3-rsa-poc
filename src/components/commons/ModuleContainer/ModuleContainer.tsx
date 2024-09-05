import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { ReactNode, Suspense } from 'react';
import { twMerge } from 'tailwind-merge';
import Loader from '@/components/commons/Loader/Loader';

type ModuleContainerProps = {
  children?: ReactNode;
  isFullWidth?: boolean;
  className?: string;
};

const ModuleContainer = ({ children, isFullWidth, className }: ModuleContainerProps) => {
  return (
    <div
      className={twMerge(
        'mb-5 first:mt-5 lg:mb-10 lg:first:mt-10',
        className,
        getBooleanProperty(isFullWidth) ? 'w-full' : 'container mx-auto px-2'
      )}
    >
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
};

export default ModuleContainer;
