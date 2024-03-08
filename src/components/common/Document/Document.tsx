import { renderSvgIcon } from '@/components/icons';
import { getNumberProperty, getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { DistributionEntity } from '@/models/types/forge';

type DocumentProps = {
  documentEntity: DistributionEntity;
  className?: string;
  titleClassName?: string;
  iconSize?: number;
};

export const Document = ({ documentEntity, className, titleClassName, iconSize }: DocumentProps) => {
  if (!documentEntity?.file?.downloadUrl) {
    return null;
  }

  const documentUrl = documentEntity.file.downloadUrl.replace('/fl_attachment/', '/t_q_good/');
  const titleClass = getStringProperty(titleClassName);
  return (
    <a
      className={`flex w-full items-center justify-start rounded-lg min-w-0 ${className}`}
      href={documentUrl}
      aria-label={documentEntity.title}
      target="_blank"
      rel="noreferrer"
    >
      {renderSvgIcon('Pdf', {
        width: getNumberProperty(iconSize, 80),
        height: getNumberProperty(iconSize, 80),
        className: 'shrink-0',
      })}
      <div className={`uppercase ${titleClass ? titleClass : 'd3-ty-heading-6'} `}>{documentEntity.title}</div>
    </a>
  );
};
