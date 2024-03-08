import axios, { RawAxiosRequestHeaders } from 'axios';
import { fetcher } from './fetcherService';

jest.mock('axios');

let mockAxiosGet: jest.Mock;

const params: RawAxiosRequestHeaders = {
  ['x-token']: '123456',
};

const mockedItem = { id: 1, name: 'Item 1' };

const url = 'http://example.com/api';

describe('fetcher', () => {
  beforeEach(() => {
    mockAxiosGet = axios.get as jest.Mock;
  });
  it('should return data correctly', async () => {
    // ARRANGE
    const mockedData = { items: mockedItem };
    mockAxiosGet.mockResolvedValue({ data: mockedData });

    // ACT
    const fetchData = fetcher(params);
    const result = await fetchData(url);

    // ASSERT
    expect(result).toEqual({ items: mockedItem });
    expect(axios.get).toHaveBeenCalledWith(url, { headers: params });
  });

  it('should handle errors and throw error', async () => {
    // ARRANGE
    const error = new Error('Error fetching data');
    mockAxiosGet.mockRejectedValue(error);

    // ACT
    const fetchData = fetcher();

    // ASSERT
    expect(async () => {
      await fetchData(url);
    }).rejects.toThrow();
  });
});
