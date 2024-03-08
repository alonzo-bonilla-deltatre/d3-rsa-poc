import { sampleVideoEntity as videoEntity } from '@/__mocks__/entities/sampleDivaVideo';
import DivaVideoPlayer from '@/components/common/DivaVideoPlayer/DivaVideoPlayer';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DivaVideoPlayer> = {
  title: 'modules/DivaVideo/DivaVideoView',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DivaVideoPlayer>;

export const Default: Story = {
  render: (args) => <DivaVideoPlayer {...args}></DivaVideoPlayer>,
  args: {
    videoEntity,
  },
  parameters: {
    layout: 'centered',
  },
};
