import React from 'react';
import { DistributionEntity } from '@/models/types/forge';
import AlbumCard from '@/components/commons/cards/AlbumCard/AlbumCard';
import DefaultCard from '@/components/commons/cards/DefaultCard/DefaultCard';
import EventCard from '@/components/commons/cards/EventCard/EventCard';
import PlayerCard from '@/components/commons/cards/PlayerCard/PlayerCard';
import SearchCard from '@/components/commons/cards/SearchCard/SearchCard';
import ShopCard from '@/components/commons/cards/ShopCard/ShopCard';
import StoryRelatedItemCard from '@/components/commons/cards/StoryRelatedItemCard/StoryRelatedItemCard';
import VideoCard from '@/components/commons/cards/VideoCard/VideoCard';

export type CardProps = {
  entity: DistributionEntity;
};

export enum CardsType {
  AlbumCard = 'AlbumCard',
  DefaultCard = 'DefaultCard',
  EventCard = 'EventCard',
  PlayerCard = 'PlayerCard',
  SearchCard = 'SearchCard',
  ShopCard = 'ShopCard',
  StoryRelatedItemCard = 'StoryRelatedItemCard',
  VideoCard = 'VideoCard',
}

export const cards = {
  AlbumCard,
  DefaultCard,
  EventCard,
  PlayerCard,
  SearchCard,
  ShopCard,
  StoryRelatedItemCard,
  VideoCard,
};

export const renderCard = (card: keyof typeof cards, props: CardProps) => {
  if (!cards[card]) {
    return null;
  }
  const CardComponent: React.ElementType = cards[card];
  return <CardComponent {...props} />;
};
