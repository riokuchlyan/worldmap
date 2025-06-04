export function parseNews(news: any) {
    const newsJSONObject = JSON.parse(news);

    const newsArray = newsJSONObject.articles;

    const parsedNews = newsArray.map((article: any) => {
        return {
            title: article.title,
            description: article.description,
            url: article.url,
        };
    });

    return parsedNews;
}