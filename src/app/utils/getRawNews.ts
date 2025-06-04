export async function getNews(country: string) {
    const response = await fetch(`/api/news-api?country=${country}`);
    const data = await response.json();

    return data;
}