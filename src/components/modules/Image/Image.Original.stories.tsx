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
  render: (args) => (
    <>
      <ImageView {...originalExtraSmallLeft}></ImageView>
    </>
  ),
  args: {},
};

export const OriginalSmallLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...originalSmallLeft}></ImageView>
    </>
  ),
};

export const OriginalMediumLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...originalMediumLeft}></ImageView>
    </>
  ),
};

export const OriginalLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...originalLargeLeft}></ImageView>
    </>
  ),
};

export const OriginalExtraLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...originalExtraLargeLeft}></ImageView>
    </>
  ),
};

export const OriginalExtraExtraLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...originalExtraExtraLargeLeft}></ImageView>
    </>
  ),
};

export const OriginalExtraSmallCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...originalExtraSmallCenter}></ImageView>
    </>
  ),
};

export const OriginalSmallCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...originalSmallCenter}></ImageView>
    </>
  ),
};

export const OriginalMediumCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...originalMediumCenter}></ImageView>
    </>
  ),
};

export const OriginalLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...originalLargeCenter}></ImageView>
    </>
  ),
};

export const OriginalExtraLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...originalExtraLargeCenter}></ImageView>
    </>
  ),
};

export const OriginalExtraExtraLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...originalExtraExtraLargeCenter}></ImageView>
    </>
  ),
};

export const OriginalExtraSmallRight: Story = {
  render: (args) => (
    <>
      <ImageView {...originalExtraSmallRight}></ImageView>
    </>
  ),
};

export const OriginalSmallRight: Story = {
  render: (args) => (
    <>
      <ImageView {...originalSmallRight}></ImageView>
    </>
  ),
};

export const OriginalMediumRight: Story = {
  render: (args) => (
    <>
      <ImageView {...originalMediumRight}></ImageView>
    </>
  ),
  args: {},
};

export const OriginalLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...originalLargeRight}></ImageView>
    </>
  ),
  args: {},
};

export const OriginalExtraLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...originalExtraLargeRight}></ImageView>
    </>
  ),
  args: {},
};

export const OriginalExtraExtraLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...originalExtraExtraLargeRight}></ImageView>
    </>
  ),
  args: {},
};
