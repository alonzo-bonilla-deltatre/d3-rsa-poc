import { StoryPart } from '@/models/types/storyPart';
import React from 'react';
import dynamic from 'next/dynamic';

const MarkdownComponent = dynamic(() => import('@/components/commons/Markdown/Markdown'));

const Markdown = ({ data }: { data: StoryPart }) => {
  if (!data) {
    return null;
  }
  return (
    <MarkdownComponent markdownText={data.content?.toString() ?? ''} />
  );
};

export default Markdown;
