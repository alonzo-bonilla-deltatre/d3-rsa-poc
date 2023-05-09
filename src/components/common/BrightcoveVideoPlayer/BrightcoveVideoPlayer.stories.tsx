import type { Meta, StoryObj } from '@storybook/react';
import { sampleBrightcoveVideo } from '@/__mocks__/entities/brightcoveVideo';
import { sampleBrightcoveVideoStoryPart } from '@/__mocks__/entities/sampleStoryParts';
import BrightcoveVideoPlayer from '@/components/common/BrightcoveVideoPlayer';
import { withBaseDecorator, withStoryPartDecorator } from '@/stories/storybookDecorators';

const meta: Meta<typeof BrightcoveVideoPlayer> = {
  title: 'UiComponents/BrightcoveVideoPlayer',
  component: BrightcoveVideoPlayer,
  tags: ['autodocs'],
  argTypes: {
    entity: {
      control: false,
    },
  },
  decorators: [withBaseDecorator],
};

export default meta;

type Story = StoryObj<typeof BrightcoveVideoPlayer>;

export const Default: Story = {
  args: {
    entity: sampleBrightcoveVideo,
    isStoryPart: false,
  },
};
export const StoryPart: Story = {
  render: (args) => <BrightcoveVideoPlayer {...args}></BrightcoveVideoPlayer>,
  args: {
    entity: sampleBrightcoveVideoStoryPart,
    isStoryPart: true,
  },
  decorators: [withStoryPartDecorator],
};
