import type { Meta, StoryObj } from '@storybook/react';
import Image from '@/components/modules/Image/Image';
import ImageView from '@/components/modules/Image/ImageView';
import {
  originalExtraExtraLargeCenter,
  originalExtraExtraLargeLeft,
  originalExtraExtraLargeRight,
  originalExtraLargeCenter,
  originalExtraLargeLeft,
  originalExtraLargeRight,
  originalExtraSmallCenter,
  originalExtraSmallLeft,
  originalExtraSmallRight,
  originalLargeCenter,
  originalLargeLeft,
  originalLargeRight,
  originalMediumCenter,
  originalMediumLeft,
  originalMediumRight,
  originalSmallCenter,
  originalSmallLeft,
  originalSmallRight,
} from '@/__mocks__/components/modules/Image/sampleOriginalImageView';

const meta: Meta<typeof Image> = {
  title: 'Modules/Image/Original',
};

export default meta;
type Story = StoryObj<typeof Image>;

export const OriginalExtraSmallLeft: Story = {
  render: () => <ImageView {...originalExtraSmallLeft}></ImageView>,
};

export const OriginalSmallLeft: Story = {
  render: () => <ImageView {...originalSmallLeft}></ImageView>,
};

export const OriginalMediumLeft: Story = {
  render: () => <ImageView {...originalMediumLeft}></ImageView>,
};

export const OriginalLargeLeft: Story = {
  render: () => <ImageView {...originalLargeLeft}></ImageView>,
};

export const OriginalExtraLargeLeft: Story = {
  render: () => <ImageView {...originalExtraLargeLeft}></ImageView>,
};

export const OriginalExtraExtraLargeLeft: Story = {
  render: () => <ImageView {...originalExtraExtraLargeLeft}></ImageView>,
};

export const OriginalExtraSmallCenter: Story = {
  render: () => <ImageView {...originalExtraSmallCenter}></ImageView>,
};

export const OriginalSmallCenter: Story = {
  render: () => <ImageView {...originalSmallCenter}></ImageView>,
};

export const OriginalMediumCenter: Story = {
  render: () => <ImageView {...originalMediumCenter}></ImageView>,
};

export const OriginalLargeCenter: Story = {
  render: () => <ImageView {...originalLargeCenter}></ImageView>,
};

export const OriginalExtraLargeCenter: Story = {
  render: () => <ImageView {...originalExtraLargeCenter}></ImageView>,
};

export const OriginalExtraExtraLargeCenter: Story = {
  render: () => <ImageView {...originalExtraExtraLargeCenter}></ImageView>,
};

export const OriginalExtraSmallRight: Story = {
  render: () => <ImageView {...originalExtraSmallRight}></ImageView>,
};

export const OriginalSmallRight: Story = {
  render: () => <ImageView {...originalSmallRight}></ImageView>,
};

export const OriginalMediumRight: Story = {
  render: () => <ImageView {...originalMediumRight}></ImageView>,
};

export const OriginalLargeRight: Story = {
  render: () => <ImageView {...originalLargeRight}></ImageView>,
};

export const OriginalExtraLargeRight: Story = {
  render: () => <ImageView {...originalExtraLargeRight}></ImageView>,
};

export const OriginalExtraExtraLargeRight: Story = {
  render: () => <ImageView {...originalExtraExtraLargeRight}></ImageView>,
};
