import Card from '@/components/common/Card';
import { DistributionEntity } from '@/models/types/dapi';
import { nanoid } from 'nanoid';
import React from 'react';

const renderPromoRelatedItem = ({ ...data }: DistributionEntity): React.ReactElement =>
  data ? (
    <>
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
          className:''
        }}
        layout={'fullimage'}
      ></Card>
    </>
  ) : (
    <></>
  );

export default renderPromoRelatedItem;
