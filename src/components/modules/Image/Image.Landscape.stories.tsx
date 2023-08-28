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
  render: (args) => (
    <>
      <ImageView {...landscapeExtraSmallLeft}></ImageView>
    </>
  ),
  args: {},
};

export const LandscapeSmallLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeSmallLeft}></ImageView>
    </>
  ),
};

export const LandscapeMediumLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeMediumLeft}></ImageView>
    </>
  ),
};

export const LandscapeLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeLargeLeft}></ImageView>
    </>
  ),
};

export const LandscapeExtraLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeExtraLargeLeft}></ImageView>
    </>
  ),
};

export const LandscapeExtraExtraLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeExtraExtraLargeLeft}></ImageView>
    </>
  ),
};

export const LandscapeExtraSmallCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeExtraSmallCenter}></ImageView>
    </>
  ),
};

export const LandscapeSmallCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeSmallCenter}></ImageView>
    </>
  ),
};

export const LandscapeMediumCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeMediumCenter}></ImageView>
    </>
  ),
};

export const LandscapeLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeLargeCenter}></ImageView>
    </>
  ),
};

export const LandscapeExtraLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeExtraLargeCenter}></ImageView>
    </>
  ),
};

export const LandscapeExtraExtraLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeExtraExtraLargeCenter}></ImageView>
    </>
  ),
};

export const LandscapeExtraSmallRight: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeExtraSmallRight}></ImageView>
    </>
  ),
};

export const LandscapeSmallRight: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeSmallRight}></ImageView>
    </>
  ),
};

export const LandscapeMediumRight: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeMediumRight}></ImageView>
    </>
  ),
  args: {},
};

export const LandscapeLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeLargeRight}></ImageView>
    </>
  ),
  args: {},
};

export const LandscapeExtraLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeExtraLargeRight}></ImageView>
    </>
  ),
  args: {},
};

export const LandscapeExtraExtraLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...landscapeExtraExtraLargeRight}></ImageView>
    </>
  ),
  args: {},
};
