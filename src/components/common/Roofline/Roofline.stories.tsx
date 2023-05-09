import type { Meta, StoryObj } from '@storybook/react';
import ArrowRight from '@/components/icons/ArrowRight';
import Roofline from '@/components/common/Roofline';
import { sampleContext } from '@/__mocks__/entities/story';
import { sampleAssetSquared } from '@/__mocks__/components/sampleGadAsset';

const meta: Meta<typeof Roofline> = {
  title: 'UiComponents/Roofline',
  component: Roofline,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Roofline>;

export const Default: Story = {
  args: {
    context: sampleContext,
    hide: false,
    className: 'uppercase mr-2 font-bold text-base bg-[#EE3123] p-1 w-fit px-4 rounded',
  },
};

export const WithIcon: Story = {
  args: {
    context: sampleContext,
    hide: false,
    className: 'uppercase mr-2 font-bold text-base bg-[#EE3123] p-1 py-1 px-4 rounded inline-flex items-center',
    icon: ArrowRight,
  },
};

export const WithAsset: Story = {
  args: {
    context: sampleContext,
    hide: false,
    className: 'uppercase mr-2 font-bold text-base bg-[#EE3123] p-1 py-1 px-4 rounded inline-flex items-center',
    asset: sampleAssetSquared,
  },
};
