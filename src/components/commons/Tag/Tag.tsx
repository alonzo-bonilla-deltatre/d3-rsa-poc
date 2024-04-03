import { getTagClasses, getTagTextClasses } from '@/components/commons/Tag/TagHelpers';
import { TagType } from '@/models/types/components/commons/tag';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';

type TagProps = {
  text: string;
  style?: TagType;
  className?: string;
};

const Tag = ({ className, style, text }: TagProps) => {
  return (
    <div className={`${getTagClasses(style)} ${className ?? ''}`}>
      <span className={`${getTagTextClasses(style)}`}>
        <TranslatedLabel translationTermKey={text} />
      </span>
    </div>
  );
};

export default Tag;
