import type { Meta, StoryObj } from '@storybook/react';
import { sampleBrightcoveVideo } from '@/__mocks__/entities/brightcoveVideo';
import BrightcoveVideoPlayer from '@/components/common/BrightcoveVideoPlayer';
import { DistributionEntity } from '@/models/types/dapi';
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

const brightcoveEntity: DistributionEntity = sampleBrightcoveVideo;

export default meta;

type Story = StoryObj<typeof BrightcoveVideoPlayer>;

export const Default: Story = {
  args: {
    entity: brightcoveEntity,
    isStoryPart: false,
  },
};
export const StoryPart: Story = {
  render: (args) => <BrightcoveVideoPlayer {...args}></BrightcoveVideoPlayer>,
  args: {
    entity: brightcoveEntity,
    isStoryPart: true,
  },
  decorators: [withStoryPartDecorator],
};
