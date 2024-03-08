import type { Meta, StoryObj } from '@storybook/react';
import Image from '@/components/modules/Image/Image';
import ImageView from '@/components/modules/Image/ImageView';
import {
  squareExtraExtraLargeCenter,
  squareExtraExtraLargeLeft,
  squareExtraExtraLargeRight,
  squareExtraLargeCenter,
  squareExtraLargeLeft,
  squareExtraLargeRight,
  squareExtraSmallCenter,
  squareExtraSmallLeft,
  squareExtraSmallRight,
  squareLargeCenter,
  squareLargeLeft,
  squareLargeRight,
  squareMediumCenter,
  squareMediumLeft,
  squareMediumRight,
  squareSmallCenter,
  squareSmallLeft,
  squareSmallRight,
} from '@/__mocks__/components/modules/Image/sampleSquareImageView';

const meta: Meta<typeof Image> = {
  title: 'Modules/Image/Square',
};

export default meta;
type Story = StoryObj<typeof Image>;

export const SquareExtraSmallLeft: Story = {
  render: () => <ImageView {...squareExtraSmallLeft}></ImageView>,
};

export const SquareSmallLeft: Story = {
  render: () => <ImageView {...squareSmallLeft}></ImageView>,
};

export const SquareMediumLeft: Story = {
  render: () => <ImageView {...squareMediumLeft}></ImageView>,
};

export const SquareLargeLeft: Story = {
  render: () => <ImageView {...squareLargeLeft}></ImageView>,
};

export const SquareExtraLargeLeft: Story = {
  render: () => <ImageView {...squareExtraLargeLeft}></ImageView>,
};

export const SquareExtraExtraLargeLeft: Story = {
  render: () => <ImageView {...squareExtraExtraLargeLeft}></ImageView>,
};

export const SquareExtraSmallCenter: Story = {
  render: () => <ImageView {...squareExtraSmallCenter}></ImageView>,
};

export const SquareSmallCenter: Story = {
  render: () => <ImageView {...squareSmallCenter}></ImageView>,
};

export const SquareMediumCenter: Story = {
  render: () => <ImageView {...squareMediumCenter}></ImageView>,
};

export const SquareLargeCenter: Story = {
  render: () => <ImageView {...squareLargeCenter}></ImageView>,
};

export const SquareExtraLargeCenter: Story = {
  render: () => <ImageView {...squareExtraLargeCenter}></ImageView>,
};

export const SquareExtraExtraLargeCenter: Story = {
  render: () => <ImageView {...squareExtraExtraLargeCenter}></ImageView>,
};

export const SquareExtraSmallRight: Story = {
  render: () => <ImageView {...squareExtraSmallRight}></ImageView>,
};

export const SquareSmallRight: Story = {
  render: () => <ImageView {...squareSmallRight}></ImageView>,
};

export const SquareMediumRight: Story = {
  render: () => <ImageView {...squareMediumRight}></ImageView>,
};

export const SquareLargeRight: Story = {
  render: () => <ImageView {...squareLargeRight}></ImageView>,
};

export const SquareExtraLargeRight: Story = {
  render: () => <ImageView {...squareExtraLargeRight}></ImageView>,
};

export const SquareExtraExtraLargeRight: Story = {
  render: () => <ImageView {...squareExtraExtraLargeRight}></ImageView>,
};
