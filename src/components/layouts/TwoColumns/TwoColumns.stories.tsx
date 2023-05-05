import type { Meta, StoryObj } from '@storybook/react';
import TwoColumns from '@/components/layouts/TwoColumns';
import { sampleTwoColumns } from '@/__mocks__/layouts/sampleTwoColumns';
import { PageStructureItemType, StructureItem } from '@/models/types/pageStructure';

const meta: Meta<typeof TwoColumns> = {
  title: 'Layouts/TwoColumns',
  //component: TwoColumns,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TwoColumns>;

export const Default: Story = {
  render: (args) => <TwoColumns {...args}></TwoColumns>,
  args: {
    type: PageStructureItemType.layout,
    properties: sampleTwoColumns.properties,
    slots: sampleTwoColumns.slots,
    items: sampleTwoColumns.items as StructureItem[],
  },
};
