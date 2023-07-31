import type { Meta, StoryObj } from '@storybook/react';

import Menu from '@/components/common/MenuList/MenuList';
import { sampleMenu } from '@/__mocks__/menu/sampleMenu';
import { sampleMenuWithIcons } from '@/__mocks__/menu/sampleMenuWithIcons';
import { headerServiceMenu } from '@/__mocks__/menu/headerServiceMenu';

import { MenuStructureResponse } from '@/models/types/menu';

const meta: Meta<typeof Menu> = {
  title: 'UiComponents/Menu',
  component: Menu,
  tags: ['autodocs'],
};
export default meta;
const menuDataBasic = sampleMenu as MenuStructureResponse;
const menuDataIcons = headerServiceMenu as MenuStructureResponse;
const menuDataWithIcons = sampleMenuWithIcons as MenuStructureResponse;

type Story = StoryObj<typeof Menu>;

export const Basic: Story = {
  render: (args) => (
    <>
      <div className="container mx-20 py-12 lg:text-center">
        <div className="flex flex-col lg:flex-row uppercase justify-between">
          <Menu {...args}></Menu>
        </div>
      </div>
    </>
  ),
  args: {
    menuItems: menuDataBasic.data.items,
    navItemClasses: 'default',
  },
};

export const OnlyIcons: Story = {
  args: {
    menuItems: menuDataIcons.data.items,
    navItemClasses: 'default',
  },
};
export const WithIcons: Story = {
  render: (args) => (
    <>
      <div>To be mplemented</div>
      <Menu {...args}></Menu>
    </>
  ),
  args: {
    menuItems: menuDataWithIcons.data.items,
    navItemClasses: 'default',
  },
};
