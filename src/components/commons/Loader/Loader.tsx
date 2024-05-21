import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { renderSvgIcon } from '@/components/icons';
import { twMerge } from 'tailwind-merge';

type LoaderProps = {
  className?: string;
};

const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      role="status"
      className={twMerge('absolute translate-x-1/2 top-[5px] left-1/2 z-10', className)}
    >
      {renderSvgIcon('LoadingIcon', { className: 'w-8 h-8 me-2 text-gray-100 animate-spin fill-gray-900' })}

      <span className="sr-only">
        <TranslatedLabel translationTermKey="common-loading" />
        ...
      </span>
    </div>
  );
};

export default Loader;
