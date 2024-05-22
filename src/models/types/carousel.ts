export type CarouselProps = {
  hideNavigation?: boolean;
  hidePagination?: boolean;
  navButtonSize?: NavButtonSize;
};

export enum NavButtonSize {
  Small = 'small',
  Large = 'large',
}
