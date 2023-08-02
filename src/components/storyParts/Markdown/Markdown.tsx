import { StoryPart } from '@/models/types/storyPart';
import React from 'react';
import dynamic from 'next/dynamic';

// @ts-ignore
const MarkdownComponent = dynamic(() => import('@/components/common/Markdown/Markdown'));

const Markdown = ({ ...data }: StoryPart) =>
  data ? (
    <div className="mx-20 mt-20 col-start-1">
      <MarkdownComponent markdownText={data.content?.toString() ?? ''} />
    </div>
  ) : (
    <></>
  );

export default Markdown;
