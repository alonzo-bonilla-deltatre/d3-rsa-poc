import type { Meta, StoryObj } from '@storybook/react';

import Oembed from '@/components/common/Oembed';
import { sampleYoutube, sampleTwitter, sampleInstagram } from '@/__mocks__/entities/sampleStoryParts';
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
    entity: sampleYoutube,
  },
};
export const Twitter: Story = {
  args: {
    entity: sampleTwitter,
  },
};
export const Instagram: Story = {
  args: {
    entity: sampleInstagram,
  },
};
