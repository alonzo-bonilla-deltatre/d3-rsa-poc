import type { Meta, StoryObj } from '@storybook/react';

import Partner from '@/components/common/Partner/Partner';
import { samplePartner1 } from '@/__mocks__/entities/samplePartner';
import { transformations } from '@/utilities/cloudinaryTransformations';
import GadAsset from '@/components/common/GadAsset/GadAsset';

const meta: Meta<typeof Partner> = {
  title: 'UiComponents/Partner',
  //component: Partner,
  tags: ['autodocs'],
  argTypes: {
    assetUrl: [
      'https://res.cloudinary.com/forgephotos/image/private/t_q-best/v1678095311/sandbox-integrations/react-poc/SC21_whjgmi.png',
      'reverse',
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Partner>;

export const Default: Story = {
  render: () => (
    <>
      <div className="flex flex-col items-center">
        <GadAsset
          src={samplePartner1.src}
          title={samplePartner1.name}
          width={100}
          height={20}
          transformations={transformations.logos}
        />
        <span className="text-xs uppercase mt-2">{samplePartner1.name}</span>
      </div>
    </>
  ),
  parameters: {
    layout: 'centered',
  },
};
