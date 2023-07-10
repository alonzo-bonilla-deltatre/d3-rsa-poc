import SearchBar from '@/components/common/SearchBar';
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
    show: true,
    lightTheme: false,
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [withBaseDecorator],
  render: (args) => <SearchBar {...args} />,
};

export const LightTheme: Story = {
  args: {
    additionalClasses: 'pb-8',
    show: true,
    lightTheme: true,
  },
  parameters: {
    layout: 'padded',
  },
  decorators: Default.decorators,
  render: (args) => <SearchBar {...args} />,
};

export const AfterSearch: Story = {
  args: {
    show: true,
    lightTheme: true,
    showResultsCount: true,
    resultsCount: 84,
    inputValue: 'Ronaldo',
  },
  parameters: {
    layout: 'padded',
  },
  decorators: Default.decorators,
  render: (args) => <SearchBar {...args} />,
};
