import type { Meta, StoryObj } from '@storybook/react';

import Oembed from '@/components/common/Oembed';
import {
  sampleYoutubeStoryPart,
  sampleTwitterStoryPart,
  sampleInstagramStoryPart,
} from '@/__mocks__/entities/sampleStoryParts';
import { withBaseDecorator } from '@/stories/storybookDecorators';

const meta: Meta<typeof Oembed> = {
  title: 'UiComponents/Oembed',
  component: Oembed,
  tags: ['autodocs'],
  decorators: [withBaseDecorator],
};

export default meta;
type Story = StoryObj<typeof Oembed>;

export const YouTube: Story = {
  args: {
    entity: sampleYoutubeStoryPart,
  },
};
export const Twitter: Story = {
  args: {
    entity: sampleTwitterStoryPart,
  },
};
export const Instagram: Story = {
  args: {
    entity: sampleInstagramStoryPart,
  },
};
