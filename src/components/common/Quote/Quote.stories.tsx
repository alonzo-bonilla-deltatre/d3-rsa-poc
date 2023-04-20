import type { Meta, StoryObj } from '@storybook/react';

import Quote from "@/components/common/Quote";
import { sampleQuote } from '@/__mocks__/entities/sampleStoryParts';
import { withBaseDecorator } from '@/services/storybookService';


const meta: Meta<typeof Quote> = {
  title: 'UiComponents/Quote',
  component: Quote,
  tags: ['autodocs'],
  decorators: [
    withBaseDecorator,
  ],
};

export default meta;
type Story = StoryObj<typeof Quote>;

export const Default: Story = {
  args: {
    entity: sampleQuote
  }
};



