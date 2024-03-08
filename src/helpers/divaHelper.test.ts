import { VideoType } from '@/models/types/diva';
import { getSettingUrl, getVideoType } from './divaHelper';
import { describe, expect, it } from '@jest/globals';

describe('getVideoType', () => {
  it('should return livenodata when live and no data', () => {
    // ARRANGE
    const videoContent: any = {
      fields: {
        videoStatus: 'Live',
        WORKFLOW: 'LIVE',
        v_has_data: false,
        v_provider: undefined,
      },
    };
    // ACT
    const type = getVideoType(videoContent);
    // ASSERT
    expect(type).toBe('livenodata');
  });
  it('should return replaynodata when former live and no data', () => {
    // ARRANGE
    const videoContent: any = {
      fields: {
        videoStatus: 'onDemand',
        WORKFLOW: 'LIVE',
        v_has_data: false,
        v_provider: undefined,
      },
    };
    // ACT
    const type = getVideoType(videoContent);
    // ASSERT
    expect(type).toBe('replaynodata');
  });
  it('should return vod when onDemand and no data', () => {
    // ARRANGE
    const videoContent: any = {
      fields: {
        videoStatus: 'onDemand',
        WORKFLOW: 'vod',
        v_has_data: false,
        v_provider: undefined,
      },
    };
    // ACT
    const type = getVideoType(videoContent);
    // ASSERT
    expect(type).toBe('vod');
  });
  it('should return livewithdata when LIVE and has data', () => {
    // ARRANGE
    const videoContent: any = {
      fields: {
        videoStatus: 'Live',
        WORKFLOW: 'LIVE',
        v_has_data: true,
        v_provider: undefined,
      },
    };
    // ACT
    const type = getVideoType(videoContent);
    // ASSERT
    expect(type).toBe('livewithdata');
  });
  it('should return replaywithdata when it was LIVE and has data', () => {
    // ARRANGE
    const videoContent: any = {
      fields: {
        videoStatus: 'onDemand',
        WORKFLOW: 'LIVE',
        v_has_data: true,
        v_provider: undefined,
      },
    };
    // ACT
    const type = getVideoType(videoContent);
    // ASSERT
    expect(type).toBe('replaywithdata');
  });
  it('should return linear when it is LIVE and provider is linear', () => {
    // ARRANGE
    const videoContent: any = {
      fields: {
        videoStatus: 'Live',
        WORKFLOW: 'LIVE',
        v_has_data: false,
        v_provider: 'linear',
      },
    };
    // ACT
    const type = getVideoType(videoContent);
    // ASSERT
    expect(type).toBe('linear');
  });
  it('should return linear when it is LIVE and provider is linear', () => {
    // ARRANGE
    const videoContent: any = {
      fields: {},
    };
    // ACT
    const type = getVideoType(videoContent);
    // ASSERT
    expect(type).toBe('vod');
  });
});

describe('getSettingUrl', () => {
  it('should return url containing videoType', () => {
    // ARRANGE
    const videoType: VideoType = VideoType.vod;
    const urlBase = 'https://divafe-icc-dev.akamaized.net/diva5/settings';
    // ACT
    const url = getSettingUrl(videoType, urlBase);
    // ASSERT
    expect(url).toMatch(`${urlBase}/${videoType}/html5`);
  });
});
