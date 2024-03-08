import Image from 'next/image';
import { CSSProperties } from 'react';
import wideSkyscraper from './images/wideSkyscraper.webp';
import medRec from './images/medRec.jpg';
import leaderboard from './images/leaderboard.jpg';
import billboard from './images/billboard.webp';
import superLeaderboard from './images/superLeaderboard.jpg';
import hpu from './images/hpu.webp';

type AdvProps = {
  type: string;
  containerClassName?: string;
  className?: string;
  imgStyle?: CSSProperties;
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
      image.url = wideSkyscraper.src;
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

export const Adv = ({ type, containerClassName, className, imgStyle }: AdvProps) => {
  const adv = getAdvImage(type);
  if (!adv) return null;

  return (
    <div className={`flex items-center justify-center ${containerClassName}`}>
      <Image
        width={adv.width}
        height={adv.height}
        alt={'adv'}
        className={`max-w-none ${className ?? ''}`}
        src={adv.url}
        style={imgStyle}
        loading={'lazy'}
        sizes={'100vw'}
      />
    </div>
  );
};

export default Adv;
