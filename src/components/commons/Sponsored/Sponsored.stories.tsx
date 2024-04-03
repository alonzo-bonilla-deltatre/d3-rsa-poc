import type { Meta, StoryObj } from '@storybook/react';

import Sponsored from '@/components/commons/Sponsored/Sponsored';
import { sampleLogoSquared } from '@/__mocks__/components/sampleLogos';

const meta: Meta<typeof Sponsored> = {
  title: 'UiComponents/Sponsored',
  component: Sponsored,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sponsored>;

export const Default: Story = {
  render: (args) => <Sponsored {...args}></Sponsored>,
  args: {
    hide: false,
    className: '',
    name: sampleLogoSquared.alt,
    width: 40,
    height: 40,
    assetUrl: sampleLogoSquared.assetUrl,
  },
};
