import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformations';
import { translate } from '@/utilities/i18n';
import Image from 'next/image';

type SponsoredProps = {
  hide?: boolean;
  name?: string;
  width?: number;
  height?: number;
  className?: string;
  assetUrl?: string;
};

const Sponsored = ({ ...props }: SponsoredProps) => {
  const desktopSrc = getSrcWithTransformation(props.assetUrl, transformations.logos.desktop);

  return !props.hide && props.assetUrl ? (
    <>
      <div className=" col-start-10 row-start-10 uppercase mr-2 font-bold text-base bg-white border-2 p-1 py-1 px-4 rounded-full inline-flex items-center">
        <span className="text-s text-black uppercase">{translate('sponsored-by')}</span>
        <Image
          className={props.className}
          src={desktopSrc}
          alt={props.name ?? ''}
          width={props.width}
          height={props.height}
        />
      </div>
    </>
  ) : (
    <></>
  );
};

export default Sponsored;
