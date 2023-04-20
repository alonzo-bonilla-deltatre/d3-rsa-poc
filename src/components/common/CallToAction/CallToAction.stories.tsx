import type { Meta, StoryObj } from '@storybook/react';

import CallToAction from "@/components/common/CallToAction";

const meta: Meta<typeof CallToAction> = {
  title: 'UiComponents/CallToAction',
  component: CallToAction,
  tags: ['autodocs'],
  argTypes: {
    style: {
      options: ['default', 'reverse'],
      control: { type: 'radio' },
    },
    hide: {
      control: false,
    }
  },
};

export default meta;
type Story = StoryObj<typeof CallToAction>;

export const Default: Story = {
  args: {
    url: "#nolink",
    text: 'Call to Action',
    style: 'default'
  },
  parameters: {
    layout: 'centered',
  },
};
export const Reverse: Story = {
  args: {
    url: "#nolink",
    text: 'Call to Action',
    style: 'reverse'
  },
  parameters: {
    layout: 'centered',
  },
};

export const All: Story = {
  render: (args) => (
    <>
      <ul className="list-none flex space-x-5">
        <li>
          <CallToAction url={'#nolink'} text={'Default'} isExternal={false} style={"default"} icon={""} hide={false}></CallToAction>
        </li>

        <li>
          <CallToAction url={'#nolink'} text={'Reverse'} isExternal={false} style={"reverse"} icon={""} hide={false}></CallToAction>
        </li>
      </ul>
    </>
  ),
  parameters: {
    layout: 'centered',
  },
};
