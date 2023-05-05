import type { Meta, StoryObj } from '@storybook/react';
import HtmlContent from '@/components/modules/HtmlContent';
import { sampleHtmlContent } from '@/__mocks__/modules/sampleHtmlContent';
import { PageStructureItemType } from '@/models/types/pageStructure';

const meta: Meta<typeof HtmlContent> = {
  title: 'Modules/HtmlContent',
  //component: HtmlContent,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HtmlContent>;

export const Default: Story = {
  render: (args) => (
    <>
      <HtmlContent {...args}></HtmlContent>
    </>
  ),
  args: {
    type: PageStructureItemType.layout,
    properties: sampleHtmlContent.properties as Record<string, unknown>,
    slot: '',
  },
  parameters: {
    layout: 'centered',
  },
};
