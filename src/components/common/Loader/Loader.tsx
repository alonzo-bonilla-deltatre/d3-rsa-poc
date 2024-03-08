import TranslatedLabel from '@/components/common/TranslatedLabel/TranslatedLabel';
import { renderSvgIcon } from '@/components/icons';

type LoaderProps = {
  className?: string;
};

const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      role="status"
      className={`absolute translate-x-1/2 top-[5px] left-1/2 z-10 ${className ?? ''}`}
    >
      {renderSvgIcon('LoadingIcon', { className: 'w-8 h-8 mr-2 text-greyscale-pale animate-spin fill-grey-900' })}

      <span className="sr-only">
        <TranslatedLabel translationTermKey="common-loading" />
        ...
      </span>
    </div>
  );
};

export default Loader;
