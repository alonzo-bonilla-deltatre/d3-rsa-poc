import { KeyValue, Variable } from '@/models/types/pageStructure';
import { getFooterStructure } from '@/services/footerService';
import { getPageStructure } from '@/services/pageService';

jest.mock('@/services/pageService', () => ({
  getPageStructure: jest.fn(),
}));

describe('getFooterStructure function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns null if variables is undefined', async (): Promise<void> => {
    const footer = await getFooterStructure(undefined);

    expect(footer).toBeNull();
  });

  it('returns null if footerSource is null', async (): Promise<void> => {
    const variables: Variable[] = [
      { key: 'some_other_key', type: 'string', keyValue: { value: 'some_other_value' } as KeyValue },
    ];

    const footer = await getFooterStructure(variables);

    expect(footer).toBeNull();
  });

  it('returns null if footerSource is empty string', async (): Promise<void> => {
    const variables: Variable[] = [{ key: 'inc_footer', type: 'string', keyValue: { value: '' } as KeyValue }];

    const footer = await getFooterStructure(variables);

    expect(footer).toBeNull();
  });

  it('calls getPageStructure with the correct footerSource', async (): Promise<void> => {
    const variables: Variable[] = [
      { key: 'inc_footer', type: 'string', keyValue: { value: 'some_footer_source' } as KeyValue },
    ];
    const mockGetPageStructure = (getPageStructure as jest.Mock).mockResolvedValueOnce({ data: 'footer_data' });

    const footer = await getFooterStructure(variables);

    expect(mockGetPageStructure).toHaveBeenCalledTimes(1);
    expect(mockGetPageStructure).toHaveBeenCalledWith('some_footer_source');
    expect(footer).toBe('footer_data');
  });

  it('returns the footer data if getPageStructure succeeds', async (): Promise<void> => {
    const variables: Variable[] = [
      { key: 'inc_footer', type: 'string', keyValue: { value: 'some_footer_source' } as KeyValue },
    ];
    (getPageStructure as jest.Mock).mockResolvedValueOnce({ data: 'footer_data' });

    const footer = await getFooterStructure(variables);
    expect(footer).toBe('footer_data');
  });

  it('returns null if getPageStructure fails', async (): Promise<void> => {
    const variables: Variable[] = [
      { key: 'inc_footer', type: 'string', keyValue: { value: 'some_footer_source' } as KeyValue },
    ];
    (getPageStructure as jest.Mock).mockResolvedValueOnce(null);

    const footer = await getFooterStructure(variables);

    expect(footer).toBeNull();
  });
});
