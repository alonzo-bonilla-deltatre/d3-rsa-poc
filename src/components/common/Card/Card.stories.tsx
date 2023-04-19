import type { Meta, StoryObj } from '@storybook/react';
import { sampleBrightcoveVideo } from '@/__mocks__/entities/brightcoveVideo';
import { sampleStory } from '@/__mocks__/entities/story';
import Card, { CardProps } from "@/components/common/Card";
import { DistributionEntity } from '@/models/types/dapi';

const meta: Meta<typeof Card> = {
  title: 'UiComponents/Card',
  component: Card,
  tags: ['autodocs'],
};
const storyEntity: DistributionEntity = sampleStory;
const brightcoveEntity: DistributionEntity = sampleBrightcoveVideo;
export default meta;


type Story = StoryObj<typeof Card>;

// type StoryArgs = Partial<CardProps>;
// export const Default = ({args: StoryArgs}) => (
//   <div className="grid ">
//     <Card {...args} />
//   </div>
//  );

// Story.args = {
//   entity: storyEntity,
//   options: {
//     hideIcon: true,
//     hideRoofline: false,
//     hideTitle: false,
//     hideDate: false,
//     hideAuthor: true,
//     hideCta: true,
//   }
// };

export const Story: Story = {
  render: (args) => (
    <>
    <h3 className={classNames}>2 columns</h3>
    <div className="grid grid-cols-2 gap-4 px-8 ">
      <Card {...args}></Card> 
    </div>
    <h3 className={classNames}>3 columns</h3>
    <div className="grid grid-cols-3 gap-4 px-8 ">
      <Card {...args}></Card>
    </div>
    <h3 className={classNames}>4 columns</h3>
    <div className="grid grid-cols-4 gap-4 px-8 ">
    <Card {...args}></Card>
  </div>
  <h3 className={classNames}>5 columns</h3>
  <div className="grid grid-cols-5 gap-4 px-8 ">
    <Card {...args}></Card>
  </div>
  </>
  ),
  args: {
    entity: storyEntity,
    options: {
      hideIcon: true,
      hideRoofline: false,
      hideTitle: false,
      hideDate: false,
      hideAuthor: true,
      hideCta: true,
    }
  }
};
const classNames = "my-2 mt-4 text-xxl tracking-tight dark:text-white px-8";
export const BrightcoveVideo: Story = {
  render: (args) => (
    <>
    <h3 className={classNames}>2 columns</h3>
    <div className="grid grid-cols-2 gap-4 px-8 ">
      <Card {...args}></Card> 
    </div>
    <h3 className={classNames}>3 columns</h3>
    <div className="grid grid-cols-3 gap-4 px-8 ">
      <Card {...args}></Card>
    </div>
    <h3 className={classNames}>4 columns</h3>
    <div className="grid grid-cols-4 gap-4 px-8 ">
    <Card {...args}></Card>
  </div>
  <h3 className={classNames}>5 columns</h3>
  <div className="grid grid-cols-5 gap-4 px-8 ">
    <Card {...args}></Card>
  </div>
  </>
  ),
  args: {
    entity: brightcoveEntity,
    options: {
      hideIcon: false,
      hideRoofline: false,
      hideTitle: false,
      hideDate: false,
      hideAuthor: true,
      hideCta: true,
    }
  }
};

