import SearchBar from '@/components/commons/SearchBar/SearchBar';
import { withBaseDecorator } from '@/stories/storybookDecorators';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SearchBar> = {
  title: 'UiComponents/SearchBar',
  component: SearchBar,
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    additionalClasses: 'pb-8',
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [withBaseDecorator],
  render: (args) => <SearchBar {...args} />,
};
