import type { Meta, StoryObj } from '@storybook/react';
import { footerMenu } from "@/__mocks__/menu/footerMenu"
import FooterElement from "@/components/layouts/Footer/FooterElement";
import { MenuResponseData } from '@/models/types/menu';


const meta: Meta<typeof FooterElement> = {
  title: 'Layouts/Footer',
  component: FooterElement,
  tags: ['autodocs'],
  argTypes: {
    menuData: {
      control: false,
    },
    languages: {
      control: false,
    }
  },
};
const menuDataFooter = footerMenu.data as MenuResponseData;


export default meta;
type Story = StoryObj<typeof FooterElement>;

export const Default: Story = {
  render: (args) => (
    <>
      <FooterElement {...args}></FooterElement>
    </>
  ),
  args: {
    social: {
      hide: false,
      size: 34,
      className: "mr-4"
    },
    languages: {
      allSites: [
        {
          culture: "en-GB",
          environment: "sandbox",
          platform: "default",
          originUrl: "https://react-fe-en-poc.integrations-lab-forge.deltatre.digital",
          translation: "English"
        },
        {
          culture: "fr-FR",
          environment: "sandbox",
          platform: "default",
          originUrl: "https://react-fe-fr-poc.integrations-lab-forge.deltatre.digital",
          translation: "Francais"
        }
      ]
    },
    copyright: '@ Copyright',
    menuData: menuDataFooter
  }
};
