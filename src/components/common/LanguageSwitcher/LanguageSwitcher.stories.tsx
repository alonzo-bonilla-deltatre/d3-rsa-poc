import type { Meta, StoryObj } from '@storybook/react';
import LanguageSwitcher from '@/components/common/LanguageSwitcher/LanguageSwitcher';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Layouts/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
  argTypes: {
    allSiteConfiguration: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const Default: Story = {
  render: (args) => <LanguageSwitcher {...args}></LanguageSwitcher>,
  args: {
    allSiteConfiguration: {
      allSites: [
        {
          culture: 'en-GB',
          url: 'https://react-fe-en-poc.integrations-lab-forge.deltatre.digital',
          translation: 'English',
        },
        {
          culture: 'fr-FR',
          url: 'https://react-fe-fr-poc.integrations-lab-forge.deltatre.digital',
          translation: 'Francais',
        },
      ],
    },
  },
};
