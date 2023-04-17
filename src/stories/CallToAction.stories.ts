import type { Meta, StoryObj } from '@storybook/react';

import CallToAction from "@/components/common/CallToAction";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CallToAction> = {
  title: 'CallToAction',
  component: CallToAction,
   tags: ['autodocs'],
   argTypes: {
     style: {
      options: ['default', 'reverse'],
      control: { type: 'radio' },
    },
   },
};

export default meta;
type Story = StoryObj<typeof CallToAction>;

export const Default: Story = {
    args: {
      url: "#nolink",
      text: 'Call to Action',
      style: 'default'
    },
    parameters: {
      layout: 'centered',
    },
  };
  export const Reverse: Story = {
    args: {
      url: "#nolink",
      text: 'Call to Action',
      style: 'reverse'
    },
    parameters: {
      layout: 'centered',
    },
  };

