import { deliverNews } from '../../src/app/services/deliverNews';

jest.mock('../../src/app/utils/getRawNews', () => ({
  getNews: jest.fn(),
}));
jest.mock('../../src/app/utils/parseNews', () => ({
  parseNews: jest.fn(),
}));

import { getNews } from '../../src/app/utils/getRawNews';
import { parseNews } from '../../src/app/utils/parseNews';

describe('deliverNews', () => {
  it('calls getNews and parseNews and returns parsed news', async () => {
    const mockNewsData = {
      articles: [
        { title: 'Title 1', description: 'Desc 1', url: 'url1' },
        { title: 'Title 2', description: 'Desc 2', url: 'url2' },
      ]
    };

    (getNews as jest.Mock).mockResolvedValue(mockNewsData);
    (parseNews as jest.Mock).mockReturnValue([
      { title: 'Title 1', description: 'Desc 1', url: 'url1' },
      { title: 'Title 2', description: 'Desc 2', url: 'url2' },
    ]);

    const result = await deliverNews('us');
    console.log('Deliver news output:', result);
    
    expect(getNews).toHaveBeenCalledWith('us');
    expect(parseNews).toHaveBeenCalledWith(JSON.stringify(mockNewsData));
    expect(result).toEqual([
      { title: 'Title 1', description: 'Desc 1', url: 'url1' },
      { title: 'Title 2', description: 'Desc 2', url: 'url2' },
    ]);
  });
});
