import React, { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

export type TypographyVariant =
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

const tags: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'caption-s': 'div',
  'caption-m': 'div',
  'caption-l': 'div',
  quote: 'blockquote',
  description: 'div',
  'body-xs': 'div',
  'body-s': 'div',
  'body-m': 'div',
  'body-l': 'div',
  'tag-m': 'div',
  'tag-l': 'div',
  'navigation-s': 'div',
  'navigation-m': 'div',
  'navigation-l': 'div',
  'navigation-xl': 'div',
  'cta-m': 'div',
  'cta-l': 'div',
  'story-description': 'div',
};

const sizes: Record<TypographyVariant, string> = {
  h1: 'font-heading text-[60px] leading-[60px] font-normal -tracking-[.12px] uppercase lg:text-[120px] lg:leading-[100px]',
  h2: 'font-heading text-[50px] leading-[40px] font-normal -tracking-[.12px] uppercase lg:text-[100px] lg:leading-[86px]',
  h3: 'font-heading text-[48px] leading-[40px] font-normal -tracking-[.12px] uppercase lg:text-[40px] lg:leading-[48px]',
  h4: 'font-heading text-[40px] leading-[36px] font-normal -tracking-[.12px] uppercase lg:text-[44px] lg:leading-[40px]',
  h5: 'font-heading text-[18px] leading-[20px] font-bold -tracking-[.12px] uppercase lg:text-[22px] lg:leading-[22px]',
  h6: 'font-heading text-[14px] leading-[20px] font-bold -tracking-[.12px] uppercase lg:text-[20px] lg:leading-[28px]',
  'caption-s': 'font-heading text-[16px] leading-[20px] font-normal uppercase lg:text-[20px] lg:leading-[24px]',
  'caption-m': 'font-heading text-[24px] leading-[30px] font-normal uppercase lg:text-[30px] lg:leading-[34px]',
  'caption-l': 'font-heading text-[34px] leading-[40px] font-normal uppercase lg:text-[40px] lg:leading-[44px]',
  quote: 'font-navigation text-[28px] leading-[32px] font-medium lg:text-[36px] lg:leading-[48px]',
  description: 'font-content text-[12px] leading-[14px] font-normal lg:text-[16px] lg:leading-[18px]',
  'body-xs': 'font-content text-[12px] leading-[14px] font-medium lg:text-[14px] lg:leading-[18px]',
  'body-s': 'font-content text-[14px] leading-[18px] font-medium lg:text-[16px] lg:leading-[22px]',
  'body-m': 'font-content text-[16px] leading-[20px] font-medium lg:text-[18px] lg:leading-[22px]',
  'body-l': 'font-content text-[18px] leading-[22px] font-bold lg:text-[22px] lg:leading-[28px]',
  'tag-m': 'font-navigation text-[12px] leading-[14px] font-semibold -tracking-[.12px] uppercase',
  'tag-l': 'font-navigation text-[12px] leading-[14px] font-bold uppercase lg:text-[14px] lg:leading-[16px]',
  'navigation-s': 'font-heading text-[20px] leading-[28px] font-normal tracking-[0.5px] uppercase',
  'navigation-m': 'font-heading text-[20px] leading-[34px] font-normal tracking-[0.5px] uppercase',
  'navigation-l': 'font-heading text-[20px] leading-[40px] font-normal tracking-[0.6px] uppercase',
  'navigation-xl': 'font-heading text-[24px] leading-[40px] font-normal tracking-[0.6px] uppercase lg:text-[28px]',
  'cta-m': 'font-navigation text-[20px] leading-[28px] font-semibold',
  'cta-l': 'font-navigation text-[22px] leading-[28px] font-semibold',
  'story-description': 'font-content text-[20px] leading-[32px] font-normal italic lg:text-[28px] lg:leading-[32px]',
};

export type TypographyProps = {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
};

const Typography = ({ variant, children, className, as }: TypographyProps) => {
  if (!variant || !children) return null;
  const sizeClasses = sizes[variant];
  const Tag = as || tags[variant];

  return <Tag className={twMerge(sizeClasses, className)}>{children}</Tag>;
};

export default Typography;
