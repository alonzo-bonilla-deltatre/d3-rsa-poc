import type { Meta, StoryObj } from '@storybook/react';

import Menu from "@/components/common/Menu";
import { sampleMenu } from "@/__mocks__/menu/sampleMenu"
import { sampleMenuWithIcons } from "@/__mocks__/menu/sampleMenuWithIcons"
import { footerMenu } from "@/__mocks__/menu/footerMenu"
import { headerServiceMenu } from "@/__mocks__/menu/headerServiceMenu"

import { MenuResponse } from '@/models/types/menu';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Menu> = {
  title: 'UiComponents/Menu',
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
const menuDataBasic = sampleMenu as MenuResponse;
const menuDataIcons = headerServiceMenu as MenuResponse;
const menuDataWithIcons = sampleMenuWithIcons as MenuResponse;


type Story = StoryObj<typeof Menu>;

export const Basic: Story = {
  args: {
    menuItems: menuDataBasic.data.menuItems,
    navItemClasses: 'default'
  }
};

export const OnlyIcons: Story = {
  args: {
    menuItems: menuDataIcons.data.menuItems,
    navItemClasses: 'default'
  }
};
export const WithIcons: Story = {
  args: {
    menuItems: menuDataWithIcons.data.menuItems,
    navItemClasses: 'default'
  }
};


