import TranslatedLabel from '@/components/common/TranslatedLabel/TranslatedLabel';

type ElementsCountProps = {
  elementsCount?: number;
  type?: string;
  hide?: boolean;
  className?: string;
};

const ElementsCount = ({ elementsCount, type, hide, className }: ElementsCountProps) => {
  if (hide || !elementsCount) {
    return null;
  }
  return (
    <div className={`ty-tag-large ${className ?? ''}`}>
      <span>
        {elementsCount + ' '}
        <TranslatedLabel translationTermKey={type ?? ''} />
      </span>
    </div>
  );
};
export default ElementsCount;
