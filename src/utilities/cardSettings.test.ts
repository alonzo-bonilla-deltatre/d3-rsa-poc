import { CardType } from '@/models/types/card';
import {
  AlbumCard,
  AlbumListCard,
  EventCard,
  EventCardFeatured,
  MediaCard,
  MediaCardMixed,
  PlayerCard,
  ShopCard,
  SmallestNewsCard,
  VideoCard,
  getCardSettingFromType,
  KeyPagesCard,
} from '@/utilities/cardSettings';
import { describe, expect, test } from '@jest/globals';

describe('getCardSettingFromType', (): void => {
  test('should return default MediaCard if CardType is empty', (): void => {
    // ACT
    const result = getCardSettingFromType(null);

    // ASSERT
    expect(result).toEqual(MediaCard);
  });
  test('should return default MediaMixed if CardType is empty', (): void => {
    // ACT
    const result = getCardSettingFromType(CardType.MediaMixed);

    // ASSERT
    expect(result).toEqual(MediaCardMixed);
  });
  test('should return AlbumCard if CardType is Album', (): void => {
    // ACT
    const result = getCardSettingFromType(CardType.Album);

    // ASSERT
    expect(result).toEqual(AlbumCard);
  });

  test('should return SmallestNewsCard if CardType is SmallestNews', (): void => {
    // ACT
    const result = getCardSettingFromType(CardType.SmallestNews);

    // ASSERT
    expect(result).toEqual(SmallestNewsCard);
  });
  test('should return AlbumListCard if CardType is AlbumList', (): void => {
    // ACT
    const result = getCardSettingFromType(CardType.AlbumList);

    // ASSERT
    expect(result).toEqual(AlbumListCard);
  });
  test('should return VideoCard if CardType is Video', (): void => {
    // ACT
    const result = getCardSettingFromType(CardType.Video);

    // ASSERT
    expect(result).toEqual(VideoCard);
  });
  test('should return ShopCard if CardType is Shop', (): void => {
    // ACT
    const result = getCardSettingFromType(CardType.Shop);

    // ASSERT
    expect(result).toEqual(ShopCard);
  });
  test('should return PlayerCard if CardType is Player', (): void => {
    // ACT
    const result = getCardSettingFromType(CardType.Player);

    // ASSERT
    expect(result).toEqual(PlayerCard);
  });
  test('should return MediaCard if CardType is Social', (): void => {
    // ACT
    const result = getCardSettingFromType(CardType.Social);

    // ASSERT
    expect(result).toEqual(MediaCard);
  });
  test('should return EventCard if CardType is Event', (): void => {
    // ACT
    const result = getCardSettingFromType(CardType.Event);

    // ASSERT
    expect(result).toEqual(EventCard);
  });
  test('should return EventCardFeatured if CardType is EventFeatured', (): void => {
    // ACT
    const result = getCardSettingFromType(CardType.EventFeatured);

    // ASSERT
    expect(result).toEqual(EventCardFeatured);
  });
  test('should return KeyPagesCard if CardType is KeyPages', (): void => {
    // ACT
    const result = getCardSettingFromType(CardType.KeyPages);

    // ASSERT
    expect(result).toEqual(KeyPagesCard);
  });
});
