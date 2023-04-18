import type { Meta, StoryObj } from '@storybook/react';

import CallToAction from "@/components/common/CallToAction";

const meta: Meta<typeof CallToAction> = {
  title: 'UiComponents/CallToAction',
  component: CallToAction,
  tags: ['autodocs'],
  argTypes: {
    style: {
      options: ['default', 'reverse'],
      control: { type: 'radio' },
    },
    hide: {
      control: false,
    }
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

// export const All: Story = {
//   render:(args) => {
//     const { url, text, style } = args;
//     return <CallToAction {...args} />;
//   },
//   }
//   args: {
//     url: "#nolink",
//     text: 'Call to Action',
//     style: 'reverse'
//   },
//   parameters: {
//     layout: 'centered',
//   },
// };
