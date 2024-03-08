import type { Meta, StoryObj } from '@storybook/react';

import Accordion from '@/components/common/Accordion/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'UiComponents/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => <Accordion {...args} />,
  args: {
    className: '',
    expandFirstElement: true,
    elements: [
      { id: '1', header: 'Title Accordion 1', body: 'Lorem ipsum dolor sit amet 1' },
      { id: '2', header: 'Title Accordion 2', body: 'Lorem ipsum dolor sit amet 2' },
    ],
  },
};
