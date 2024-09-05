import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { renderSvgIcon } from '@/components/icons';

type ToastProps = {
  title: string;
  type: 'success' | 'error';
  className?: string;
};

const Toast = ({ title, className, type }: ToastProps) => {
  return (
    <div
      className={`mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 shadow ${className ?? ''}`}
      role="alert"
    >
      <div
        className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
          type === 'error' ? 'bg-red-100' : 'bg-green-100'
        }`}
      >
        {type === 'error' && renderSvgIcon('RemoveIcon')}
        {type === 'success' && renderSvgIcon('CheckIcon')}
      </div>
      <div className="ms-3">
        <TranslatedLabel translationTermKey={title}></TranslatedLabel>
      </div>
    </div>
  );
};

export default Toast;
