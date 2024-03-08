import { sampleAlbumList } from '@/__mocks__/modules/sampleAlbumList';
import AlbumListView from '@/components/modules/AlbumList/AlbumListView';
import { DistributionEntity } from '@/models/types/forge';
import type { Meta } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof AlbumListView> = {
  title: 'UiComponents/AlbumListView',
  component: AlbumListView,
  tags: ['autodocs'],
};

export default meta;

const useLoadMore = (albumList: typeof sampleAlbumList) => {
  const [list, setList] = useState(albumList.slice(0, 8));
  const [isLoadMoreDisplayed, setIsLoadMoreDisplayed] = useState(true);

  const handleLoadMore = () => {
    const moreItems = albumList.slice(list.length, list.length + 2);
    setList([...list, ...moreItems]);

    if (list.length + moreItems.length >= albumList.length) {
      setIsLoadMoreDisplayed(false);
    }
  };

  return { list, isLoadMoreDisplayed, handleLoadMore };
};

export const DefaultView = () => {
  const { list, isLoadMoreDisplayed, handleLoadMore } = useLoadMore(sampleAlbumList);

  return (
    <AlbumListView
      entityList={list as DistributionEntity[]}
      isLoadMoreDisplayed={isLoadMoreDisplayed}
      handleLoadMore={handleLoadMore}
    />
  );
};
