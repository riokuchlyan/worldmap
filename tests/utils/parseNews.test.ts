import { parseNews } from '../../src/app/utils/parseNews';

describe('parseNews', () => {
  it('parses a JSON string of news articles into an array of objects', () => {
    const mockNewsJSON = JSON.stringify({
      articles: [
        {
          title: 'Title 1',
          description: 'Description 1',
          url: 'http://example.com/1',
        },
        {
          title: 'Title 2',
          description: 'Description 2',
          url: 'http://example.com/2',
        },
      ],
    });

    const result = parseNews(mockNewsJSON);
    console.log('Parsed news output:', result);
    expect(result).toEqual([
      {
        title: 'Title 1',
        description: 'Description 1',
        url: 'http://example.com/1',
      },
      {
        title: 'Title 2',
        description: 'Description 2',
        url: 'http://example.com/2',
      },
    ]);
  });
}); 