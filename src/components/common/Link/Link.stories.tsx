import type { Meta, StoryObj } from '@storybook/react';

import Link from '@/components/common/Link/Link';

const meta: Meta<typeof Link> = {
  title: 'UiComponents/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Link>;

export const All: Story = {
  args: {
    href: 'localhost:3000/news',
    baseUrl: 'localhost:3000',
  },
  render: (args) => {
    return <Link {...args}>Click here</Link>;
  },
  parameters: {
    layout: 'centered',
  },
};
