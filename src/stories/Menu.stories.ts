import type { Meta, StoryObj } from '@storybook/react';

import Menu from "@/components/common/Menu";
import { footerMenu } from "@/pages/api/__mocks__/footerMenu"
import { headerServiceMenu } from "@/pages/api/__mocks__/headerServiceMenu"

import { MenuResponse } from '@/models/types/menu';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Menu> = {
  title: 'Menu',
  component: Menu,
   tags: ['autodocs'],
  //  argTypes: {
  //    style: {
  //     options: ['default', 'reverse'],
  //     control: { type: 'radio' },
  //   },
  //  },
};
export default meta;
 const menuDataBasic = footerMenu as MenuResponse;
 const menuDataIcons = headerServiceMenu as MenuResponse;


 type Story = StoryObj<typeof Menu>;

export const Basic: Story = {
    args: {
      menuItems: menuDataBasic.data.menuItems,
      navItemClasses: 'default'
    }
  };

export const WithIcons: Story = {
    args: {
      menuItems: menuDataIcons.data.menuItems,
      navItemClasses: 'default'
    }
  };


