import type { Meta, StoryObj } from '@storybook/react';

import Logo from "@/components/common/Logo";

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
    args: {
      width:200,
      height:50,
      alt:"Supercars logo",
      className : "max-sm:w-full",
      assetUrl: 'https://res.cloudinary.com/forgephotos/image/private/t_q-best/v1678095311/sandbox-integrations/react-poc/SC21_whjgmi.png'
    },
    parameters: {
      layout: 'centered',
    },
  };
 

