import Table from '@/components/common/Table';
import { StoryPart } from '@/models/types/storyPart';
import React from 'react';

const renderStoryPart = ({ ...data }: StoryPart): React.ReactElement => (data ? <Table entity={data} /> : <></>);

export default renderStoryPart;
