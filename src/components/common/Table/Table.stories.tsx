import type { Meta, StoryObj } from '@storybook/react';

import Table from '@/components/common/Table';
import { sampleTable1, sampleTable2, sampleTable3 } from '@/__mocks__/entities/sampleTableStoryParts';
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
    entity: sampleTable1,
  },
};
export const Basic: Story = {
  args: {
    entity: sampleTable2,
  },
};
export const Color: Story = {
  args: {
    entity: sampleTable3,
  },
};
