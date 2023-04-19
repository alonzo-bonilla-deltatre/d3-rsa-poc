import type { Meta, StoryObj } from '@storybook/react';

import ModuleTitle from "@/components/common/ModuleTitle";

const meta: Meta<typeof ModuleTitle> = {
  title: 'UiComponents/ModuleTitle',
  component: ModuleTitle,
  tags: ['autodocs'],
  argTypes: {
    heading: {
      options: ['h2', 'h3', 'h4'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ModuleTitle>;

export const Default: Story = {
  args: {
    canRender: true,
    heading: 'h2',
    text: 'Heading default - h2'
  }
};
export const H3: Story = {
  args: {
    canRender: true,
    heading: 'h3',
    text: 'Heading h3'
  }
};
export const H4: Story = {
  args: {
    canRender: true,
    heading: 'h4',
    text: 'Heading h4'
  }
};


