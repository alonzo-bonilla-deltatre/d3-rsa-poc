import type { Meta, StoryObj } from '@storybook/react';
import Image from '@/components/modules/Image/Image';
import ImageView from '@/components/modules/Image/ImageView';
import {
  heroExtraExtraLargeCenter,
  heroExtraExtraLargeLeft,
  heroExtraExtraLargeRight,
  heroExtraLargeCenter,
  heroExtraLargeLeft,
  heroExtraLargeRight,
  heroExtraSmallCenter,
  heroExtraSmallLeft,
  heroExtraSmallRight,
  heroLargeCenter,
  heroLargeLeft,
  heroLargeRight,
  heroMediumCenter,
  heroMediumLeft,
  heroMediumRight,
  heroSmallCenter,
  heroSmallLeft,
  heroSmallRight,
} from '@/__mocks__/components/modules/Image/sampleHeroImageView';

const meta: Meta<typeof Image> = {
  title: 'Modules/Image/Hero',
};

export default meta;
type Story = StoryObj<typeof Image>;

export const HeroExtraSmallLeft: Story = {
  render: () => <ImageView {...heroExtraSmallLeft}></ImageView>,
};

export const HeroSmallLeft: Story = {
  render: () => <ImageView {...heroSmallLeft}></ImageView>,
};

export const HeroMediumLeft: Story = {
  render: () => <ImageView {...heroMediumLeft}></ImageView>,
};

export const HeroLargeLeft: Story = {
  render: () => <ImageView {...heroLargeLeft}></ImageView>,
};

export const HeroExtraLargeLeft: Story = {
  render: () => <ImageView {...heroExtraLargeLeft}></ImageView>,
};

export const HeroExtraExtraLargeLeft: Story = {
  render: () => <ImageView {...heroExtraExtraLargeLeft}></ImageView>,
};

export const HeroExtraSmallCenter: Story = {
  render: () => <ImageView {...heroExtraSmallCenter}></ImageView>,
};

export const HeroSmallCenter: Story = {
  render: () => <ImageView {...heroSmallCenter}></ImageView>,
};

export const HeroMediumCenter: Story = {
  render: () => <ImageView {...heroMediumCenter}></ImageView>,
};

export const HeroLargeCenter: Story = {
  render: () => <ImageView {...heroLargeCenter}></ImageView>,
};

export const HeroExtraLargeCenter: Story = {
  render: () => <ImageView {...heroExtraLargeCenter}></ImageView>,
};

export const HeroExtraExtraLargeCenter: Story = {
  render: () => <ImageView {...heroExtraExtraLargeCenter}></ImageView>,
};

export const HeroExtraSmallRight: Story = {
  render: () => <ImageView {...heroExtraSmallRight}></ImageView>,
};

export const HeroSmallRight: Story = {
  render: () => <ImageView {...heroSmallRight}></ImageView>,
};

export const HeroMediumRight: Story = {
  render: () => <ImageView {...heroMediumRight}></ImageView>,
};

export const HeroLargeRight: Story = {
  render: () => <ImageView {...heroLargeRight}></ImageView>,
};

export const HeroExtraLargeRight: Story = {
  render: () => <ImageView {...heroExtraLargeRight}></ImageView>,
};

export const HeroExtraExtraLargeRight: Story = {
  render: () => <ImageView {...heroExtraExtraLargeRight}></ImageView>,
};
