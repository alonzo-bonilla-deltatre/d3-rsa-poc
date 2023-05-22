import { KeyValue, Variable } from '@/models/types/pageStructure';
import { getHeaderStructure } from '@/services/headerService';
import { getPageStructure } from '@/services/pageService';

jest.mock('@/services/pageService', () => ({
  getPageStructure: jest.fn(),
}));

describe('getHeaderStructure function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns null if variables is undefined', async (): Promise<void> => {
    const header = await getHeaderStructure(undefined, '');

    expect(header).toBeNull();
  });

  it('returns null if headerSource is null', async (): Promise<void> => {
    const variables: Variable[] = [
      { key: 'some_other_key', type: 'string', keyValue: { value: 'some_other_value' } as KeyValue },
    ];

    const header = await getHeaderStructure(variables, '');

    expect(header).toBeNull();
  });

  it('returns null if headerSource is empty string', async (): Promise<void> => {
    const variables: Variable[] = [{ key: 'inc_header', type: 'string', keyValue: { value: '' } as KeyValue }];

    const header = await getHeaderStructure(variables, '');

    expect(header).toBeNull();
  });

  it('calls getPageStructure with the correct headerSource', async (): Promise<void> => {
    const variables: Variable[] = [
      { key: 'inc_header', type: 'string', keyValue: { value: 'some_header_source' } as KeyValue },
    ];
    const mockGetPageStructure = (getPageStructure as jest.Mock).mockResolvedValueOnce({ data: 'header_data' });

    const header = await getHeaderStructure(variables, '');

    expect(mockGetPageStructure).toHaveBeenCalledTimes(1);
    expect(mockGetPageStructure).toHaveBeenCalledWith('some_header_source', '');
    expect(header).toBe('header_data');
  });

  it('returns the header data if getPageStructure succeeds', async (): Promise<void> => {
    const variables: Variable[] = [
      { key: 'inc_header', type: 'string', keyValue: { value: 'some_header_source' } as KeyValue },
    ];
    (getPageStructure as jest.Mock).mockResolvedValueOnce({ data: 'header_data' });

    const header = await getHeaderStructure(variables, '');
    expect(header).toBe('header_data');
  });

  it('returns null if getPageStructure fails', async (): Promise<void> => {
    const variables: Variable[] = [
      { key: 'inc_header', type: 'string', keyValue: { value: 'some_header_source' } as KeyValue },
    ];
    (getPageStructure as jest.Mock).mockResolvedValueOnce(null);

    const header = await getHeaderStructure(variables, '');

    expect(header).toBeNull();
  });
});
