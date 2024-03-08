import type { Meta, StoryObj } from '@storybook/react';
import Image from '@/components/modules/Image/Image';
import ImageView from '@/components/modules/Image/ImageView';
import {
  portraitExtraExtraLargeCenter,
  portraitExtraExtraLargeLeft,
  portraitExtraExtraLargeRight,
  portraitExtraLargeCenter,
  portraitExtraLargeLeft,
  portraitExtraLargeRight,
  portraitExtraSmallCenter,
  portraitExtraSmallLeft,
  portraitExtraSmallRight,
  portraitLargeCenter,
  portraitLargeLeft,
  portraitLargeRight,
  portraitMediumCenter,
  portraitMediumLeft,
  portraitMediumRight,
  portraitSmallCenter,
  portraitSmallLeft,
  portraitSmallRight,
} from '@/__mocks__/components/modules/Image/samplePortraitImageView';

const meta: Meta<typeof Image> = {
  title: 'Modules/Image/Portrait',
};

export default meta;
type Story = StoryObj<typeof Image>;

export const PortraitExtraSmallLeft: Story = {
  render: () => <ImageView {...portraitExtraSmallLeft}></ImageView>,
};

export const PortraitSmallLeft: Story = {
  render: () => <ImageView {...portraitSmallLeft}></ImageView>,
};

export const PortraitMediumLeft: Story = {
  render: () => <ImageView {...portraitMediumLeft}></ImageView>,
};

export const PortraitLargeLeft: Story = {
  render: () => <ImageView {...portraitLargeLeft}></ImageView>,
};

export const PortraitExtraLargeLeft: Story = {
  render: () => <ImageView {...portraitExtraLargeLeft}></ImageView>,
};

export const PortraitExtraExtraLargeLeft: Story = {
  render: () => <ImageView {...portraitExtraExtraLargeLeft}></ImageView>,
};

export const PortraitExtraSmallCenter: Story = {
  render: () => <ImageView {...portraitExtraSmallCenter}></ImageView>,
};

export const PortraitSmallCenter: Story = {
  render: () => <ImageView {...portraitSmallCenter}></ImageView>,
};

export const PortraitMediumCenter: Story = {
  render: () => <ImageView {...portraitMediumCenter}></ImageView>,
};

export const PortraitLargeCenter: Story = {
  render: () => <ImageView {...portraitLargeCenter}></ImageView>,
};

export const PortraitExtraLargeCenter: Story = {
  render: () => <ImageView {...portraitExtraLargeCenter}></ImageView>,
};

export const PortraitExtraExtraLargeCenter: Story = {
  render: () => <ImageView {...portraitExtraExtraLargeCenter}></ImageView>,
};

export const PortraitExtraSmallRight: Story = {
  render: () => <ImageView {...portraitExtraSmallRight}></ImageView>,
};

export const PortraitSmallRight: Story = {
  render: () => <ImageView {...portraitSmallRight}></ImageView>,
};

export const PortraitMediumRight: Story = {
  render: () => <ImageView {...portraitMediumRight}></ImageView>,
};

export const PortraitLargeRight: Story = {
  render: () => <ImageView {...portraitLargeRight}></ImageView>,
};

export const PortraitExtraLargeRight: Story = {
  render: () => <ImageView {...portraitExtraLargeRight}></ImageView>,
};

export const PortraitExtraExtraLargeRight: Story = {
  render: () => <ImageView {...portraitExtraExtraLargeRight}></ImageView>,
};
