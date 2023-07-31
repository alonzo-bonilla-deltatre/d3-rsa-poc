import type { Meta, StoryObj } from '@storybook/react';

import Author from '@/components/common/Author/Author';

const meta: Meta<typeof Author> = {
  title: 'UiComponents/Author',
  component: Author,
  tags: ['autodocs'],
  argTypes: {
    hide: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Author>;

export const Default: Story = {
  args: {
    author: 'Mario Rossi',
    hide: false,
  },
  parameters: {
    layout: 'centered',
  },
};
