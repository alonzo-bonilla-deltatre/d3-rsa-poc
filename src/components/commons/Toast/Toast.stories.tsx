import type { Meta, StoryObj } from '@storybook/react';

import Toast from '@/components/commons/Toast/Toast';

const meta: Meta<typeof Toast> = {
  title: 'UiComponents/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const All: Story = {
  args: {
    title: 'title',
    type: 'success',
  },
  render: (args) => {
    return <Toast {...args} />;
  },
  parameters: {
    layout: 'centered',
  },
};
