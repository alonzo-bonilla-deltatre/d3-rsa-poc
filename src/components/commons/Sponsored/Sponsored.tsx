import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformationsUtility';
import TranslateLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import Picture from '@/components/commons/Picture/Picture';

type SponsoredProps = {
  hide?: boolean;
  name?: string;
  width?: number;
  height?: number;
  className?: string;
  assetUrl?: string;
};

const Sponsored = ({ className, name, hide, width, height, assetUrl }: SponsoredProps) => {
  const desktopSrc = getSrcWithTransformation(assetUrl, transformations.best_assets.desktop.transformation);
  hide = getBooleanProperty(hide);

  if (hide || !desktopSrc) return null;

  return (
    <div className=" uppercase bg-transparent border-2 p-1 py-1 px-4 rounded-full inline-flex items-center">
      <span className="d3-ty-tag-small text-white uppercase">
        <TranslateLabel translationTermKey={'sponsored-by'} />
      </span>
      <Picture
        className={className}
        src={desktopSrc}
        alt={name ?? 'sponsor'}
        width={width}
        height={height}
      />
    </div>
  );
};

export default Sponsored;
