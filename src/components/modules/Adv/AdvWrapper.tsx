import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import React from 'react';
import Adv from '@/components/modules/Adv/Adv';
import { nanoid } from 'nanoid';

const AdvWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <Adv data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <AdvWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
