import type { Meta, StoryObj } from '@storybook/react';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';

import GadAsset from '@/components/commons/GadAsset/GadAsset';
import { sampleLogoWithFormat } from '@/__mocks__/components/sampleLogos';

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
  render: (args) => <GadAsset {...args}></GadAsset>,
  args: {
    className: 'uppercase mr-2 font-bold text-base bg-accent p-2 w-fit',
    transformations: transformations.best_assets,
    width: sampleLogoWithFormat.width,
    height: sampleLogoWithFormat.height,
    title: sampleLogoWithFormat.alt,
    src: sampleLogoWithFormat.assetUrl,
  },
};
