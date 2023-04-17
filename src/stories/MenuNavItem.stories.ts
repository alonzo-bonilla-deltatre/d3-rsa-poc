import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from "@/models/types/menu";
import MenuNavItem from '@/components/common/MenuNavItem/MenuNavItem'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MenuNavItem> = {
  title: 'MenuNavItem',
  component: MenuNavItem,
   tags: ['autodocs'],
  //  argTypes: {
  //    style: {
  //     options: ['default', 'reverse'],
  //     control: { type: 'radio' },
  //   },
  //  },
};

const sampleMenuItem: MenuItem ={
  id: "id",
  text: "nav-news",
  properties: {
    tag: "nav-tag",
    toolTip: "",
    link: "",
    icon: "",
    target: "",
    data: "",
    customProperties: "",
    isActive: false
  },menuItems: []
};
const sampleMenuItemIcon: MenuItem ={
  id: "id",
  text: "nav-news",
  properties: {
    tag: "nav-tag",
    toolTip: "",
    link: "",
    icon: "",
    target: "",
    data: "",
    customProperties: "",
    isActive: false
  },menuItems: []
};

export default meta;
type Story = StoryObj<typeof MenuNavItem>;


export const Default: Story = {
    args: {
      menuItem: sampleMenuItem,
      navItemClasses: 'Call to Action',
      parentId: 'default',
      iconSize: 30
    },
    parameters: {
      layout: 'padded',
    },
  };
 

