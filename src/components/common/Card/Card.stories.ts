import type { Meta, StoryObj } from '@storybook/react';
import { sampleBrightcoveVideo } from '@/__mocks__/entities/brightcoveVideo';
import { sampleStory } from '@/__mocks__/entities/story';
import Card from "@/components/common/Card";
import { DistributionEntity } from '@/models/types/dapi';

const meta: Meta<typeof Card> = {
  title: 'UiComponents/Card',
  component: Card,
  
  tags: ['autodocs'],
};
const storyEntity: DistributionEntity = sampleStory;
const brightcoveEntity: DistributionEntity = sampleBrightcoveVideo;
export default meta;
type Story = StoryObj<typeof Card>;

export const Story: Story = {
  args: {
    entity: storyEntity,
    options: {
      hideIcon: true,
      hideRoofline: false,
      hideTitle: false,
      hideDate: false,
      hideAuthor: true,
      hideCta: true,
    }
  }
};
export const BrightcoveVideo: Story = {
  args: {
    entity: brightcoveEntity,
    options: {
      hideIcon: false,
      hideRoofline: false,
      hideTitle: false,
      hideDate: false,
      hideAuthor: true,
      hideCta: true,
    }
  }
};

