import type { Meta, StoryObj } from '@storybook/react';
import Story from '@/components/modules/Story/Story';
import { sampleStory } from '@/__mocks__/modules/sampleStory';
import RelatedItems from '@/components/modules/Story/StoryRelatedItems';
import StoryHeader from '@/components/modules/Story/StoryHeader';
import StoryParts from '@/components/modules/Story/StoryParts';
import StoryWrapper from '@/components/modules/Story/StoryWrapper';
import { CardLayout, CardType } from '@/models/types/card';
import { getCardSettings } from '@/components/commons/cards/Card/CardHelpers';

const meta: Meta<typeof StoryWrapper> = {
  title: 'Modules/Story',
  component: StoryWrapper,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Story>;
const cardType = CardType.SmallestNews;
const cardLayout = CardLayout.SquaredSmallHorizontal;
const cardDesign = getCardSettings(cardType, null, cardLayout);

export const Default: Story = {
  render: () => (
    <>
      <StoryHeader storyEntity={sampleStory}></StoryHeader>
      <StoryParts storyEntity={sampleStory}></StoryParts>
      <RelatedItems
        relations={sampleStory.relations}
        hide={false}
        cardDesign={cardDesign}
      ></RelatedItems>
    </>
  ),
  parameters: {
    layout: 'centered',
  },
};
