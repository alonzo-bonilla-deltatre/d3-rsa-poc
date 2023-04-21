import type { Meta, StoryObj } from '@storybook/react';

import Roofline from "@/components/common/Roofline";
import { sampleContext } from '@/__mocks__/entities/story';

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
    className: 'uppercase mr-2 font-bold text-base bg-[#EE3123] p-2 w-fit',
  }
};
