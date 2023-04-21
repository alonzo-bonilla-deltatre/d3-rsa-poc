import type { Meta, StoryObj } from '@storybook/react';

import Menu from '@/components/common/Menu';
import { sampleMenu } from '@/__mocks__/menu/sampleMenu';
import { sampleMenuWithIcons } from '@/__mocks__/menu/sampleMenuWithIcons';
import { headerServiceMenu } from '@/__mocks__/menu/headerServiceMenu';

import { MenuResponse } from '@/models/types/menu';

const meta: Meta<typeof Menu> = {
  title: 'UiComponents/Menu',
  component: Menu,
  tags: ['autodocs'],
};
export default meta;
const menuDataBasic = sampleMenu as MenuResponse;
const menuDataIcons = headerServiceMenu as MenuResponse;
const menuDataWithIcons = sampleMenuWithIcons as MenuResponse;

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
    menuItems: menuDataBasic.data.menuItems,
    navItemClasses: 'default',
  },
};

export const OnlyIcons: Story = {
  args: {
    menuItems: menuDataIcons.data.menuItems,
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
    menuItems: menuDataWithIcons.data.menuItems,
    navItemClasses: 'default',
  },
};
