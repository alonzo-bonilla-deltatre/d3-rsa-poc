import type { Meta, StoryObj } from '@storybook/react';
import Image from '@/components/modules/Image/Image';
import ImageView from '@/components/modules/Image/ImageView';
import {
  landscapeExtraExtraLargeCenter,
  landscapeExtraExtraLargeLeft,
  landscapeExtraExtraLargeRight,
  landscapeExtraLargeCenter,
  landscapeExtraLargeLeft,
  landscapeExtraLargeRight,
  landscapeExtraSmallCenter,
  landscapeExtraSmallLeft,
  landscapeExtraSmallRight,
  landscapeLargeCenter,
  landscapeLargeLeft,
  landscapeLargeRight,
  landscapeMediumCenter,
  landscapeMediumLeft,
  landscapeMediumRight,
  landscapeSmallCenter,
  landscapeSmallLeft,
  landscapeSmallRight,
} from '@/__mocks__/components/modules/Image/sampleLandscapeImageView';

const meta: Meta<typeof Image> = {
  title: 'Modules/Image/Landscape',
};

export default meta;
type Story = StoryObj<typeof Image>;

export const LandscapeExtraSmallLeft: Story = {
  render: () => <ImageView {...landscapeExtraSmallLeft}></ImageView>,
};

export const LandscapeSmallLeft: Story = {
  render: () => <ImageView {...landscapeSmallLeft}></ImageView>,
};

export const LandscapeMediumLeft: Story = {
  render: () => <ImageView {...landscapeMediumLeft}></ImageView>,
};

export const LandscapeLargeLeft: Story = {
  render: () => <ImageView {...landscapeLargeLeft}></ImageView>,
};

export const LandscapeExtraLargeLeft: Story = {
  render: () => <ImageView {...landscapeExtraLargeLeft}></ImageView>,
};

export const LandscapeExtraExtraLargeLeft: Story = {
  render: () => <ImageView {...landscapeExtraExtraLargeLeft}></ImageView>,
};

export const LandscapeExtraSmallCenter: Story = {
  render: () => <ImageView {...landscapeExtraSmallCenter}></ImageView>,
};

export const LandscapeSmallCenter: Story = {
  render: () => <ImageView {...landscapeSmallCenter}></ImageView>,
};

export const LandscapeMediumCenter: Story = {
  render: () => <ImageView {...landscapeMediumCenter}></ImageView>,
};

export const LandscapeLargeCenter: Story = {
  render: () => <ImageView {...landscapeLargeCenter}></ImageView>,
};

export const LandscapeExtraLargeCenter: Story = {
  render: () => <ImageView {...landscapeExtraLargeCenter}></ImageView>,
};

export const LandscapeExtraExtraLargeCenter: Story = {
  render: () => <ImageView {...landscapeExtraExtraLargeCenter}></ImageView>,
};

export const LandscapeExtraSmallRight: Story = {
  render: () => <ImageView {...landscapeExtraSmallRight}></ImageView>,
};

export const LandscapeSmallRight: Story = {
  render: () => <ImageView {...landscapeSmallRight}></ImageView>,
};

export const LandscapeMediumRight: Story = {
  render: () => <ImageView {...landscapeMediumRight}></ImageView>,
};

export const LandscapeLargeRight: Story = {
  render: () => <ImageView {...landscapeLargeRight}></ImageView>,
};

export const LandscapeExtraLargeRight: Story = {
  render: () => <ImageView {...landscapeExtraLargeRight}></ImageView>,
};

export const LandscapeExtraExtraLargeRight: Story = {
  render: () => <ImageView {...landscapeExtraExtraLargeRight}></ImageView>,
};
