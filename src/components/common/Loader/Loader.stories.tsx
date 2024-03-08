import type { Meta, StoryObj } from '@storybook/react';

import Loader from '@/components/common/Loader/Loader';

const meta: Meta<typeof Loader> = {
  title: 'UiComponents/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const All: Story = {
  args: {},
  render: (args) => {
    return <Loader {...args} />;
  },
  parameters: {
    layout: 'centered',
  },
};
