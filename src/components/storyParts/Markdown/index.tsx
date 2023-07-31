import { StoryPart } from '@/models/types/storyPart';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
import React from 'react';

// @ts-ignore
const Markdown = dynamic(() => import('@/components/common/Markdown/Markdown'));

export const renderMarkdownStoryPart = ({ ...data }: StoryPart): React.ReactElement =>
  data ? (
    <div className="mx-20 mt-20 col-start-1">
      <Markdown
        key={nanoid()}
        markdownText={data.content?.toString() ?? ''}
      />
    </div>
  ) : (
    <></>
  );
