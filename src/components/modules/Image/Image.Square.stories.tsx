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
  render: (args) => (
    <>
      <ImageView {...squareExtraSmallLeft}></ImageView>
    </>
  ),
  args: {},
};

export const SquareSmallLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...squareSmallLeft}></ImageView>
    </>
  ),
};

export const SquareMediumLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...squareMediumLeft}></ImageView>
    </>
  ),
};

export const SquareLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...squareLargeLeft}></ImageView>
    </>
  ),
};

export const SquareExtraLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...squareExtraLargeLeft}></ImageView>
    </>
  ),
};

export const SquareExtraExtraLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...squareExtraExtraLargeLeft}></ImageView>
    </>
  ),
};

export const SquareExtraSmallCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...squareExtraSmallCenter}></ImageView>
    </>
  ),
};

export const SquareSmallCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...squareSmallCenter}></ImageView>
    </>
  ),
};

export const SquareMediumCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...squareMediumCenter}></ImageView>
    </>
  ),
};

export const SquareLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...squareLargeCenter}></ImageView>
    </>
  ),
};

export const SquareExtraLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...squareExtraLargeCenter}></ImageView>
    </>
  ),
};

export const SquareExtraExtraLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...squareExtraExtraLargeCenter}></ImageView>
    </>
  ),
};

export const SquareExtraSmallRight: Story = {
  render: (args) => (
    <>
      <ImageView {...squareExtraSmallRight}></ImageView>
    </>
  ),
};

export const SquareSmallRight: Story = {
  render: (args) => (
    <>
      <ImageView {...squareSmallRight}></ImageView>
    </>
  ),
};

export const SquareMediumRight: Story = {
  render: (args) => (
    <>
      <ImageView {...squareMediumRight}></ImageView>
    </>
  ),
  args: {},
};

export const SquareLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...squareLargeRight}></ImageView>
    </>
  ),
  args: {},
};

export const SquareExtraLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...squareExtraLargeRight}></ImageView>
    </>
  ),
  args: {},
};

export const SquareExtraExtraLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...squareExtraExtraLargeRight}></ImageView>
    </>
  ),
  args: {},
};
