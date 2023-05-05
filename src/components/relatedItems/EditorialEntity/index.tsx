import Card from '@/components/common/Card';
import { DistributionEntity } from '@/models/types/dapi';
import { nanoid } from 'nanoid';
import React from 'react';

const renderEditorialRelatedItem = ({ ...data }: DistributionEntity): React.ReactElement =>
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
          hideCta: true,
          className: '',
        }}
        layout={null}
      ></Card>
    </>
  ) : (
    <></>
  );

export default renderEditorialRelatedItem;
