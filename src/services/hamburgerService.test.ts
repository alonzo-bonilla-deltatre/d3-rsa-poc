import { KeyValue, Variable } from '@/models/types/pageStructure';
import { getHamburgerStructure } from '@/services/hamburgerService';
import { getPageStructure } from '@/services/pageService';

jest.mock('@/services/pageService', () => ({
  getPageStructure: jest.fn(),
}));

describe('getHamburgerStructure function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns null if variables is undefined', async (): Promise<void> => {
    const hamburger = await getHamburgerStructure(undefined, '');

    expect(hamburger).toBeNull();
  });

  it('returns null if hamburgerSource is null', async (): Promise<void> => {
    const variables: Variable[] = [
      { key: 'some_other_key', type: 'string', keyValue: { value: 'some_other_value' } as KeyValue },
    ];

    const hamburger = await getHamburgerStructure(variables, '');

    expect(hamburger).toBeNull();
  });

  it('returns null if hamburgerSource is empty string', async (): Promise<void> => {
    const variables: Variable[] = [{ key: 'inc_hamburger', type: 'string', keyValue: { value: '' } as KeyValue }];

    const hamburger = await getHamburgerStructure(variables, '');

    expect(hamburger).toBeNull();
  });

  it('calls getPageStructure with the correct hamburgerSource', async (): Promise<void> => {
    const variables: Variable[] = [
      { key: 'inc_hamburger', type: 'string', keyValue: { value: 'some_hamburger_source' } as KeyValue },
    ];
    const mockGetPageStructure = (getPageStructure as jest.Mock).mockResolvedValueOnce({ data: 'hamburger_data' });

    const hamburger = await getHamburgerStructure(variables, '');

    expect(mockGetPageStructure).toHaveBeenCalledTimes(1);
    expect(mockGetPageStructure).toHaveBeenCalledWith('some_hamburger_source', '');
    expect(hamburger).toBe('hamburger_data');
  });

  it('returns the hamburger data if getPageStructure succeeds', async (): Promise<void> => {
    const variables: Variable[] = [
      { key: 'inc_hamburger', type: 'string', keyValue: { value: 'some_hamburger_source' } as KeyValue },
    ];
    (getPageStructure as jest.Mock).mockResolvedValueOnce({ data: 'hamburger_data' });

    const hamburger = await getHamburgerStructure(variables, '');
    expect(hamburger).toBe('hamburger_data');
  });

  it('returns null if getPageStructure fails', async (): Promise<void> => {
    const variables: Variable[] = [
      { key: 'inc_hamburger', type: 'string', keyValue: { value: 'some_hamburger_source' } as KeyValue },
    ];
    (getPageStructure as jest.Mock).mockResolvedValueOnce(null);

    const hamburger = await getHamburgerStructure(variables, '');

    expect(hamburger).toBeNull();
  });
});
