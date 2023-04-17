import type { Meta, StoryObj } from '@storybook/react';

import dynamic from "next/dynamic";

// @ts-ignore
const Promo = dynamic(() => import("@/components/modules/Promo/index"));

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Promo> = {
  title: 'Modules/Promo',
  component: Promo,
   tags: ['autodocs'],
  //  argTypes: {
  //    style: {
  //     options: ['default', 'reverse'],
  //     control: { type: 'radio' },
  //   },
  //  },
};

export default meta;
type Story = StoryObj<typeof Promo>;

export const PromoDefault: Story = {
     args: { 
    //   slug: "#nolink",
    //   moduleTitle: 'Call to Action',
    //   headingLevel: 'default',
    //   displayModuleTitle: false
    },
    parameters: {
      layout: 'centered',
    },
  };
  

