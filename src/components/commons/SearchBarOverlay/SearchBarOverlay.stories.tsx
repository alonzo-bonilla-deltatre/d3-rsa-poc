import SearchBarOverlay from '@/components/commons/SearchBarOverlay/SearchBarOverlay';
import { withBaseDecorator } from '@/stories/storybookDecorators';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SearchBarOverlay> = {
  title: 'UiComponents/SearchBarOverlay',
  component: SearchBarOverlay,
};

export default meta;
type Story = StoryObj<typeof SearchBarOverlay>;

export const Default: Story = {
  parameters: {
    layout: 'padded',
  },
  decorators: [withBaseDecorator],
  render: (args) => <SearchBarOverlay {...args} />,
};
