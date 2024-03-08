import { StoryPart } from '@/models/types/storyPart';
import React from 'react';
import Table from '@/components/common/Table/Table';

const TableStoryPart = ({ data }: { data: StoryPart }) => <Table entity={data} />;

export default TableStoryPart;
