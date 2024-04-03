import type { Meta, StoryObj } from '@storybook/react';

import Table from '@/components/commons/Table/Table';
import {
  sampleTableStoryPart1,
  sampleTableStoryPart2,
  sampleTableStoryPart3,
} from '@/__mocks__/entities/sampleTableStoryParts';
import { withBaseDecorator } from '@/stories/storybookDecorators';

const meta: Meta<typeof Table> = {
  title: 'UiComponents/Table',
  component: Table,
  tags: ['autodocs'],
  decorators: [withBaseDecorator],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    entity: sampleTableStoryPart1,
  },
};
export const Basic: Story = {
  args: {
    entity: sampleTableStoryPart2,
  },
};
export const Color: Story = {
  args: {
    entity: sampleTableStoryPart3,
  },
};
