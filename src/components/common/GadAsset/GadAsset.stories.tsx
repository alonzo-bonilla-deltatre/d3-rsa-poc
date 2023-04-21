import type { Meta, StoryObj } from '@storybook/react';
import { transformations } from "@/utilities/cloudinaryTransformations";

import GadAsset from "@/components/common/GadAsset";
import {sampleLogo2,sampleLogoWithFormat } from '@/__mocks__/components/sampleLogos';

const meta: Meta<typeof GadAsset> = {
  title: 'UiComponents/GadAsset',
  component: GadAsset,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof GadAsset>;

export const Default: Story = {
  render: (args) => (
    <>
    {<GadAsset {...args}></GadAsset>}
    </>
    ),
  args: {
    className: 'uppercase mr-2 font-bold text-base bg-[#EE3123] p-2 w-fit',
    transformations: transformations.logos,
    width: sampleLogoWithFormat.width,
    height: sampleLogoWithFormat.height,
    title: sampleLogoWithFormat.alt,
    src: sampleLogoWithFormat.assetUrl,    
  }
};



