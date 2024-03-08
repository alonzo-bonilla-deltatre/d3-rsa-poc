import type { Meta, StoryObj } from '@storybook/react';
import Image from '@/components/modules/Image/Image';
import ImageView from '@/components/modules/Image/ImageView';
import { defaultView } from '@/__mocks__/components/modules/Image/sampleImageView';

const meta: Meta<typeof Image> = {
  title: 'Modules/Image',
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  render: () => <ImageView {...defaultView}></ImageView>,
};
