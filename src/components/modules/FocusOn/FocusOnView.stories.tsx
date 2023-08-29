import FocusOnView from '@/components/modules/FocusOn/FocusOnView';
import FocusOnWrapper from '@/components/modules/FocusOn/FocusOnWrapper';
import type { Meta, StoryObj } from '@storybook/react';
import { sampleStory } from '@/__mocks__/entities/story';

const meta: Meta<typeof FocusOnWrapper> = {
  title: 'Modules/FocusOn',
  component: FocusOnWrapper,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FocusOnView>;

export const Default: Story = {
  render: (args) => <FocusOnView {...args}></FocusOnView>,
  args: {
    storyEntity: sampleStory,
  },
  parameters: {
    layout: 'centered',
  },
};
