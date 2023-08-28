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
  render: (args) => (
    <>
      <ImageView {...heroExtraSmallLeft}></ImageView>
    </>
  ),
  args: {},
};

export const HeroSmallLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...heroSmallLeft}></ImageView>
    </>
  ),
};

export const HeroMediumLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...heroMediumLeft}></ImageView>
    </>
  ),
};

export const HeroLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...heroLargeLeft}></ImageView>
    </>
  ),
};

export const HeroExtraLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...heroExtraLargeLeft}></ImageView>
    </>
  ),
};

export const HeroExtraExtraLargeLeft: Story = {
  render: (args) => (
    <>
      <ImageView {...heroExtraExtraLargeLeft}></ImageView>
    </>
  ),
};

export const HeroExtraSmallCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...heroExtraSmallCenter}></ImageView>
    </>
  ),
};

export const HeroSmallCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...heroSmallCenter}></ImageView>
    </>
  ),
};

export const HeroMediumCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...heroMediumCenter}></ImageView>
    </>
  ),
};

export const HeroLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...heroLargeCenter}></ImageView>
    </>
  ),
};

export const HeroExtraLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...heroExtraLargeCenter}></ImageView>
    </>
  ),
};

export const HeroExtraExtraLargeCenter: Story = {
  render: (args) => (
    <>
      <ImageView {...heroExtraExtraLargeCenter}></ImageView>
    </>
  ),
};

export const HeroExtraSmallRight: Story = {
  render: (args) => (
    <>
      <ImageView {...heroExtraSmallRight}></ImageView>
    </>
  ),
};

export const HeroSmallRight: Story = {
  render: (args) => (
    <>
      <ImageView {...heroSmallRight}></ImageView>
    </>
  ),
};

export const HeroMediumRight: Story = {
  render: (args) => (
    <>
      <ImageView {...heroMediumRight}></ImageView>
    </>
  ),
  args: {},
};

export const HeroLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...heroLargeRight}></ImageView>
    </>
  ),
  args: {},
};

export const HeroExtraLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...heroExtraLargeRight}></ImageView>
    </>
  ),
  args: {},
};

export const HeroExtraExtraLargeRight: Story = {
  render: (args) => (
    <>
      <ImageView {...heroExtraExtraLargeRight}></ImageView>
    </>
  ),
  args: {},
};
