import { getNews } from "../utils/getRawNews";
import { parseNews } from "../utils/parseNews";

export async function deliverNews(country: string) {
    const news = await getNews(country);
    const parsedNews = parseNews(JSON.stringify(news));
    return parsedNews;
}