import type { Meta, StoryObj } from '@storybook/react';
import Header from '@/components/layouts/Header/Header';
import { sampleHeader } from '@/__mocks__/layouts/sampleHeader';
import { PageStructureItemType, StructureItem } from '@/models/types/pageStructure';

const meta: Meta<typeof Header> = {
  title: 'Layouts/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: (args) => <Header {...args}></Header>,
  args: {
    type: PageStructureItemType.layout,
    properties: sampleHeader.properties,
    slots: sampleHeader.slots,
    items: sampleHeader.items as StructureItem[],
    slot: sampleHeader.slot,
  },
};
