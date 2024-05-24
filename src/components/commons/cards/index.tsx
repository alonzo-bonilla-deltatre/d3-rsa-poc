import React from 'react';
import SearchCard from '@/components/commons/cards/SearchCard/SearchCard';
import StoryRelatedItemCard from '@/components/commons/cards/StoryRelatedItemCard/StoryRelatedItemCard';
import { DistributionEntity } from '@/models/types/forge';
import AlbumCard from '@/components/commons/cards/AlbumCard/AlbumCard';

export type CardProps = {
  entity: DistributionEntity;
};

export enum CardsType {
  AlbumCard = 'AlbumCard',
  SearchCard = 'SearchCard',
  StoryRelatedItemCard = 'StoryRelatedItemCard',
}

export const cards = {
  AlbumCard,
  SearchCard,
  StoryRelatedItemCard,
};

export const renderCard = (card: keyof typeof cards, props: CardProps) => {
  if (!cards[card]) {
    return null;
  }
  const CardComponent: React.ElementType = cards[card];
  return <CardComponent {...props} />;
};
