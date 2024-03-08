import { getTagClasses, getTagTextClasses } from '@/components/common/Tag/TagHelpers';
import { TagType } from '@/models/types/components/common/tag';
import TranslatedLabel from '@/components/common/TranslatedLabel/TranslatedLabel';

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
