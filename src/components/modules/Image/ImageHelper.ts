export const getLinkCssClass = (alignment?: string): string => {
  let result = 'flex flex-col items-';
  switch (alignment?.toLowerCase()) {
    case 'left':
      result += 'start';
      break;
    case 'center':
      result += 'center';
      break;
    case 'right':
      result += 'end';
      break;
    default:
      result += 'start';
      break;
  }
  return result;
};

export const getImageContainerCssClass = (alignment?: string): string => {
  let result = 'flex justify-';
  switch (alignment?.toLowerCase()) {
    case 'left':
      result += 'start';
      break;
    case 'center':
      result += 'center';
      break;
    case 'right':
      result += 'end';
      break;
    default:
      result += 'start';
      break;
  }
  return result;
};

export const containerCssSize: Record<string, string> = {
  square_extraSmall: 'max-w-[208px] max-h-[208px]',
  square_small: 'max-w-[416px] max-h-[416px]',
  square_medium: 'max-w-[624px] max-h-[624px]',
  square_large: 'max-w-[832px] max-h-[832px]',
  square_extraLarge: 'max-w-[1280px] max-h-[1280px]',
  square_extraExtraLarge: 'max-w-[1920px] max-h-[1920px]',
  portrait_extraSmall: 'max-w-[210px] max-h-[280px]',
  portrait_small: 'max-w-[420px] max-h-[560px]',
  portrait_medium: 'max-w-[624px] max-h-[832px]',
  portrait_large: 'max-w-[840px] max-h-[1120px]',
  portrait_extraLarge: 'max-w-[1260px] max-h-[1680px]',
  portrait_extraExtraLarge: 'max-w-[1920px] max-h-[2560px]',
  landscape_extraSmall: 'max-w-[280px] max-h-[117px]',
  landscape_small: 'max-w-[416px] max-h-[234px]',
  landscape_medium: 'max-w-[624px] max-h-[351px]',
  landscape_large: 'max-w-[832px] max-h-[468px]',
  landscape_extraLarge: 'max-w-[1280px] max-h-[720px]',
  landscape_extraExtraLarge: 'max-w-[1920px] max-h-[1080px]',
  hero_extraSmall: 'max-w-[210px] max-h-[90px]',
  hero_small: 'max-w-[420px] max-h-[180px]',
  hero_medium: 'max-w-[630px] max-h-[270px]',
  hero_large: 'max-w-[840px] max-h-[360px]',
  hero_extraLarge: 'max-w-[1281px] max-h-[549px]',
  hero_extraExtraLarge: 'max-w-[1932px] max-h-[828px]',
};
