import type { Meta, StoryObj } from '@storybook/react';
import Story from '@/components/modules/Story/Story';
import { sampleStory } from '@/__mocks__/modules/sampleStory';
import RelatedItems from '@/components/modules/Story/StoryRelatedItems';
import StoryHeader from '@/components/modules/Story/StoryHeader';
import StoryParts from '@/components/modules/Story/StoryParts';
import StoryWrapper from '@/components/modules/Story/StoryWrapper';

const meta: Meta<typeof StoryWrapper> = {
  title: 'Modules/Story',
  component: StoryWrapper,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Story>;

export const Default: Story = {
  render: (args) => (
    <>
      <StoryHeader
        hideRelatedItems={false}
        hideAuthor={false}
        hideDate={false}
        hideDescription={false}
        hideRoofline={false}
        hideTitle={false}
        hideSocial={false}
        storyEntity={sampleStory}
        variables={[]}
        {...args}
      ></StoryHeader>
      <StoryParts storyEntity={sampleStory}></StoryParts>
      <RelatedItems
        relations={sampleStory.relations}
        hide={false}
      ></RelatedItems>
    </>
  ),
  args: {},
  parameters: {
    layout: 'centered',
  },
};
