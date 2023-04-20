import type { Meta, StoryObj } from '@storybook/react';

import Sponsored from "@/components/common/Sponsored";
import { sampleLogo2 } from '@/__mocks__/components/sampleLogos';

const meta: Meta<typeof Sponsored> = {
  title: 'UiComponents/Sponsored',
  component: Sponsored,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sponsored>;

export const Default: Story = {
  render: (args) => (
    <>
    <Sponsored {...args}></Sponsored>
    </>
    ),
  args: {
    hide: false,
    className: 'uppercase mr-2 font-bold text-base bg-[#EE3123] p-2 w-fit',
    name: sampleLogo2.alt,
    width: sampleLogo2.width,
    height: sampleLogo2.height,
    assetUrl: sampleLogo2.assetUrl,
  }
};

              