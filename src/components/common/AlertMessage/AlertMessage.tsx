import TranslatedLabel from '@/components/common/TranslatedLabel/TranslatedLabel';
type AlertMessageProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

const AlertMessage = ({ title, subtitle, className }: AlertMessageProps) => {
  return (
    <div
      className={`bg-orange-100 border-l-4 rtl:border-r-4 rtl:border-l-0 border-orange-500 text-orange-700 p-4 ${
        className ?? ''
      }`}
      role="alert"
    >
      <p className="font-bold">
        <TranslatedLabel translationTermKey={title} />
      </p>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default AlertMessage;
