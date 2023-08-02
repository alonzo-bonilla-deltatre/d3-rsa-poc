import Card from '@/components/common/Card/Card';
import { DistributionEntity } from '@/models/types/forge';
import { nanoid } from 'nanoid';
import React from 'react';

const Promo = ({ ...data }: DistributionEntity) =>
  data ? (
    <Card
      key={nanoid()}
      entity={data}
      options={{
        hideIcon: true,
        hideRoofline: false,
        hideTitle: false,
        hideDate: true,
        hideAuthor: true,
        hideCta: false,
        className: '',
      }}
      layout={'fullimage'}
    ></Card>
  ) : (
    <></>
  );

export default Promo;
