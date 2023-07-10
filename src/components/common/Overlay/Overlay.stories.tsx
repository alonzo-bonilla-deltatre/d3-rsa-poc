import Overlay from '@/components/common/Overlay';
import { withBaseDecorator } from '@/stories/storybookDecorators';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Overlay> = {
  title: 'UiComponents/Overlay',
  component: Overlay,
};

export default meta;
type Story = StoryObj<typeof Overlay>;

export const Default: Story = {
  args: {
    children: <p>this is a paragraph shown as content</p>,
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [withBaseDecorator],
  render: (args) => <Overlay {...args} />,
};
