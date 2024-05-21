import React, { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'caption-s'
  | 'caption-m'
  | 'caption-l'
  | 'quote'
  | 'description'
  | 'body-xs'
  | 'body-s'
  | 'body-m'
  | 'body-l'
  | 'tag-m'
  | 'tag-l'
  | 'navigation-s'
  | 'navigation-m'
  | 'navigation-l'
  | 'navigation-xl'
  | 'cta-m'
  | 'cta-l'
  | 'story-description';

const tags: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'caption-s': 'p',
  'caption-m': 'p',
  'caption-l': 'p',
  quote: 'blockquote',
  description: 'p',
  'body-xs': 'p',
  'body-s': 'p',
  'body-m': 'p',
  'body-l': 'p',
  'tag-m': 'p',
  'tag-l': 'p',
  'navigation-s': 'p',
  'navigation-m': 'p',
  'navigation-l': 'p',
  'navigation-xl': 'p',
  'cta-m': 'p',
  'cta-l': 'p',
  'story-description': 'p',
};

const sizes: Record<Variant, string> = {
  h1: 'font-heading text-[60px] leading-[60px] font-normal -tracking-[1.2px] uppercase lg:text-[120px] lg:leading-[100px]',
  h2: 'font-heading text-[50px] leading-[40px] font-normal uppercase lg:text-[100px] lg:leading-[86px]',
  h3: 'font-heading text-[48px] leading-[40px] font-normal uppercase lg:text-[40px] lg:leading-[48px]',
  h4: 'font-heading text-[40px] leading-[36px] font-normal uppercase lg:text-[44px] lg:leading-[40px]',
  h5: 'font-heading text-[18px] leading-[18px] font-bold uppercase lg:text-[22px] lg:leading-[22px]',
  h6: 'font-heading text-[14px] leading-[20px] font-bold uppercase lg:text-[20px] lg:leading-[28px]',
  'caption-s': 'font-heading text-[16px] leading-[20px] font-normal uppercase lg:text-[20px] lg:leading-[24px]',
  'caption-m': 'font-heading text-[24px] leading-[30px] font-normal uppercase lg:text-[30px] lg:leading-[34px]',
  'caption-l': 'font-heading text-[34px] leading-[40px] font-normal uppercase lg:text-[40px] lg:leading-[44px]',
  quote: 'font-navigation text-[28px] leading-[32px] font-medium lg:text-[36px] lg:leading-[48px]',
  description: 'font-content text-[12px] leading-[14px] font-normal lg:text-[16px] lg:leading-[18px]',
  'body-xs': 'font-content text-[12px] leading-[14px] font-medium lg:text-[14px] lg:leading-[18px]',
  'body-s': 'font-content text-[14px] leading-[18px] font-medium lg:text-[16px] lg:leading-[22px]',
  'body-m': 'font-content text-[16px] leading-[20px] font-medium lg:text-[18px] lg:leading-[22px]',
  'body-l': 'font-content text-[18px] leading-[22px] font-bold lg:text-[22px] lg:leading-[28px]',
  'tag-m': 'font-navigation text-[12px] leading-[14px] font-semibold -tracking-[1.2px] uppercase',
  'tag-l': 'font-navigation text-[12px] leading-[14px] font-bold uppercase lg:text-[14px] lg:leading-[16px]',
  'navigation-s': 'font-heading text-[20px] leading-[28px] font-normal tracking-[0.5px] uppercase',
  'navigation-m': 'font-heading text-[20px] leading-[34px] font-normal tracking-[0.5px] uppercase',
  'navigation-l': 'font-heading text-[20px] leading-[40px] font-normal tracking-[0.6px] uppercase',
  'navigation-xl': 'font-heading text-[24px] leading-[40px] font-normal tracking-[0.6px] uppercase lg:text-[28px]',
  'cta-m': 'font-navigation text-[20px] leading-[28px] font-semibold',
  'cta-l': 'font-navigation text-[22px] leading-[28px] font-semibold',
  'story-description': 'font-content text-[20px] leading-[32px] font-normal italic lg:text-[28px] lg:leading-[32px]',
};

type TypographyProps = {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
};

const Typography = ({ variant, children, className, as }: TypographyProps) => {
  const sizeClasses = sizes[variant];
  const Tag = as || tags[variant];

  return <Tag className={twMerge(sizeClasses, className)}>{children}</Tag>;
};

export default Typography;
