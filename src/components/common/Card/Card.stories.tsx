import type { Meta, StoryObj } from '@storybook/react';
import { sampleBrightcoveVideo } from '@/__mocks__/entities/brightcoveVideo';
import { sampleStory } from '@/__mocks__/entities/story';
import Card from '@/components/common/Card';
import { DistributionEntity } from '@/models/types/dapi';
import { withBaseDecorator } from '@/stories/storybookDecorators';
import CardFullSquared from '../cards/CardFullSquared';
import CardFullPortrait from '../cards/CardFullPortrait';
import CardDefault from '../cards/CardDefault';
const meta: Meta<typeof Card> = {
  title: 'UiComponents/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    entity: {
      control: false,
    },
  },
  decorators: [withBaseDecorator],
};
const storyEntity: DistributionEntity = sampleStory;
const brightcoveEntity: DistributionEntity = sampleBrightcoveVideo;
const classNames = 'my-8 text-xxl tracking-tight dark:text-white px-8';
export default meta;

type Story = StoryObj<typeof Card>;
export const CardLayout: Story = {
  render: (args) => (
    <>
      <h3 className={classNames}>default (with landscape transformation)</h3>
      <div className="grid grid-cols-3 gap-4 px-8 ">
        <Card {...args}></Card>
      </div>
      <h3 className={classNames}>fullimage (with squared transformation)</h3>
      <div className="grid grid-cols-3 gap-4 px-8 ">
        <Card
          {...args}
          layout="fullimage"
        ></Card>
      </div>
      <h3 className={classNames}>fullimage-portrait (with portrait transformation)</h3>
      <div className="grid grid-cols-3 gap-4 px-8">
        <Card
          {...args}
          layout="fullimage-portrait"
        ></Card>
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
      className: 'border-amber-200 border-2 border-dotted',
    },
  },
};

export const Story: Story = {
  render: (args) => (
    <>
      <h3 className={classNames}>2 columns</h3>
      <div className="grid grid-cols-2 gap-4 px-8 ">
        <Card {...args}></Card>
        <Card {...args}></Card>
      </div>
      <h3 className={classNames}>3 columns</h3>
      <div className="grid grid-cols-3 gap-4 px-8 ">
        <Card {...args}></Card>
        <Card {...args}></Card>
        <Card {...args}></Card>
      </div>
      <h3 className={classNames}>4 columns</h3>
      <div className="grid grid-cols-4 gap-4 px-8 ">
        <Card {...args}></Card>
        <Card {...args}></Card>
        <Card {...args}></Card>
        <Card {...args}></Card>
      </div>
      <h3 className={classNames}>5 columns</h3>
      <div className="grid grid-cols-5 gap-4 px-8 ">
        <Card {...args}></Card>
        <Card {...args}></Card>
        <Card {...args}></Card>
        <Card {...args}></Card>
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
      className: '',
    },
  },
};

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
      className: '',
    },
  },
};

export const FullSquared: Story = {
  render: (args) => (
    <>
      <h3 className={classNames}>Card Full Squared</h3>
      <div className="grid grid-cols-3 gap-4 px-8 ">
        <CardFullSquared {...args}></CardFullSquared>
      </div>
    </>
  ),
  args: {
    entity: storyEntity,
    options: {
      hideIcon: false,
      hideRoofline: false,
      hideTitle: false,
      hideDate: false,
      hideAuthor: true,
      hideCta: true,
      className: '',
    },
  },
};
export const FullPortrait: Story = {
  render: (args) => (
    <>
      <h3 className={classNames}>Card Full Portrait</h3>
      <div className="grid grid-cols-3 gap-4 px-8 ">
        <CardFullPortrait {...args}></CardFullPortrait>
      </div>
    </>
  ),
  args: {
    entity: storyEntity,
    options: {
      hideIcon: false,
      hideRoofline: false,
      hideTitle: false,
      hideDate: false,
      hideAuthor: true,
      hideCta: true,
      className: '',
    },
  },
};
export const Default: Story = {
  render: (args) => (
    <>
      <h3 className={classNames}>Card Default</h3>
      <div className="grid grid-cols-3 gap-4 px-8 ">
        <CardDefault {...args}></CardDefault>
      </div>
    </>
  ),
  args: {
    entity: storyEntity,
    options: {
      hideIcon: false,
      hideRoofline: false,
      hideTitle: false,
      hideDate: false,
      hideAuthor: true,
      hideCta: true,
      className: '',
    },
  },
};
