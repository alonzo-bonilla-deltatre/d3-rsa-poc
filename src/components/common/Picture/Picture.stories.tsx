import type { Meta, StoryObj } from '@storybook/react';

import Picture from "@/components/common/Picture";
import { transformations } from "@/utilities/cloudinaryTransformations";

const meta: Meta<typeof Picture> = {
  title: 'UiComponents/Picture',
  component: Picture,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Picture>;

export const Default: Story = {
  render: (args) => (
    <>
      <Picture {...args} className="w-full h-full object-cover" />
    </>
  ),
  args: {
    src: "https://res.cloudinary.com/forgephotos/image/private/{formatInstructions}/forgego-sandbox/npcnwglmc2lzmqe6uuqh",
    alt: "Tokio 2020",
    transformations: {
      mobile: "t_ratio21_9-size30",
      tablet: "t_ratio21_9-size30",
      desktop: "t_ratio21_9-size50",
      mobileWidth: 630,
      mobileHeight: 270
    },
    className: "w-full h-full object-cover",
  },
  parameters: {
    layout: 'centered',
  },
};


