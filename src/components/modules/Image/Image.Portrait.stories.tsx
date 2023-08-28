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
  render: (args) => (
    <>
      <ImageView {...portraitExtraSmallLeft}></ImageView>
    </>
  ),
  args: {},
};

export const PortraitSmallLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitSmallLeft}></ImageView>
    </>
  ),
};

export const PortraitMediumLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitMediumLeft}></ImageView>
    </>
  ),
};

export const PortraitLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitLargeLeft}></ImageView>
    </>
  ),
};

export const PortraitExtraLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitExtraLargeLeft}></ImageView>
    </>
  ),
};

export const PortraitExtraExtraLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitExtraExtraLargeLeft}></ImageView>
    </>
  ),
};

export const PortraitExtraSmallCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitExtraSmallCenter}></ImageView>
    </>
  ),
};

export const PortraitSmallCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitSmallCenter}></ImageView>
    </>
  ),
};

export const PortraitMediumCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitMediumCenter}></ImageView>
    </>
  ),
};

export const PortraitLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitLargeCenter}></ImageView>
    </>
  ),
};

export const PortraitExtraLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitExtraLargeCenter}></ImageView>
    </>
  ),
};

export const PortraitExtraExtraLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitExtraExtraLargeCenter}></ImageView>
    </>
  ),
};

export const PortraitExtraSmallRight: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitExtraSmallRight}></ImageView>
    </>
  ),
};

export const PortraitSmallRight: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitSmallRight}></ImageView>
    </>
  ),
};

export const PortraitMediumRight: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitMediumRight}></ImageView>
    </>
  ),
  args: {},
};

export const PortraitLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitLargeRight}></ImageView>
    </>
  ),
  args: {},
};

export const PortraitExtraLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitExtraLargeRight}></ImageView>
    </>
  ),
  args: {},
};

export const PortraitExtraExtraLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...portraitExtraExtraLargeRight}></ImageView>
    </>
  ),
  args: {},
};
