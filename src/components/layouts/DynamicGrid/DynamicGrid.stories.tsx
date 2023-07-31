import { PageStructureItemType } from '@/models/types/pageStructure';
import { getGenericItems } from '@/__mocks__/layouts/sampleDynamicGrid';
import type { Meta, StoryObj } from '@storybook/react';
import DynamicGrid, { DynamicGridProps } from '@/components/layouts/DynamicGrid/DynamicGrid';

const meta: Meta<typeof DynamicGrid> = {
  title: 'Layouts/DynamicGrid',
  component: DynamicGrid,
  tags: ['autodocs'],
  argTypes: {},
};

const mockData: DynamicGridProps = {
  gridTemplate: '6-6',
  componentProps: {
    type: PageStructureItemType.layout,
    items: [],
    variables: [],
    metadata: [],
    previewToken: '',
    slot: '',
    properties: {} as Record<string, unknown>,
  },
};

export default meta;
type Story = StoryObj<typeof DynamicGrid>;

export const Columns66: Story = {
  render: (args) => <DynamicGrid {...args}></DynamicGrid>,
  args: Object.assign({}, mockData, {
    gridTemplate: '6-6',
    componentProps: { items: getGenericItems(2) },
  }),
};

export const Columns39: Story = {
  render: (args) => <DynamicGrid {...args}></DynamicGrid>,
  args: Object.assign(mockData, {
    gridTemplate: '3-9',
    componentProps: { items: getGenericItems(2) },
  }),
};

export const Colums93: Story = {
  render: (args) => <DynamicGrid {...args}></DynamicGrid>,
  args: Object.assign(mockData, {
    gridTemplate: '9-3',
    componentProps: { items: getGenericItems(2) },
  }),
};
export const Columns444: Story = {
  render: (args) => <DynamicGrid {...args}></DynamicGrid>,
  args: Object.assign(mockData, {
    gridTemplate: '4-4-4',
    componentProps: { items: getGenericItems(3) },
  }),
};
export const Columns3333: Story = {
  render: (args) => <DynamicGrid {...args}></DynamicGrid>,
  args: Object.assign(mockData, {
    gridTemplate: '3-3-3-3',
    componentProps: { items: getGenericItems(4) },
  }),
};
export const Columns363: Story = {
  render: (args) => <DynamicGrid {...args}></DynamicGrid>,
  args: Object.assign(mockData, {
    gridTemplate: '3-6-3',
    componentProps: { items: getGenericItems(3) },
  }),
};
