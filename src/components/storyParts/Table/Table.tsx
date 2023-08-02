import { StoryPart } from '@/models/types/storyPart';
import React from 'react';
import Table from '@/components/common/Table/Table';

const TableStoryPart = ({ ...data }: StoryPart) =>
  data ? (
    <div className="mx-20 mt-20 col-start-1">
      <Table entity={data} />
    </div>
  ) : (
    <></>
  );

export default TableStoryPart;
