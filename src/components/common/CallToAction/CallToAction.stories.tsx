import type { Meta, StoryObj } from '@storybook/react';

import CallToAction from '@/components/common/CallToAction/CallToAction';

const meta: Meta<typeof CallToAction> = {
  title: 'UiComponents/CallToAction',
  component: CallToAction,
  tags: ['autodocs'],
  argTypes: {
    style: {
      options: ['default', 'reverse', 'outline', 'link'],
      control: { type: 'radio' },
    },
    hide: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof CallToAction>;

export const Default: Story = {
  args: {
    url: '#nolink',
    text: 'Call to Action',
    style: 'default',
  },
  parameters: {
    layout: 'centered',
  },
};
export const Reverse: Story = {
  args: {
    url: '#nolink',
    text: 'Call to Action',
    style: 'reverse',
  },
  parameters: {
    layout: 'centered',
  },
};
export const Outline: Story = {
  args: {
    url: '#nolink',
    text: 'Call to Action',
    style: 'outline',
  },
  parameters: {
    layout: 'centered',
  },
};
export const Link: Story = {
  args: {
    url: '#nolink',
    text: 'Call to Action',
    style: 'link',
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
          <CallToAction
            url={'#nolink'}
            text={'Default'}
            isExternal={false}
            style={'default'}
            hide={false}
          ></CallToAction>
        </li>

        <li>
          <CallToAction
            url={'#nolink'}
            text={'Reverse'}
            isExternal={false}
            style={'reverse'}
            hide={false}
          ></CallToAction>
        </li>
        <li>
          <CallToAction
            url={'#nolink'}
            text={'Outline'}
            isExternal={false}
            style={'outline'}
            hide={false}
          ></CallToAction>
        </li>
        <li>
          <CallToAction
            url={'#nolink'}
            text={'Link'}
            isExternal={false}
            style={'link'}
            hide={false}
          ></CallToAction>
        </li>
      </ul>
    </>
  ),
  parameters: {
    layout: 'centered',
  },
};
