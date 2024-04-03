import wideSkyscraper from './images/wide-skyscraper-160x600.webp';
import medRec from './images/med-rec-300x250.webp';
import leaderboard from './images/leaderboard-728x90.webp';
import billboard from './images/billboard-970x250.webp';
import superLeaderboard from './images/super-leaderboard-970x90.webp';
import hpu from './images/hpu-300x600.webp';
import Picture from '@/components/commons/Picture/Picture';

type AdvProps = {
  type: string;
};

type AdvImage = {
  width: number;
  height: number;
  url: string;
};

function getAdvImage(type?: string) {
  let image = {} as AdvImage;
  switch (type) {
    case 'wideSkyscraper':
      image.width = 160;
      image.height = 600;
      image.url = 'https://placehold.co/728x90';
      break;
    case 'medRec':
      image.width = 300;
      image.height = 250;
      image.url = medRec.src;
      break;
    case 'leaderboard':
      image.width = 728;
      image.height = 90;
      image.url = leaderboard.src;
      break;
    case 'billboard':
      image.width = 970;
      image.height = 250;
      image.url = billboard.src;
      break;
    case 'superLeaderboard':
      image.width = 970;
      image.height = 90;
      image.url = superLeaderboard.src;
      break;
    case 'hpu':
      image.width = 300;
      image.height = 600;
      image.url = hpu.src;
      break;
    default:
      image.width = 300;
      image.height = 250;
      image.url = medRec.src;
      break;
  }
  return image;
}

export const Adv = ({ type }: AdvProps) => {
  const adv = getAdvImage(type);
  if (!adv) return null;

  return (
    <div className={`flex items-center justify-center max-w-[${adv.width}px] max-h-[${adv.height}px]`}>
      <Picture
        width={adv.width}
        height={adv.height}
        alt={'adv'}
        src={adv.url}
        priority={false}
        imageStyle={{
          maxWidth: `${adv.width}px`,
          width: `100%`,
          height: `auto`,
        }}
        sizes={'100vw'}
      />
    </div>
  );
};

export default Adv;
