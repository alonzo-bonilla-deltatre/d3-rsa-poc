import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from '@/models/types/menu';
import MenuNavItem from '@/components/common/MenuNavItem/MenuNavItem';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MenuNavItem> = {
  title: 'UiComponents/MenuNavItem',
  component: MenuNavItem,
  tags: ['autodocs'],
  argTypes: {
    menuItem: {
      control: false,
    },
  },
};

const sampleMenuItem: MenuItem = {
  id: 'id',
  text: 'news',
  tag: 'news',
  link: '',
  target: '',
  tooltip: '',
  visible: true,
  icon: {
    data: '',
  },
  properties: {
    data: '',
  },
  items: [],
};
const sampleMenuItemIcon: MenuItem = {
  id: 'id',
  text: 'news',
  tag: 'news',
  link: '',
  target: '',
  tooltip: '',
  visible: true,
  icon: {
    data: '',
  },
  properties: {
    data: '',
  },
  items: [],
};

export default meta;
type Story = StoryObj<typeof MenuNavItem>;

export const Default: Story = {
  args: {
    menuItem: sampleMenuItem,
    navItemClasses: 'Call to Action',
    parentId: 'default',
    iconSize: 30,
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithIcon: Story = {
  args: {
    menuItem: sampleMenuItem,
    navItemClasses: 'Call to Action',
    parentId: 'default',
    iconSize: 30,
  },
  parameters: {
    layout: 'padded',
  },
};
