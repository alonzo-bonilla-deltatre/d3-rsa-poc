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
      className={`flex items-center w-full max-w-xs p-4 mb-4  bg-white rounded-lg shadow ${className ?? ''}`}
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${
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
