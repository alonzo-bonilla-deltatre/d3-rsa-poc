import type { Meta, StoryObj } from '@storybook/react';

import AlertMessage from '@/components/commons/AlertMessage/AlertMessage';

const meta: Meta<typeof AlertMessage> = {
  title: 'UiComponents/AlertMessage',
  component: AlertMessage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AlertMessage>;

export const Default: Story = {
  render: (args) => <AlertMessage {...args} />,
  args: {
    title: 'Error',
    subtitle: 'An error occured',
  },
};
