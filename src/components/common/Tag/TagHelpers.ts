import { TagType } from '@/models/types/components/common/tag';

export const getTagClasses = (style?: TagType) => {
  const tagClassName = 'd3-ty-tag-large uppercase inline-flex mr-4 last:mr-0';
  switch (style) {
    case TagType.PrimaryFilled:
      return `${tagClassName} text-white bg-accent p-2 -skew-x-12`;
    case TagType.OutlineBig:
      return `${tagClassName} text-greyscale-grey p-4 -skew-x-12 border-primary-border-light border`;
    case TagType.Outline:
      return `${tagClassName} text-greyscale-grey p-2 -skew-x-12 border-primary-border-light border`;
    case TagType.Primary:
      return `${tagClassName} text-accent p-2`;
    case TagType.Secondary:
      return `${tagClassName} text-greyscale-pale p-2`;
    case TagType.Format:
      return `${tagClassName} text-gold p-2`;
    case TagType.Date:
      return `${tagClassName} text-grey-900 p-2`;
    case TagType.Location:
      return `${tagClassName} text-black p-2`;
    default:
      return `${tagClassName} text-white bg-accent p-2 -skew-x-12`;
  }
};

export const getTagTextClasses = (style?: TagType) => {
  switch (style) {
    case TagType.PrimaryFilled:
    case TagType.OutlineBig:
    case TagType.Outline:
      return `skew-x-12`;
    case TagType.Primary:
    case TagType.Secondary:
    case TagType.Format:
    case TagType.Date:
    case TagType.Location:
      return ``;
    default:
      return `skew-x-12`;
  }
};
