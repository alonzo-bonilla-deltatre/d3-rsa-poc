import type { Meta, StoryObj } from '@storybook/react';

import Picture from "@/components/common/Picture";

const meta: Meta<typeof Picture> = {
  title: 'UiComponents/Picture',
  component: Picture,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Picture>;

export const CustomRatio: Story = {
  render: (args) => (
    <>
      <Picture {...args} className="w-full h-full object-cover"/>
    </>
  ),
  args: {
    src: "https://res.cloudinary.com/forgephotos/image/private/{formatInstructions}/forgego-sandbox/npcnwglmc2lzmqe6uuqh",
  width: 630,
  height: 270,
  alt: "Tokio 2020",
  transformations: {
    mobile: "t_ratio21_9-size30",
    tablet: "t_ratio21_9-size30",
    desktop: "t_ratio21_9-size50"
  },
  className: "w-full h-full object-cover",
  },
  parameters: {
    layout: 'centered',
  },
};



