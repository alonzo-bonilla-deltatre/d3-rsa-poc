import type { Meta, StoryObj } from '@storybook/react';

import Logo from "@/components/common/Logo";
import { sampleLogo1, sampleLogoSquared } from '@/__mocks__/components/sampleLogos';

const meta: Meta<typeof Logo> = {
  title: 'UiComponents/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    assetUrl: ['https://res.cloudinary.com/forgephotos/image/private/t_q-best/v1678095311/sandbox-integrations/react-poc/SC21_whjgmi.png', 'reverse'],
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  render: (args) => (
    <>
      <Logo {...args}></Logo>
    </>
  ),
  args: sampleLogo1,
  parameters: {
    layout: 'centered',
  },
};
export const Squared: Story = {
  render: (args) => (
    <>
      <Logo {...args}></Logo>
    </>
  ),
  args: sampleLogoSquared,
  parameters: {
    layout: 'centered',
  },
};


