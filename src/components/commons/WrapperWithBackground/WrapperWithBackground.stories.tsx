import type { Meta, StoryObj } from '@storybook/react';

import WrapperWithBackground from '@/components/commons/WrapperWithBackground/WrapperWithBackground';

const meta: Meta<typeof WrapperWithBackground> = {
  title: 'UiComponents/WrapperWithBackground',
  component: WrapperWithBackground,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WrapperWithBackground>;

const paragraph = (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ipsum lorem, efficitur ac felis at, accumsan
    dapibus tellus. Mauris feugiat, mi nec vestibulum dictum, tortor dui porta magna, non tincidunt nisl erat vel
    libero. Integer quis mattis massa. Fusce eget orci ac magna scelerisque vulputate a sit amet arcu. Etiam faucibus
    rhoncus elit, vel iaculis nunc vestibulum ac. Fusce imperdiet vel arcu non malesuada. Mauris sit amet felis nec mi
    rutrum faucibus non nec libero. Nullam finibus a nunc vel fringilla. Fusce efficitur pellentesque sapien id
    lobortis. Donec mattis ante et ornare ultrices. Praesent quis felis a odio aliquam ullamcorper ultricies sed tortor.
    Phasellus luctus eros eu massa lobortis, eget sollicitudin massa eleifend. Nam a elit ligula. Donec nec felis
    lobortis, facilisis nisi quis, dictum nunc. Suspendisse vitae condimentum neque. Integer iaculis tellus nibh, sit
    amet rhoncus mauris molestie eu.
    <br />
    <br />
    Fusce efficitur neque vel augue pharetra ullamcorper. Integer tincidunt diam vel odio egestas, sit amet malesuada
    arcu elementum. Cras mattis luctus mattis. Aenean lobortis placerat tincidunt. Integer fringilla, enim non luctus
    sagittis, dolor velit porttitor velit, eu mollis nunc justo eu leo. Vestibulum luctus risus at libero laoreet, id
    aliquam justo venenatis. Sed eu ex ut lectus ullamcorper congue a quis massa.
    <br />
    <br />
    Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur at nunc tellus.
    Curabitur venenatis libero ut velit aliquet varius. Pellentesque dictum aliquam neque, vel ullamcorper mauris
    ullamcorper et. Nunc sit amet ligula condimentum, volutpat dolor eget, luctus ex. Phasellus lorem nisi, molestie non
    diam aliquet, facilisis posuere nunc. Aliquam auctor lacinia felis. Fusce aliquam ante mollis nibh lacinia, sit amet
    tincidunt ex finibus. Sed sed sapien eget velit ornare porttitor sit amet ut justo.
  </p>
);

export const All: Story = {
  args: {
    size: 80,
    sizeMobile: 40,
  },
  render: (args) => {
    return (
      <WrapperWithBackground {...args}>
        <div className="text-gray-600 p-10">
          <div>{paragraph}</div>
          <div>{paragraph}</div>
          <div>{paragraph}</div>
        </div>
      </WrapperWithBackground>
    );
  },
  parameters: {
    layout: 'centered',
  },
};
