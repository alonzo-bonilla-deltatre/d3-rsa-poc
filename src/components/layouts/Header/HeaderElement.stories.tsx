import type { Meta, StoryObj } from '@storybook/react';
import { headerServiceMenu } from '@/__mocks__/menu/headerServiceMenu';
import { sampleAsset } from '@/__mocks__/components/sampleGadAsset';
import HeaderElement from '@/components/layouts/Header/HeaderElement';
import { MenuResponseData } from '@/models/types/menu';

const meta: Meta<typeof HeaderElement> = {
  title: 'Layouts/Header',
  component: HeaderElement,
  tags: ['autodocs'],
  argTypes: {
    menuData: {
      control: false,
    },
    logo: {
      control: false,
    },
  },
};
const menuDataService = headerServiceMenu.data as MenuResponseData;

export default meta;
type Story = StoryObj<typeof HeaderElement>;

export const Default: Story = {
  render: (args) => (
    <>
      <HeaderElement {...args}></HeaderElement>
    </>
  ),
  args: {
    menuData: menuDataService,
    menuItemClasses: 'mx-1',
    iconSize: 44,
    logo: sampleAsset,
    logoWidth: 226,
    logoHeight: 25,
    logoName: 'Supercars',
    logoLink: '/test/react-poc/demo',
  },
};
