import type { Meta, StoryObj } from '@storybook/react';

import Picture from '@/components/commons/Picture/Picture';
import { defaultCloudinaryTransformations } from '@/utilities/defaultCloudinaryTransformationsUtility';

const meta: Meta<typeof Picture> = {
  title: 'UiComponents/CloudinaryImage',
  component: Picture,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Picture>;

export const Default: Story = {
  render: (args) => (
    <Picture
      {...args}
      className="w-full h-full object-cover"
    />
  ),
  args: {
    src: 'https://res.cloudinary.com/forgephotos/image/private/{formatInstructions}/forgego-sandbox/npcnwglmc2lzmqe6uuqh',
    alt: 'Tokio 2020',
    transformations: {
      mobile: defaultCloudinaryTransformations.ratio21_9_size30,
      tablet: defaultCloudinaryTransformations.ratio21_9_size30,
      desktop: defaultCloudinaryTransformations.ratio21_9_size50,
    },
    className: 'w-full h-full object-cover',
  },
  parameters: {
    layout: 'centered',
  },
};
