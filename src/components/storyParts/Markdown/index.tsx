import { StoryPart } from '@/models/types/storyPart';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
import React from 'react';
// @ts-ignore
const Markdown = dynamic(() => import('@/components/common/Markdown'));

export const renderMarkdownStoryPart = ({ ...data }: StoryPart): React.ReactElement =>
  data ? (
    <Markdown
      key={nanoid()}
      markdownText={data.content?.toString()}
    />
  ) : (
    <></>
  );
