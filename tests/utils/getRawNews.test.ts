import { getNews } from '../../src/app/utils/getRawNews';

global.fetch = jest.fn();

describe('getNews', () => {
  it('fetches news data for a given country', async () => {
    const mockResponse = { articles: [{ title: 'Test News' }] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const data = await getNews('us');
    console.log('Fetched news data:', data);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('country=us')
    );
    expect(data).toEqual(mockResponse);
  });
});
